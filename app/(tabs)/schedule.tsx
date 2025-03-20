import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ScheduleScreen() {
  const { colleagueID } = useLocalSearchParams();

  const [monthOpen, setMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("February");

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const [swapOpen, setSwapOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (colleagueID && selectedMonth) {
      fetchSchedule();
    }
  }, [colleagueID, selectedMonth]);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.30:3000/api/schedule?colleagueID=${colleagueID}&month=${selectedMonth}`
      );
      const data = await response.json();

      if (data.success) {
        setDates(data.dayDates);
        setTimes(data.times);
        setTypes(data.types);
      } else {
        setDates([]);
        setTimes([]);
        setTypes([]);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setDates([]);
      setTimes([]);
      setTypes([]);
    }
  };

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const colleagues = [
    { label: "Alice Johnson", value: "Alice Johnson" },
    { label: "Bob Smith", value: "Bob Smith" },
    { label: "Charlie Davis", value: "Charlie Davis" },
    { label: "Diana Roberts", value: "Diana Roberts" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Schedule</Text>
      </View>

      {/* DropDowns in a Row */}
      <View style={styles.dropdownRow}>
        <View style={[styles.dropdownWrapper, { zIndex: monthOpen ? 3000 : 1 }]}>
          <DropDownPicker
            open={monthOpen}
            value={selectedMonth}
            items={months}
            setOpen={setMonthOpen}
            setValue={setSelectedMonth}
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownAbsolute}
            textStyle={{ fontSize: 14 }}
          />
        </View>

        <View style={[styles.dropdownWrapper, { zIndex: filterOpen ? 2500 : 1 }]}>
          <DropDownPicker
            open={filterOpen}
            value={selectedFilter}
            items={colleagues}
            setOpen={setFilterOpen}
            setValue={setSelectedFilter}
            placeholder="Filter by Colleague"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownAbsolute}
            textStyle={{ fontSize: 14 }}
          />
        </View>

        <View style={[styles.dropdownWrapper, { zIndex: swapOpen ? 2000 : 1 }]}>
          <DropDownPicker
            open={swapOpen}
            value={selectedSwap}
            items={colleagues}
            setOpen={setSwapOpen}
            setValue={setSelectedSwap}
            placeholder="Request Swap"
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            dropDownContainerStyle={styles.dropdownAbsolute}
            textStyle={{ fontSize: 14 }}
          />
        </View>
      </View>

      {/* Schedule Table */}
      <ScrollView style={styles.scheduleContainer}>
        {dates.length > 0 ? (
          dates.map((date, index) => (
            <View key={index} style={styles.shiftRow}>
              <View style={styles.dayColumn}>
                <Text style={styles.dayText}>{date}</Text>
              </View>
              <View style={[styles.shiftBox, times[index] === "Not Scheduled" && styles.notScheduled]}>
                <Text style={styles.shiftTime}>{times[index]}</Text>
                {types[index] ? <Text style={styles.shiftType}>{types[index]}</Text> : null}
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No shifts available for {selectedMonth}</Text>
        )}
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

  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdownContainer: {
    width: "100%",
    position: "relative",
  },
  dropdownAbsolute: {
    position: "absolute",
    top: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 4000,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 40,
  },

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

