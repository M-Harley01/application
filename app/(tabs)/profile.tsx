/* profile.tsx */ 

import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>Welcome to the Profile Screen!</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff"
  },
});
