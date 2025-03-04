// index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ProfileScreen() {
 
  const [startOpen, setStartOpen] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  const [endValue, setEndValue] = useState(null);

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

  const getDaysInMonth = (month: string) => {
    switch (month) {
      case "February":
        return 28;
      case "April":
      case "June":
      case "September":
      case "November":
        return 30;
      default:
        return 31;
    }
  };

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [startDateValue, setStartDateValue] = useState(null);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [endDateValue, setEndDateValue] = useState(null);
  const [availableStartDates, setAvailableStartDates] = useState<{ label: string; value: string }[]>([]);
  const [availableEndDates, setAvailableEndDates] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (startValue) {
      const days = getDaysInMonth(startValue);
      setAvailableStartDates(Array.from({ length: days }, (_, i) => ({ label: (i + 1).toString(), value: (i + 1).toString() })));
      setStartDateValue(null); 
    }
  }, [startValue]);

  useEffect(() => {
    if (endValue) {
      const days = getDaysInMonth(endValue);
      setAvailableEndDates(Array.from({ length: days }, (_, i) => ({ label: (i + 1).toString(), value: (i + 1).toString() })));
      setEndDateValue(null);
    }
  }, [endValue]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
        <View style={styles.header}>
          <Text style={styles.headingText}>Profile</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>FirstName</Text>
          <Text style={styles.text}>Colleague ID: #123456</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Contact no.:</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Position:</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Location:</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Holidays: 28 days</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeadingText}>Holiday Requests</Text>
          <View style={styles.dropdownRow}>
            <DropDownPicker open={startOpen} value={startValue} items={months} setOpen={setStartOpen} setValue={setStartValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Month" />
            <DropDownPicker open={startDateOpen} value={startDateValue} items={availableStartDates} setOpen={setStartDateOpen} setValue={setStartDateValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Date" />
          </View>
          <View style={styles.dropdownRow}>
            <DropDownPicker open={endOpen} value={endValue} items={months} setOpen={setEndOpen} setValue={setEndValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Month" />
            <DropDownPicker open={endDateOpen} value={endDateValue} items={availableEndDates} setOpen={setEndDateOpen} setValue={setEndDateValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Date" />
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#AAC4EA", paddingBottom: 50 },
  scrollContent: { padding: 10 },
  header: { backgroundColor: "#005DA0", padding: 20, borderRadius: 10, marginBottom: 20 },
  headingText: { fontSize: 32, fontWeight: "bold", color: "#ffffff", textAlign: "center" },
  section: { backgroundColor: "#005DA0", padding: 20, borderRadius: 10, marginBottom: 20 },
  infoBox: { backgroundColor: "rgba(0, 93, 160, 0.56)", padding: 20, borderRadius: 10, marginBottom: 20 },
  text: { fontSize: 18, color: "#ffffff", paddingBottom: 5 },
  subHeadingText: { fontSize: 22, fontWeight: "bold", color: "#ffffff", paddingBottom: 10 },
  editButton: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 5, alignSelf: "flex-start", marginBottom: 10 },
  editButtonText: { fontSize: 16, fontWeight: "bold" },
  dropdownRow: { flexDirection: "row", paddingRight: 150 },
  dropdown: { width: 140 },
  submitButton: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 5, alignSelf: "center", marginTop: 10, minWidth: 100, textAlign: "center" },
  submitButtonText: { fontSize: 16, fontWeight: "bold" },
});
