/* report.tsx */ 

import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function ReportScreen() {

  const [urgencyOpen, setUrgencyOpen] = useState(false);
  const [selectedUrgency, setSelectedUrgency] = useState(null);
  const urgencyOptions = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryOptions = [
    { label: "Damaged Items", value: "damaged_items" },
    { label: "Inventory Issue", value: "inventory_issue" },
    { label: "Customer Service Issue", value: "customer_service_issue" },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          placeholder="Enter your text..."
          multiline={true}
        />
        <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Attach Image</Text>
                  </TouchableOpacity>

        <DropDownPicker
        open={urgencyOpen}
        value={selectedUrgency}
        items={urgencyOptions}
        setOpen={setUrgencyOpen}
        setValue={setSelectedUrgency}
        placeholder="Select Urgency"
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        textStyle={{ fontSize: 16 }}
      />

<DropDownPicker
        open={categoryOpen}
        value={selectedCategory}
        items={categoryOptions}
        setOpen={setCategoryOpen}
        setValue={setSelectedCategory}
        placeholder="Select Category"
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        textStyle={{ fontSize: 16 }}
      />

<TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Submit Issue</Text>
                  </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#AAC4EA'
  },
  textBox: {
    backgroundColor: "white",
    width: "90%", 
    height: "30%",
    marginHorizontal: 20,  
    marginVertical: 10,  
    borderRadius: 10,  
    textAlign: "left",  
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff"
  },
  dropdownContainer: {
    marginBottom: 15, // Spacing between dropdowns
    zIndex: 1000, // Prevents overlap issues
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  editButton: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 5, alignSelf: "flex-start", marginBottom: 10 },
  editButtonText: { fontSize: 16, fontWeight: "bold" },


});
