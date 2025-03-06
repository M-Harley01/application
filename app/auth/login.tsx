//login.tsx

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [userName, setInput1] = useState(""); 
  const [password, setInput2] = useState(""); 
  const [serverResponse, setServerResponse] = useState(""); 
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const sendDataToServer = async () => {
    try {
      const response = await fetch("http://10.201.35.121:3000/api/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text1: userName, text2: password }), 
      });

      const data = await response.json(); 
      
      if(data.success){
        setServerResponse("success");
        setLoggedIn(true);
        router.replace({pathname: "/(tabs)", params: {username: userName}});
      }else{
        setServerResponse("Incorrect username or password")
        setLoggedIn(false);
      }
    }
    catch (error) {
      console.error("Error sending data:", error);
      setServerResponse("Failed to send data.");
    }
  };

  return (
    <View style={styles.Background}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login Screen</Text>

      <TextInput
        style={styles.textBox}
        placeholder="Enter first text"
        value={userName}
        onChangeText={setInput1}
      />

      <TextInput
        style={styles.textBox}
        placeholder="Enter second text"
        value={password}
        onChangeText={setInput2}
      />

      <TouchableOpacity style={styles.Button} onPress={sendDataToServer}>
        <Text style={styles.ButtonText}>Log In</Text>
      </TouchableOpacity>

      {serverResponse ? <Text style={{ fontSize: 18, marginTop: 20 }}>{serverResponse}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AAC4EA",
  },
  Button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textBox: {
    backgroundColor: "white",
    width: "50%",
    height: "5%",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    textAlign: "left",
    paddingHorizontal: 10,
  },
});
