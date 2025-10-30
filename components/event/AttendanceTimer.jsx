// AttendanceTimer.js
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const toSeconds = (v) => {
  if (v == null) return null;
  if (typeof v === 'number' && Number.isFinite(v)) return Math.floor(v);
  if (typeof v === 'string' && /^\d+$/.test(v)) return Math.floor(Number(v));
  const dt = DateTime.fromISO(String(v), { zone: 'utc' });
  if (dt.isValid) return Math.floor(dt.toSeconds());
  const dt2 = DateTime.fromJSDate(new Date(v), { zone: 'utc' });
  if (dt2.isValid) return Math.floor(dt2.toSeconds());
  return null;
};

const pad2 = (n) => String(n).padStart(2, '0');

const formatSmartCountdown = (secs) => {
  let s = Math.max(0, Math.floor(secs));
  const months = Math.floor(s / (30 * 24 * 3600));
  s %= 30 * 24 * 3600;
  const days = Math.floor(s / (24 * 3600));
  s %= 24 * 3600;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);

  let parts = [];
  if (months > 0) parts.push(`${months}mo`);
  if (days > 0) parts.push(`${days}d`);
  parts.push(`${pad2(h)}:${pad2(m)}:${pad2(sec)}`);
  return parts.join(' ');
};

const formatReadable = (seconds) => {
  const s = Math.max(0, Math.floor(seconds || 0));
  if (s === 0) return '0mins';
  const monthSec = 30 * 24 * 3600;
  const months = Math.floor(s / monthSec);
  let rem = s % monthSec;
  const days = Math.floor(rem / (24 * 3600));
  rem %= 24 * 3600;
  const hours = Math.floor(rem / 3600);
  rem %= 3600;
  const mins = Math.floor(rem / 60);

  const parts = [];
  if (months > 0) parts.push(`${months}mo${months > 1 ? 's' : ''}`);
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  return parts.join(' ');
};

export default function AttendanceTimer({
  start_time,
  duration,
  attendance_duration,
  clocked_in_at,
  clocked_out_at,
  containerStyle,
}) {
  const startSec = useMemo(() => toSeconds(start_time), [start_time]);
  const durationSec = Number(duration || 0);
  const attendanceReq = Number(attendance_duration || 0);
  const inSec = useMemo(() => toSeconds(clocked_in_at), [clocked_in_at]);
  const outSec = useMemo(() => toSeconds(clocked_out_at), [clocked_out_at]);
  const [now, setNow] = useState(() => Math.floor(DateTime.utc().toSeconds()));

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(DateTime.utc().toSeconds())), 1000);
    return () => clearInterval(id);
  }, []);

  const eventHasStart = startSec != null;
  const eventStart = startSec;
  const eventEnd = startSec != null ? startSec + durationSec : null;
  const eventHasStarted = eventHasStart && now >= eventStart;
  const eventHasEnded = eventEnd != null && now >= eventEnd;
  const isClockedIn = Boolean(inSec);
  const isClockedOut = Boolean(outSec);

  const actualIn = (() => {
    if (!isClockedIn || !eventHasStart) return null;
    return inSec < eventStart ? eventStart : inSec;
  })();

  const actualOut = (() => {
    if (!eventEnd) return isClockedOut ? outSec : now;
    const candidate = isClockedOut ? outSec : now;
    return candidate > eventEnd ? eventEnd : candidate;
  })();

  const timeSpent = actualIn && actualOut ? Math.max(0, actualOut - actualIn) : 0;
  const eligible = timeSpent >= attendanceReq;

  let timerLabel = '';
  let timerDisplay = '';
  let subText = '';

  if (!eventHasStart) {
    timerLabel = 'Event';
    timerDisplay = 'Invalid start time';
  } else if (!eventHasStarted) {
    timerLabel = 'Starts in';
    const secsToStart = Math.max(0, eventStart - now);
    timerDisplay = formatSmartCountdown(secsToStart);
    const dt = DateTime.fromSeconds(eventStart, { zone: 'utc' }).toLocal();
    subText = `Starts: ${dt.toFormat('ccc, LLL d • h:mma')}`;
  } else if (eventHasStarted && !isClockedIn) {
    if (eventHasEnded) {
      timerLabel = 'Event';
      timerDisplay = 'Event ended — Not clocked in';
    } else {
      timerLabel = 'Status';
      timerDisplay = 'Not clocked in';
      const secsLeft = eventEnd ? Math.max(0, eventEnd - now) : 0;
      subText = eventEnd ? `Event ends in ${formatSmartCountdown(secsLeft)}` : '';
    }
  } else {
    timerLabel = isClockedOut ? 'Attendance' : 'Time at event';
    const spentReadable = formatReadable(timeSpent);
    const requiredReadable = formatReadable(attendanceReq);
    timerDisplay = `${spentReadable} — required ${requiredReadable}`;
    const inLocal = inSec
      ? DateTime.fromSeconds(inSec, { zone: 'utc' }).toLocal().toFormat('ccc, LLL d • h:mma')
      : '—';
    const outLocal = outSec
      ? DateTime.fromSeconds(outSec, { zone: 'utc' }).toLocal().toFormat('ccc, LLL d • h:mma')
      : isClockedOut
      ? '—'
      : 'ongoing';
    subText = `In: ${inLocal}  •  Out: ${outLocal}  •  ${eligible ? 'Eligible' : 'Not eligible'}`;
  }

  const containerStyles = [
    styles.timerContainer,
    containerStyle,
    !eventHasStarted && styles.upcoming,
    eventHasStarted && !isClockedIn && !eventHasEnded && styles.warning,
    isClockedIn && styles.active,
  ];

  const textDim = !eventHasStarted || (eventHasStarted && !isClockedIn && !eventHasEnded);

  return (
    <View style={containerStyles}>
      <Text style={styles.timerLabel}>{timerLabel}</Text>
      <Text style={[styles.timerDisplay, textDim && styles.dimText]}>{timerDisplay}</Text>
      {subText ? <Text style={styles.subText}>{subText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timerLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  timerDisplay: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 24,
  },
  subText: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 12,
  },
  dimText: {
    color: '#9CA3AF',
  },
  upcoming: {
    borderColor: '#60A5FA',
  },
  warning: {
    borderColor: '#F59E0B',
  },
  active: {
    borderColor: '#10B981',
  },
});
