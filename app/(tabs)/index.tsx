import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ProfileScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' }, 
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' }
  ]);

  return (
    <View style={styles.mainView}>
      <Text style={styles.headingText}>Colleague Profile</Text>
      <Text style={styles.text}>Name: firstName surname</Text>
      <Text style={styles.text}>Store Location: Dundee</Text>
      <Text style={styles.text}>Holiday days:</Text>
      <Text style={styles.text}>Request Holidays:</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 45
  },
  headingText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "#ffffff",
    paddingBottom: 45,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#ffffff",
  },
});
