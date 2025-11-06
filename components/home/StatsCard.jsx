import { StyleSheet, Text, View } from 'react-native';

export default function StatsCard({
  stats = [],
  styles = {},
}) {
  return (
    <View style={[defaultStyles.statsCard, styles.statsCard]}>
      {stats.map((stat, index) => (
        <View key={index} style={[defaultStyles.statItem, styles.statItem]}>
          <Text style={[defaultStyles.statNumber, styles.statNumber]}>
            {stat.number}
          </Text>
          <Text style={[defaultStyles.statLabel, styles.statLabel]}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#cb297e',
    margin: 16,
    padding: 14,
    borderRadius: 20,
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ce3485',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
});