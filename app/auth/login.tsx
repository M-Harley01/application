import { useState } from "react";
import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";

export default function LoginScreen() {
  const [serverResponse, setServerResponse] = useState("hello");
  const router = useRouter();

  const fetchResponse = async () => {
    try {
      const response = await fetch("http://192.168.0.30:3000/"); 
      const data = await response.text(); 
      setServerResponse(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setServerResponse("Failed to fetch response");
    }
  };

  return (
    <View style={styles.Background}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login Screen</Text>

      <TextInput style={styles.textBox}>

      </TextInput>

      <TextInput style={styles.textBox}>

      </TextInput>

      <TouchableOpacity style={styles.Button}  onPress={fetchResponse} >
        <Text style={styles.ButtonText}>Get response</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button} onPress={() => router.replace("/(tabs)")} >
        <Text style={styles.ButtonText}>Continue to App</Text>
      </TouchableOpacity>

      {serverResponse ? <Text style={{ fontSize: 18, marginTop: 20 }}>{serverResponse}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  Background:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#AAC4EA"
  },
  Button:{
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
    fontWeight: "bold"
  },
  textBox: {
    backgroundColor: "white",
    width: "50%", 
    height: "5%",
    marginHorizontal: 20,  
    marginVertical: 10,  
    borderRadius: 10,  
    textAlign: "left",  
  },
});