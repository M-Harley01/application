import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface Colleague {
  firstName: string;
  lastName: string;
  colleagueID: string;
}

export default function ScheduleScreen() {

  const router = useRouter();

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

  const [colleagues, setColleagues] = useState<{ label: string; value: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (colleagueID && selectedMonth) {
        fetchSchedule();
      }
    }, [colleagueID, selectedMonth])
  );

  useEffect(() => {
    fetchColleagues();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedMonth("");  
      setSelectedFilter(null);
      setSelectedSwap(null);
    }, [])
  );

  const fetchSchedule = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.109:3000/api/schedule?colleagueID=${colleagueID}&month=${selectedMonth}`
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

  const fetchColleagues = async () => {
    try {
      const response = await fetch("http://192.168.1.109:3000/api/colleagues");
      const data = await response.json();

      if (data.success) {
        const allColleagues = data.colleagues;

        const filtered = allColleagues.filter((c: Colleague) => c.colleagueID !== colleagueID);

        const formatted = filtered.map((c: Colleague) => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.colleagueID
        }));
        setColleagues(formatted);
      }
    } catch (error) {
      console.error("Error fetching colleagues")
    }
  };

  const handleColleagueSelect = (value: string | null) => {
    if (value) {
      router.push({
        pathname: "../colleagueSchedule",
        params: {
          colleagueID: value,
          month: selectedMonth
        }
      });
    }
  }

  const handleShiftChange = (value: string | null) => {
    if (value) {
      router.push({
        pathname: "../shiftSwap",
        params: {
          colleagueID: value,
          personalID: colleagueID
        }
      });
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


  return (
    <View style={styles.container}>
  
      {/* Gray Top Section */}
      <View style={styles.grayTopSection}>
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
              placeholder="View Colleague shifts"
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              dropDownContainerStyle={styles.dropdownAbsolute}
              textStyle={{ fontSize: 14 }}
              onChangeValue={handleColleagueSelect}
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
              onChangeValue={handleShiftChange}
            />
          </View>
        </View>
  
      
        
      </View>
  
      {/* Schedule Table */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      <Text style={{ textAlign: "center", marginTop: 20 }}>No shifts available for {selectedMonth}</Text>
    )}
  </View>
</ScrollView>

<View style={styles.refreshWrapper}>
  <Button title="Refresh Schedule" color="#ffffff" onPress={fetchSchedule} />
</View>

    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAC4EA", 
  },

  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingTop: 10,
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
  shiftRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  dayColumn: {
    width: 80,
    backgroundColor: "#d7dbd8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  dayText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  shiftBox: {
    flex: 1,
    backgroundColor: "rgba(0, 93, 160, 0.56)",
    padding: 12,
    borderRadius: 25,
    marginLeft: 8,
  },
  shiftTime: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  shiftType: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
  },
  notScheduled: {
    backgroundColor: "#d7dbd8", 
  },
  grayTopSection: {
    backgroundColor: "#005DA0",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollContent: {
  flexGrow: 1,
  backgroundColor: "#AAC4EA", // light blue behind the scroll area
  paddingBottom: 30, // space under the button
},
refreshWrapper:{
  backgroundColor: "#005DA0",
  padding: 10,
  marginTop: 5,
  borderRadius: 8,
  width: "100%"
}
});
