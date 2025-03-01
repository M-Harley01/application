/* profile.tsx */ 

import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <TextInput  style={styles.textBox} >

      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: 'white',
    width: '100%',
    height: '30%'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff"
  },
});
