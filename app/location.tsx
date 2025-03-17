//location.tsx

import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const HomeScreen = () => {
  const { colleagueID } = useLocalSearchParams();
  const router = useRouter();

  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState<Location.LocationObject | null>(null);

  function home() {
    router.replace({ pathname: "/(tabs)", params: { colleagueID } });
  }

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert('Location not enabled', 'Please enable your Location', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK' },
      ]);
    } else {
      setLocationServicesEnabled(enabled);
      console.log("Location services enabled: ", enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);

    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use the location services', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK' },
      ]);
      return;
    }

    const locationData = await Location.getCurrentPositionAsync(); 
    console.log("Coordinates: ", locationData); 
    setCoordinates(locationData); 
  };

  const compareLocations = async () => {
    if (!coordinates) {
      console.log("No coordinates available");
      return;
    }

    const { latitude, longitude } = coordinates.coords;

    try {
      const response = await fetch(
        `http://10.201.35.121:3000/api/location?lat2=${latitude}&lon2=${longitude}`
      );
      const data = await response.json();
  
      if (data.success) {
        console.log("Clock in successful");
      } else {
        console.log("Clock in unsuccessful");
      }
    } catch (error) {
      console.error("Error comparing locations:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {coordinates ? (
          <Text>Latitude: {coordinates.coords.latitude}, Longitude: {coordinates.coords.longitude}</Text>
        ) : (
          <Text>Fetching location...</Text>
        )}
      </View>

      <TouchableOpacity onPress={compareLocations} style={styles.button}>
        <Text style={styles.buttonText}>Compare Locations</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={home} style={styles.button}>
        <Text style={styles.buttonText}>Okay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#005DA0',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
