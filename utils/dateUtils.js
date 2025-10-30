import { DateTime } from "luxon";

export function convertToTimezone({ isoString, timezone = "Africa/Lagos" }) {
    if (!isoString) return null;

    const utcTime = DateTime.fromISO(isoString, { zone: "utc" });
    const zonedTime = utcTime.setZone(timezone);

    return {
        iso: zonedTime.toISO(),
        timeObj: zonedTime
    }
}

export function formatReadableTime({ isoString }) {
    if (!isoString) return "";

    const time = convertToTimezone({ isoString });

    if (time) {
        const { iso, timeObj } = time

        return timeObj?.toFormat("h:mma");
    }

    return ''
}

export const getShortMonth = ({ date }) => {
    if (!date) return ""
    return DateTime.fromJSDate(new Date(date)).toFormat('LLL');
};

export const getDayOfMonth = ({ date }) => {
    if (!date) return ""
    return DateTime.fromJSDate(new Date(date)).day;
};

export const getShortDayOfWeek = ({ date }) => {
    return DateTime.fromJSDate(new Date(date)).toFormat('ccc');
};

export const getTimeRange = ({ start_time, duration }) => {
  const start = DateTime.fromJSDate(new Date(start_time));

  // Detect whether duration is likely seconds or hours
  const durationHours = duration > 24 ? duration / 3600 : duration;

  const end = start.plus({ hours: durationHours });

  const startStr = start.toFormat('h:mma').toLowerCase();
  const endStr = end.toFormat('h:mma').toLowerCase();

  return `${startStr} - ${endStr}`;
};


export const formatDuration = ({ seconds }) => {
  if (!seconds || isNaN(seconds) || seconds < 0) return '0mins';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hourStr = hours > 0 ? `${hours}hr${hours > 1 ? 's' : ''}` : '';
  const minStr = minutes > 0 ? `${minutes}min${minutes > 1 ? 's' : ''}` : '';

  if (hourStr && minStr) return `${hourStr} ${minStr}`;
  if (hourStr) return hourStr;
  return minStr || '0mins';
};

export const formatFullDate = ({ date }) => {
  if (!date) return '';

  // Normalize input to a Luxon DateTime
  const dt = DateTime.fromJSDate(
    date instanceof Date ? date : new Date(date)
  );

  // Return formatted string
  return dt.toFormat('EEEE, LLLL d');
};




export const getEventStatuses = ({ events, currentFlexId }) => {
  const now = DateTime.utc();

  // Define all possible statuses
  const eventStatuses = ["new", "ongoing", "attending", "attended", "unAttended"];

  // Initialize counters
  const counts = Object.fromEntries(eventStatuses.map(key => [key, 0]));

  // First pass: determine status & update counts
  const eventsWithStatus = events.map((event) => {
    const { start_time, duration, event_attendees } = event;

    const start = DateTime.fromISO(start_time, { zone: "utc" });
    const end = start.plus({ seconds: duration });

    const isAttending = event_attendees?.some(
      (att) => att.flex_id === currentFlexId
    );

    let status = "new";

    // ✅ Always prioritize attendance
    if (isAttending) {
      if (now > end) {
        status = "attended";
      } else {
        status = "attending"; // even if it’s before start, it should show “attending”
      }
    } else {
      if (now < start) {
        status = "new";
      } else if (now >= start && now <= end) {
        status = "ongoing";
      } else if (now > end) {
        status = "unAttended";
      }
    }

    counts[status] += 1;

    return { ...event, status };
  });

  // Second pass: assign each event its respective count
  const enrichedEvents = eventsWithStatus.map((event) => ({
    ...event,
    count: counts[event.status],
  }));

  return { eventsWithStatus: enrichedEvents, counts };
};
