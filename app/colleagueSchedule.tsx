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
      <Text style={styles.heading}>Schedule for Colleague ID: {colleagueID}</Text>
      <Text style={styles.subHeading}>Month: {month}</Text>

      <ScrollView style={styles.scheduleContainer}>
        {dates.length > 0 ? (
          dates.map((date, index) => (
            <View key={index} style={styles.shiftRow}>
              <Text style={styles.dayText}>{date}</Text>
              <View style={[styles.shiftBox, times[index] === "Not Scheduled" && styles.notScheduled]}>
                <Text style={styles.shiftTime}>{times[index]}</Text>
                {types[index] && <Text style={styles.shiftType}>{types[index]}</Text>}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noShifts}>No shifts available</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subHeading: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  scheduleContainer: { marginTop: 10 },
  shiftRow: { flexDirection: "row", marginBottom: 8, alignItems: "center" },
  dayText: { width: 80, fontSize: 16, fontWeight: "bold" },
  shiftBox: { flex: 1, backgroundColor: "#6fa3e5", padding: 12, borderRadius: 10 },
  shiftTime: { color: "#ffffff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  shiftType: { color: "#ffffff", fontSize: 14, textAlign: "center" },
  notScheduled: { backgroundColor: "#AAC4EA" },
  noShifts: { textAlign: "center", fontSize: 16, marginTop: 20 },
  backButton: { backgroundColor: "#005DA0", padding: 10, borderRadius: 5, marginTop: 20, alignSelf: "center" },
  backText: { color: "white", fontWeight: "bold", textAlign: "center" },
});
