import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import { TextInput } from 'react-native';
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ReportScreen() {
  const router = useRouter();
  const { colleagueID, imageUri } = useLocalSearchParams(); // Capture the image URI from params

  const [description, setDescription] = useState("");

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

  const submitIssue = async () => {
    if (!selectedUrgency || !selectedCategory || !description.trim()) {
      Alert.alert("Please complete all fields before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("colleagueID", Array.isArray(colleagueID) ? colleagueID[0] : colleagueID);
    formData.append("urgency", selectedUrgency);
    formData.append("category", selectedCategory);
    formData.append("description", description);
  
    // Attach the image if available
    if (imageUri) {
      formData.append("image", {
        uri: imageUri,
        name: "issue_photo.jpg",
        type: "image/jpeg",
      } as any);
    }
  
    try {
      const response = await fetch("http://192.168.1.109:3000/api/reportIssue", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const data = await response.json();
      if (data.success) {
        Alert.alert("Success", "Issue submitted successfully.");
        router.replace({ pathname: "/(tabs)", params: { colleagueID } });
      } else {
        Alert.alert("Error", "Failed to submit issue.");
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          placeholder="Enter your text..."
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />

        {imageUri && typeof imageUri === "string" && ( // Display the image if it's available
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}

        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => router.push({ pathname: "../attachImage", params: { colleagueID } })}>
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

        <TouchableOpacity style={styles.editButton} onPress={submitIssue}>
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
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  dropdownContainer: {
    marginBottom: 15,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  editButton: { 
    backgroundColor: "#E0E0E0", 
    padding: 10, 
    borderRadius: 5, 
    alignSelf: "flex-start", 
    marginBottom: 10 
  },
  editButtonText: { fontSize: 16, fontWeight: "bold" },
});
