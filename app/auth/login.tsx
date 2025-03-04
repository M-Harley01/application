import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Login Screen</Text>
      <Button title="Continue to App" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}
