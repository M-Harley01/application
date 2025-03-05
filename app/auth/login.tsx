import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [input1, setInput1] = useState(""); 
  const [input2, setInput2] = useState(""); 
  const [serverResponse, setServerResponse] = useState(""); 
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const sendDataToServer = async () => {
    try {
      const response = await fetch("http://192.168.0.30:3000/api/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text1: input1, text2: input2 }), 
      });

      const data = await response.json(); 
      
      if(data.success){
        setServerResponse("success");
        setLoggedIn(true);
        router.replace("/(tabs)");
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
        value={input1}
        onChangeText={setInput1}
      />

      <TextInput
        style={styles.textBox}
        placeholder="Enter second text"
        value={input2}
        onChangeText={setInput2}
      />

      <TouchableOpacity style={styles.Button} onPress={sendDataToServer}>
        <Text style={styles.ButtonText}>Send to Server</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.ButtonText}>Continue to App</Text>
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
