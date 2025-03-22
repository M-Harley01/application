//report.tsx

import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import { TextInput } from 'react-native';
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ReportScreen() {
  const router = useRouter();
  const { colleagueID, imageUri } = useLocalSearchParams();

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(typeof imageUri === "string" ? imageUri : null);
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

    if (image) {

      const filename = `issue_${colleagueID}_${Date.now()}.jpg`

      formData.append("image", {
        uri: imageUri,
        name: filename,
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

        setDescription("");
        setSelectedUrgency(null);
        setSelectedCategory(null);
        setUrgencyOpen(false);
        setCategoryOpen(false);
        setImage(null);
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
          placeholder="Enter issue description..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Image preview or placeholder */}
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: "#999" }}>Image preview</Text>
          </View>
        )}

        {/* Category and Image button */}
        <View style={styles.row}>
          <View style={{ flex: 0.7, zIndex: 3000 }}>
            <DropDownPicker
              open={categoryOpen}
              value={selectedCategory}
              items={categoryOptions}
              setOpen={setCategoryOpen}
              setValue={setSelectedCategory}
              placeholder="Category"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={{ fontSize: 16 }}
            />
          </View>

          <TouchableOpacity
            style={styles.attachButton}
            onPress={() => router.push({ pathname: "../attachImage", params: { colleagueID } })}
          >
            <Text style={styles.attachText}>📸</Text>
          </TouchableOpacity>
        </View>

        {/* Urgency dropdown */}
        <View style={{ zIndex: 2000, width: "90%" }}>
          <DropDownPicker
            open={urgencyOpen}
            value={selectedUrgency}
            items={urgencyOptions}
            setOpen={setUrgencyOpen}
            setValue={setSelectedUrgency}
            placeholder="Urgency"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16 }}
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitIssue}>
          <Text style={styles.submitText}>Submit Issue</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#AAC4EA",
  },
  textBox: {
    backgroundColor: "#fff",
    width: "90%",
    height: 150,
    padding: 15,
    borderRadius: 20,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
  },
  attachButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.25,
    marginLeft: 10,
    height: 50,
  },
  attachText: {
    fontSize: 22,
  },
  submitButton: {
    backgroundColor: "#368bd6",
    width: "90%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
