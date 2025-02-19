import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ProfileScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' }, 
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' }
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

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

      <View style={styles.shiftBox}>
        <TouchableOpacity style={styles.shiftButton}>
          <Text style={styles.shiftButtonText}>Start Shift</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shiftBox}>
        <Text style={styles.text}>Holidays: 28 days</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeadingText}>Holiday Requests</Text>
          <View style={styles.dropdownRow}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
              />    

                    
          </View>

       <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAC4EA",
  },
  scrollContent: {
    padding: 10, 
  },
  header: {
    backgroundColor: "#005DA0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#005DA0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "rgba(0, 93, 160, 0.56)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  shiftBox: {
    backgroundColor: "rgba(0, 93, 160, 0.56)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#ffffff",
    paddingBottom: 5,
  },
  subHeadingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    paddingBottom: 10,
  },
  editButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shiftButton: {
    backgroundColor: "#005DA0",
    padding: 10,
    borderRadius: 5,
  },
  shiftButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  dropdownRow: {
    flexDirection: "row",
    width : 170,
    paddingBottom: 10
  },
  dropdown: {
    width: 150,
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
