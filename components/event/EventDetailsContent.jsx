import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDuration, formatFullDate, getTimeRange } from "../../utils/dateUtils";
import ZeroItems from "../ZeroItems";

export default function EventDetailsContent({ event, status, attendees, showDetails }) {

  const durationString = getTimeRange({ start_time: event?.start_time, duration: event?.duration })
  const attendanceDuration = formatDuration({ seconds: event?.attendance_duration })

  return (
    <>
      {
        status === 'available'
        &&
        <View style={{ ...styles.section, marginBottom: 50 }}>
          <Text style={styles.sectionTitle}>Attendance Confirmation</Text>
          <View style={styles.confirmationList}>
            <View style={styles.confirmationItem}>
              <Text style={styles.confirmationNumber}>1.</Text>
              <Text style={styles.confirmationText}>
                <Text style={styles.bold}>Event Duration:</Text> This event
                requires a minimum attendance of {attendanceDuration}.
              </Text>
            </View>
            <View style={styles.confirmationItem}>
              <Text style={styles.confirmationNumber}>2.</Text>
              <Text style={styles.confirmationText}>
                <Text style={styles.bold}>Clock In:</Text> Ensure the event host clocks you in once you arrive
              </Text>
            </View>
            <View style={styles.confirmationItem}>
              <Text style={styles.confirmationNumber}>3.</Text>
              <Text style={styles.confirmationText}>
                <Text style={styles.bold}>Clock Out:</Text> Ensure the event host clocks you out before you leave
              </Text>
            </View>
            <View style={styles.confirmationItem}>
              <Text style={styles.confirmationNumber}>4.</Text>
              <Text style={styles.confirmationText}>
                <Text style={styles.bold}>Reward Payout:</Text> Flex get paid 24
                hours after attending the event.
              </Text>
            </View>
          </View>
        </View>
      }

      {
        <>
          {/* About Event */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description}>{event?.description}</Text>
          </View>

          {/* Event Details */}
          <View style={[styles.section, { marginTop: -16 }]}>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.detailRow}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{formatFullDate({ date: event.date })}</Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons name="time-outline" size={20} color="#666" />
                  <Text style={styles.detailText}>{durationString}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={20} color="#666" />
                <Text style={styles.detailText}>
                  {event?.address}, {event?.city}, {event?.state}, {event?.country}
                </Text>
              </View>
            </View>
          </View>

          {/* Hosted by */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hosted by</Text>
            <View style={styles.hostCard}>
              <Image
                source={{ uri: event?.hostInfo?.image_url }}
                style={styles.hostAvatar}
              />
              <View style={styles.hostInfo}>
                <View style={styles.hostNameRow}>
                  <Text style={styles.hostName}>{event?.hostInfo?.full_name}</Text>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                </View>
                <View style={styles.hostRating}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < event?.hostInfo?.rating ? "star" : "star-outline"}
                      size={14}
                      color="#FFA500"
                    />
                  ))}
                </View>
                {/* <Text style={styles.hostEvents}>
              Hosted {event?.hostInfo?.eventsHosted} events on flexxa
            </Text> */}
              </View>
              <TouchableOpacity style={styles.hostBadge}>
                {/* <Text style={styles.hostBadgeText}>{event?.hostInfo?.badge}</Text> */}
                <Text style={styles.hostBadgeText}>More Info</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Activities */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontWeight: 500 }]}>
              Activities
            </Text>
            <View style={styles.activitiesContainer}>
              {event.activities.map((activity, index) => (
                <View key={index} style={styles.activityTag}>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Flexes attending */}
          <View
            style={[
              styles.section,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            {
              attendees?.length > 0
                ?
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {attendees?.slice(0, 5).map((att, i) => {

                      return (
                        <Image
                          key={i}
                          source={{ uri: att?.image_url }}
                          style={[styles.attendeeAvatar, { marginLeft: i > 0 ? -12 : 0 }]}
                        />
                      )
                    })}
                    {
                      attendees?.length > 5
                      &&
                      <View
                        style={[
                          styles.attendeeAvatar,
                          {
                            marginLeft: -12,
                            backgroundColor: "#E5E7EB",
                            justifyContent: "center",
                            alignItems: "center",
                          },
                        ]}
                      >
                        <Text style={{ fontSize: 13, fontWeight: "600", color: "#000" }}>
                          +{attendees?.length - 5}
                        </Text>
                      </View>
                    }
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      alignItems: "flex-start",
                      justifyContent: 'center',
                      // marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 14,
                        fontWeight: "400",
                        flexWrap: "wrap",
                      }}
                    >
                      Flexes attending the event
                    </Text>
                  </View>
                </>
                :
                <ZeroItems
                  zeroText={"Attendance slot is still empty"}
                />
            }
          </View>

          {/* Event Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Instructions</Text>
            {event.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionBullet}>•</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  confirmationList: { gap: 12 },
  confirmationItem: { flexDirection: "row", gap: 8 },
  confirmationNumber: { fontSize: 14, color: "#000", fontWeight: "600" },
  confirmationText: { flex: 1, fontSize: 14, color: "#666", lineHeight: 20 },
  bold: { fontWeight: "600", color: "#000" },
  description: { fontSize: 14, color: "#666", lineHeight: 22 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  detailText: { fontSize: 14, color: "#666" },
  hostCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#f6f6fd",
    padding: 14,
    borderRadius: 10,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0E0E0",
  },
  hostInfo: { flex: 1 },
  hostNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  hostName: { fontSize: 16, fontWeight: "600", color: "#000" },
  hostRating: { flexDirection: "row", gap: 2, marginBottom: 12 },
  hostEvents: { fontSize: 14.5, color: "#000" },
  hostBadge: {
    backgroundColor: "#ecf2f4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  hostBadgeText: { fontSize: 12.5, color: "#319f43", fontWeight: "500" },
  activitiesContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  activityTag: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  activityText: { fontSize: 13, color: "#1e1e1e", fontWeight: "500" },
  attendeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 22,
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  instructionItem: { flexDirection: "row", gap: 8, marginBottom: 8 },
  instructionBullet: { fontSize: 14, color: "#000", fontWeight: "600" },
  instructionText: { flex: 1, fontSize: 14, color: "#666", lineHeight: 20 },
});
