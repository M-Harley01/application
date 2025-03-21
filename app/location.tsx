//Location.tsx

import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';

<StatusBar style="light" backgroundColor="#005DA0" />

const HomeScreen = () => {
  const { colleagueID } = useLocalSearchParams();
  const router = useRouter();

  const [checkedIn, setCheckedIn] = useState(false);
  const [coordinates, setCoordinates] = useState<Location.LocationObject | null>(null);

  function home() {
    router.replace({ pathname: "/(tabs)", params: { colleagueID, refresh: Math.random().toString()}});
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  const requestLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use location services.');
      return;
    }

    trackLocation();
  };

  const trackLocation = async () => {
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (location) => {
        console.log("live location updade: ", location.coords)
        setCoordinates(location);
      }
    );
  };

  const compareLocations = async () => {

    if(!coordinates){
      console.log("No coordinates available");
      return;
    }
    
    try {
      const { latitude, longitude } = coordinates.coords;

      const response = await fetch(
        `http://192.168.1.109:3000/api/location?userID=${colleagueID}&lat2=${latitude}&lon2=${longitude}`
      );
      const data = await response.json();

      if (data.success) {
        setCheckedIn(true);
        console.log(`Distance from reference point: ${data.distance} meters`);
        router.replace({pathname: "/(tabs)", params: {colleagueID}})
      } else {
        console.log("Check-in failed. Try again");
      }
    } catch (error) {
      console.error("Error comparing locations:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {checkedIn ? (
          <Text>Check In Successful</Text>
        ) : (
          <Text>Fetching location...</Text>
        )}
      </View>

      <TouchableOpacity onPress={compareLocations} style={styles.button}>
        <Text style={styles.buttonText}>Check In</Text>
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
