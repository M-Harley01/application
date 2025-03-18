import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const HomeScreen = () => {
  const { colleagueID } = useLocalSearchParams();
  const router = useRouter();

  const [coordinates, setCoordinates] = useState<Location.LocationObject | null>(null);
  const [serverLocationSet, setServerLocationSet] = useState(false);

  function home() {
    router.replace({ pathname: "/(tabs)", params: { colleagueID } });
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow the app to use location services.');
      return;
    }

    const locationData = await Location.getCurrentPositionAsync();
    console.log("Initial Location: ", locationData);

    setCoordinates(locationData);
  };

  const compareLocations = async () => {
    if (!coordinates) {
      console.log("No coordinates available");
      return;
    }

    const locationData = await Location.getCurrentPositionAsync(); 
    setCoordinates(locationData); 

    const { latitude, longitude } = locationData.coords;

    try {
      const response = await fetch(
        `http://10.201.35.121:3000/api/location?lat2=${latitude}&lon2=${longitude}`
      );
      const data = await response.json();

      if (data.success) {
        console.log(`Distance from reference point: ${data.distance} meters`);
      } else {
        console.log("Check-in failed.");
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
