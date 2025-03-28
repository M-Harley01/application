// index.tsx

import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";

export default function ProfileScreen() {

  const router = useRouter();
  
  const [startOpen, setStartOpen] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);
  const [endValue, setEndValue] = useState(null);

  const {colleagueID, refresh} = useLocalSearchParams();
  const params = useLocalSearchParams();

  const [checkedIn, setCheckedIn] = useState(false);

  console.log(`app check in is set to ` + checkedIn);

  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [contactNo, setContact] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [holidays, setholidays] = useState<number>(0);

  useEffect(() => {
    if (colleagueID && typeof colleagueID !== "string" || colleagueID.trim() !== "") {
      fetchUserDetails();
    } else {
      console.log("[ProfileScreen] Skipping fetch, no valid colleagueID.");
    }
  }, [colleagueID, refresh]);

  const fetchUserDetails = async () => {
    if (!colleagueID || typeof colleagueID !== "string" || colleagueID.trim() === "") {
      console.warn("[fetchUserDetails] Invalid colleagueID:", colleagueID);
      return;
    }

    try{
      const response = await fetch(
        `http://192.168.1.109:3000/api/profile?colleagueID=${colleagueID}`
      );

      const data = await response.json();
      console.log("Raw server response:", data);

      console.log(`checked in on the server is ` + data.checkedIn);

      if(data.success){
        setFname(data.firstName);
        setLname(data.lastName);
        setContact(data.contactNo);
        setPosition(data.position);
        setLocation(data.location);
        setCheckedIn(data.checkedIn);
        setholidays(data.holidays);
      }
      else{
        console.log("failed getting details: ");
      }
    }catch(error){
        console.error("Error fetching user details: ", error);
    }
  }

  const handleCheckOut = async () => {
    try {
      const response = await fetch("http://192.168.1.109:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: colleagueID }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Checked out successfully");
        router.replace({ pathname: "/(tabs)", params: { colleagueID, refresh: Date.now().toString() } });
      } else {
        console.error("Check-out failed:", data.message);
      }
    } catch (error) {
      console.error("Error during check-out:", error);
    }
  };

  function locationTime(){
    router.replace({pathname: "../location", params: {colleagueID}})
  }

  const submitHolidays = async () => {

    if(!colleagueID || !startValue || !startDateValue || !endValue || !endDateValue){
      Alert.alert("you need to fill out all holiday request details");
      return;
    }

    try{
      const response = await fetch("http://192.168.1.109:3000/api/holidays",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          colleagueID,
          start: {
            month: startValue,
            date: startDateValue
          },
          end: {
            month: endValue,
            date: endDateValue
          }
        })
      });

      const data = await response.json();

      if(data.success){
        console.log("Requests submitted successfully")
        setholidays(data.remainingHolidays);

        Alert.alert("Holiday requests successfully submitted");

        setStartValue(null);
        setStartDateValue(null);
        setEndValue(null);
        setEndDateValue(null);
      }else{
        console.error("submission failed");
      }

    }catch(error){
      console.error("Error submitting holiday requests: ", error);
      alert("An error occured submitting the request");
    }
  }

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

      <View style={styles.section}>
  <View style={styles.nameRow}>
    <Text style={styles.nameText}>{firstName} {lastName}</Text>
  </View>
  <Text style={styles.idText}>Colleague ID: #{colleagueID}</Text>

</View>

        <View style={styles.infoBox}>
          <Text style={styles.text}>Contact no.: {contactNo}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Position: {position}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Location: {location}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.text}>Holidays: {holidays} days</Text>
        </View>

        

        <View style={styles.section}>
          <Text style={styles.subHeadingText}>Holiday Requests</Text>

          <View style={styles.dropdownRow}>
            <View style={[styles.dropdownWrapper, { zIndex: startOpen ? 3000 : 1 }]}>
            <DropDownPicker dropDownDirection={"TOP"} open={startOpen} value={startValue} items={months} setOpen={setStartOpen} setValue={setStartValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Month" />
            </View>

            <View style={[styles.dropdownWrapper, { zIndex: startDateOpen ? 2500 : 1 }]}>
            <DropDownPicker dropDownDirection={"TOP"} open={startDateOpen} value={startDateValue} items={availableStartDates} setOpen={setStartDateOpen} setValue={setStartDateValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Date" />
            </View>
          </View>

          <View style={styles.dropdownRow}>
            <View style={[styles.dropdownWrapper, { zIndex: endOpen ? 2000 : 1 }]}>
            <DropDownPicker dropDownDirection={"TOP"} open={endOpen} value={endValue} items={months} setOpen={setEndOpen} setValue={setEndValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Month" />
            </View>

            <View style={[styles.dropdownWrapper, { zIndex: endOpen ? 1500 : 1 }]}>
            <DropDownPicker dropDownDirection={"TOP"} open={endDateOpen} value={endDateValue} items={availableEndDates} setOpen={setEndDateOpen} setValue={setEndDateValue} style={styles.dropdown} listMode="SCROLLVIEW" placeholder="Select Date" />
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText} onPress={submitHolidays}>Submit</Text>
          </TouchableOpacity>
        </View>

        {checkedIn ? (
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckOut}>
          <Text style={styles.checkoutText}>Check Out</Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={locationTime}>
            <Text style={styles.editButtonText}>Clock In</Text>
          </TouchableOpacity>
        )}

      </ScrollView>

      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#AAC4EA", paddingBottom: 50 },
  scrollContent: { padding: 10 },
  section: { backgroundColor: "#005DA0", padding: 20, borderRadius: 10, marginBottom: 20 },
  infoBox: { backgroundColor: "rgba(0, 93, 160, 0.56)", padding: 20, borderRadius: 10, marginBottom: 20 },
  text: { fontSize: 18, color: "#ffffff", paddingBottom: 5 },
  subHeadingText: { fontSize: 22, fontWeight: "bold", color: "#ffffff", paddingBottom: 10 },
  editButton: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 5, alignSelf: "flex-start", marginBottom: 10 },
  editButtonText: { fontSize: 16, fontWeight: "bold" },
  dropdownRow: { flexDirection: "row", paddingRight: -20 , paddingBottom: 10},
  dropdownWrapper: {flex: 1,marginHorizontal: 5},
  dropdown: { width: 160 },
  submitButton: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 5, alignSelf: "center", marginTop: 10, minWidth: 100, textAlign: "center" },
  submitButtonText: { fontSize: 16, fontWeight: "bold" },
  disabledButton: {
    backgroundColor: "#A0A0A0", 
    opacity: 0.6,
  },
  disabledText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  checkoutButton: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5, alignSelf: "center", marginTop: 10 },
  checkoutText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  nameRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 4,
  },
  
  nameText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
  },
  
  idText: {
    fontSize: 25,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  
});
