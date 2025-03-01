import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  const scheduleData = [
    { day: 'Mon', date: '17th', shift: '10:00 - 15:00\nHome Delivery Shift' },
    { day: 'Tue', date: '18th', shift: '9:00 - 17:00\nCheckout Shift' },
    { day: 'Wed', date: '19th', shift: 'Not Scheduled' },
    { day: 'Thu', date: '20th', shift: '14:00 - 22:00\nShop Floor Shift' },
    { day: 'Fri', date: '21st', shift: '9:00 - 17:00\nCheckout Shift' },
    { day: 'Sat', date: '22nd', shift: 'Not Scheduled' },
    { day: 'Sun', date: '23rd', shift: 'Not Scheduled' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Schedule</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {scheduleData.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateText}>{item.day}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.shiftBox}>
              <Text style={styles.shiftText}>{item.shift}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
     
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAC4EA",
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#ffffff",
  },
  filterButton: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 5,
  },
  filterText: {
    color: '#000',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateColumn: {
    width: 80,
    backgroundColor: '#D3D3D3',
    padding: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shiftBox: {
    flex: 1,
    backgroundColor: "rgba(0, 93, 160, 0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  shiftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#ffffff",
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});
