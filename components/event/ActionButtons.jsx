import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ActionButtons({
  btn1,
  btn2,
  onBtn1Press,
  onBtn2Press,
  disableBtn1,
  disableBtn2,
}) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[styles.clockOutButton, disableBtn1 && styles.disabled]}
        onPress={onBtn1Press}
        disabled={disableBtn1}
      >
        <Text style={styles.clockOutButtonText}>{btn1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.clockInButton, disableBtn2 && styles.disabled]}
        onPress={onBtn2Press}
        disabled={disableBtn2}
      >
        <Text style={styles.clockInButtonText}>{btn2}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    flexDirection: "row",
    gap: 12,
  },
  clockOutButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#484ED4",
    alignItems: "center",
    justifyContent: "center",
  },
  clockOutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#484ED4",
  },
  clockInButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#484ED4",
    alignItems: "center",
    justifyContent: "center",
  },
  clockInButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  disabled: {
    opacity: 0.5,
  },
});
