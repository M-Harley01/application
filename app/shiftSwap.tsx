//shiftSwap.tsx

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ShiftSwapScreen() {
  const { colleagueID, personalID } = useLocalSearchParams();
  const router = useRouter();

  const [colleagueMonth, setColleagueMonth] = useState("January");
  const [colleagueDate, setColleagueDate] = useState(null);
  const [userMonth, setUserMonth] = useState("January");
  const [userDate, setUserDate] = useState(null);

  const [clgDates, setClgDates] = useState<{ label: string; value: string }[]>([]);
const [usrDates, setUsrDates] = useState<{ label: string; value: string }[]>([]);

  const [monthOpen, setMonthOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [userMonthOpen, setUserMonthOpen] = useState(false);
  const [userDateOpen, setUserDateOpen] = useState(false);

  useEffect(() => {
    if (colleagueID && colleagueMonth) {
      fetchSchedule(colleagueID.toString(), colleagueMonth, true);
    }
  }, [colleagueMonth]);

  useEffect(() => {
    if (personalID && userMonth) {
      fetchSchedule(personalID.toString(), userMonth, false);
    }
  }, [userMonth]);

  const fetchSchedule = async (id: string, month: string, isTheirSchedule: boolean) => {
    try {
      const res = await fetch(`http://192.168.1.109:3000/api/schedule?colleagueID=${id}&month=${month}`);
      const data = await res.json();
      if (data.success) {
        const formattedDates = data.dayDates.map((date: string, i: number) => ({
            label: `${date} (${data.times[i]})`,
            value: date,
        }))

        if (isTheirSchedule){
            setClgDates(formattedDates);
        }else{
            setUsrDates(formattedDates);
        }
      }else{
        if(isTheirSchedule){
            setClgDates([]);
        }else{
            setUsrDates([]);
        }
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };


  const sendSwapRequest = async () => {
    if (!colleagueID || !personalID || !colleagueMonth || !colleagueDate || !userMonth || !userDate) {
      alert("Please select all fields");
      return;
    }

    const payload = {
      from: personalID,
      to: colleagueID,
      swapYour: { month: userMonth, date: userDate },
      swapWith: { month: colleagueMonth, date: colleagueDate }
    };

    try {
      const response = await fetch("http://192.168.1.109:3000/api/swapRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        alert("Swap request sent!");
        router.back();
      } else {
        alert("Failed to send swap request.");
      }
    } catch (error) {
      console.error("Swap request failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shift Swap Request</Text>

      <Text style={styles.sectionLabel}>Colleague's Shift</Text>

      <View style={{zIndex: 4000}}>
      <DropDownPicker
        open={monthOpen}
        value={colleagueMonth}
        items={months}
        setOpen={setMonthOpen}
        setValue={setColleagueMonth}
        placeholder="Select Month"
        style={styles.dropdown}
      />
      </View>

      <View style={{zIndex: 3000}}>
      <DropDownPicker
        open={dateOpen}
        value={colleagueDate}
        items={clgDates}
        setOpen={setDateOpen}
        setValue={setColleagueDate}
        placeholder="Select Date"
        style={styles.dropdown}
      />
      </View>

      <Text style={styles.sectionLabel}>Your Shift</Text>
      <View style={{zIndex: 2000}}>
      <DropDownPicker
        open={userMonthOpen}
        value={userMonth}
        items={months}
        setOpen={setUserMonthOpen}
        setValue={setUserMonth}
        placeholder="Select Month"
        style={styles.dropdown}
      />
      </View>

      <View style={{zIndex: 1000}}>
      <DropDownPicker
        open={userDateOpen}
        value={userDate}
        items={usrDates}
        setOpen={setUserDateOpen}
        setValue={setUserDate}
        placeholder="Select Date"
        style={styles.dropdown}
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={sendSwapRequest}>
        <Text style={styles.buttonText}>Send Swap Request</Text>
      </TouchableOpacity>
    </View>
  );
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

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", flex: 1 },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  sectionLabel: { marginTop: 20, marginBottom: 5, fontWeight: "bold" },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 40,
    zIndex: 1,
  },
  
  dropdownList: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    zIndex: 1000, 
  },
  button: {
    marginTop: 30,
    backgroundColor: "#005DA0",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
