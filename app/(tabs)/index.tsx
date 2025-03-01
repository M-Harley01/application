import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ProfileScreen() {
  /* Month pickers */
  const [startOpen, setStartOpen] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  const [endValue, setEndValue] = useState(null);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map(month => ({ label: month, value: month }));
  
  /* Date pickers */
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [startDateValue, setStartDateValue] = useState(null);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [endDateValue, setEndDateValue] = useState(null);
  
  const dates = Array.from({ length: 31 }, (_, i) => ({ label: (i + 1).toString(), value: (i + 1).toString() }));
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.header}>
          <Text style={styles.headingText}>Profile</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>FirstName LastName</Text>
          <Text style={styles.text}>Colleague ID: #123456</Text>
          <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Contact no.: 01382 123456</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Position: Customer Assistant</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Location: Dundee</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Holidays: 28 days</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subHeadingText}>Holiday Requests</Text>
          <View style={styles.dropdownRow}>
            <DropDownPicker open={startOpen} value={startValue} items={months} setOpen={setStartOpen} setValue={setStartValue} style={styles.dropdown} listMode="SCROLLVIEW" />
            <DropDownPicker open={startDateOpen} value={startDateValue} items={dates} setOpen={setStartDateOpen} setValue={setStartDateValue} style={styles.dropdown} listMode="SCROLLVIEW" />
          </View>
          <View style={styles.dropdownRow}>
            <DropDownPicker open={endOpen} value={endValue} items={months} setOpen={setEndOpen} setValue={setEndValue} style={styles.dropdown} listMode="SCROLLVIEW" />
            <DropDownPicker open={endDateOpen} value={endDateValue} items={dates} setOpen={setEndDateOpen} setValue={setEndDateValue} style={styles.dropdown} listMode="SCROLLVIEW" />
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
  dropdownRow: 
  { 
    flexDirection: "row", 
    paddingRight: 150,

  },
  dropdown: 
  { 
    width: 140, 
    
  },
  submitButton: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 5, alignSelf: "center", marginTop: 10, minWidth: 100, textAlign: "center" },
  submitButtonText: { fontSize: 16, fontWeight: "bold" },
});
