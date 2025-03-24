import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function ColleagueScheduleScreen() {
  const { colleagueID, month } = useLocalSearchParams();
  const router = useRouter();

  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (colleagueID && month) {
      fetchColleagueSchedule();
    }
  }, [colleagueID, month]);

  const fetchColleagueSchedule = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.109:3000/api/schedule?colleagueID=${colleagueID}&month=${month}`
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
      console.error("Error fetching colleague's schedule:", error);
      setDates([]);
      setTimes([]);
      setTypes([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule for #{colleagueID}</Text>
      <Text style={styles.subHeading}>Month: {month}</Text>

      <ScrollView style={styles.scheduleScroll}>
        <View style={styles.scheduleContainer}>
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
            <Text style={styles.noShifts}>No shifts available</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAC4EA",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 15,
  },
  scheduleScroll: {
    flex: 1,
  },
  scheduleContainer: {
    paddingBottom: 20,
  },
  shiftRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  dayColumn: {
    width: 60,
    backgroundColor: "#d7dbd8",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  shiftBox: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#6fa3e5",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  notScheduled: {
    backgroundColor: "#d7dbd8",
  },
  shiftTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  shiftType: {
    fontSize: 14,
    color: "#fff",
  },
  noShifts: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#444",
  },
  backButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#005DA0",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
