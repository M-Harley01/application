import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router"; 

export default function AttachImageScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Attach Image Page</Text>

      <TouchableOpacity style={styles.editButton} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.editButtonText}>Back to Tabs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AAC4EA",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
