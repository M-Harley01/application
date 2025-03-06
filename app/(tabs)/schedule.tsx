// schedule.tsx

import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ScheduleScreen() {

  const {colleagueID} = useLocalSearchParams();

  const [monthOpen, setMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("February 2025");

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [swapOpen, setSwapOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const months = [
    { label: "January 2025", value: "January 2025" },
    { label: "February 2025", value: "February 2025" },
    { label: "March 2025", value: "March 2025" },
    { label: "April 2025", value: "April 2025" },
    { label: "May 2025", value: "May 2025" },
    { label: "June 2025", value: "June 2025" },
    { label: "July 2025", value: "July 2025" },
    { label: "August 2025", value: "August 2025" },
    { label: "September 2025", value: "September 2025" },
    { label: "October 2025", value: "October 2025" },
    { label: "November 2025", value: "November 2025" },
    { label: "December 2025", value: "December 2025" }
];

  const colleagues = [
    { label: "Alice Johnson", value: "Alice Johnson" },
    { label: "Bob Smith", value: "Bob Smith" },
    { label: "Charlie Davis", value: "Charlie Davis" },
    { label: "Diana Roberts", value: "Diana Roberts" },
  ];

  
  const shifts = [
    { day: "Mon 17th", time: "10:00 - 15:00", type: "Home Delivery Shift" },
    { day: "Tue 18th", time: "9:00 - 17:00", type: "Checkout Shift" },
    { day: "Wed 19th", time: "Not Scheduled", type: "" },
    { day: "Thu 20th", time: "14:00 - 22:00", type: "Shop floor Shift" },
    { day: "Fri 21st", time: "9:00 - 17:00", type: "Checkout Shift" },
    { day: "Sat 22nd", time: "Not Scheduled", type: "" },
    { day: "Sun 23rd", time: "Not Scheduled", type: "" },
  ];

  return (
    <View style={styles.container}>

    <View>
      <Text>Welcome, {colleagueID}!</Text>
    </View>

      <View style={styles.header}>
        <Text style={styles.headingText}>Schedule</Text>
        </View>

        <View style={{ zIndex: 3000, elevation: 3000 }}>
          <DropDownPicker
            open={monthOpen}
            value={selectedMonth}
            items={months}
            setOpen={setMonthOpen}
            setValue={setSelectedMonth}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 14 }}
          />
        </View>

        <View style={{ zIndex: 2000, elevation: 2000 }}>
          <DropDownPicker
            open={filterOpen}
            value={selectedFilter}
            items={colleagues}
            setOpen={setFilterOpen}
            setValue={setSelectedFilter}
            placeholder="Filter by Colleague"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 14 }}
          />
        </View>

        <View style={{ zIndex: 1000, elevation: 1000 }}>
          <DropDownPicker
            open={swapOpen}
            value={selectedSwap}
            items={colleagues}
            setOpen={setSwapOpen}
            setValue={setSelectedSwap}
            placeholder="Request Swap"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 14 }}
          />
        </View>
      

      <ScrollView style={styles.scheduleContainer}>
        {shifts.map((shift, index) => (
          <View key={index} style={styles.shiftRow}>
            <View style={styles.dayColumn}>
              <Text style={styles.dayText}>{shift.day}</Text>
            </View>
            <View style={[styles.shiftBox, shift.time === "Not Scheduled" && styles.notScheduled]}>
              <Text style={styles.shiftTime}>{shift.time}</Text>
              {shift.type ? <Text style={styles.shiftType}>{shift.type}</Text> : null}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },

  header: { 
    flexDirection: "row", 
    backgroundColor: "#005DA0", 
    padding: 15, 
    alignItems: "center", 
    flexWrap: "wrap",
    zIndex: 3000, 
  },
  headingText: { fontSize: 24, color: "#ffffff", fontWeight: "bold", flex: 1 },

  dropdownContainer: { 
    width: 140, 
    marginHorizontal: 5, 
  },
  dropdown: { backgroundColor: "#fff", borderRadius: 5, height: 40 },

  scheduleContainer: { 
    paddingHorizontal: 10, 
    marginTop: 10,  
    zIndex: 1,  
  },
  shiftRow: { flexDirection: "row", marginBottom: 8, alignItems: "center" },
  dayColumn: { width: 80, backgroundColor: "#9e9e9e", padding: 10, borderRadius: 5, alignItems: "center" },
  dayText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  shiftBox: { flex: 1, backgroundColor: "#6fa3e5", padding: 12, borderRadius: 25, marginLeft: 8 },
  shiftTime: { color: "#ffffff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  shiftType: { color: "#ffffff", fontSize: 14, textAlign: "center" },
  notScheduled: { backgroundColor: "#AAC4EA" },
});
