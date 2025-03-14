import { StyleSheet, Text, Alert, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading.....');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  useEffect(()=>{
   checkIfLocationEnabled();
   getCurrentLocation();
  },[])

  const checkIfLocationEnabled= async ()=>{
    let enabled = await Location.hasServicesEnabledAsync();      
    if(!enabled){                     
      Alert.alert('Location not enabled', 'Please enable your Location', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setLocationServicesEnabled(enabled)        
      console.log("Location services enabled: ", enabled);
    }
  }
 
  const getCurrentLocation= async ()=>{
       let {status} = await Location.requestForegroundPermissionsAsync();  
      console.log(status);
       if(status !== 'granted'){
        Alert.alert('Permission denied', 'Allow the app to use the location services', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
       }

       const {coords} = await Location.getCurrentPositionAsync();  
       console.log(coords)
       
       if(coords){
        const {latitude,longitude} =coords;
        console.log(latitude,longitude);

        let responce = await Location.reverseGeocodeAsync({           
          latitude,
          longitude
        });
        console.log(responce);
       
        for(let item of responce ){
         let address = `${item.name} ${item.city} ${item.postalCode}`
          setDisplayCurrentAddress(address)
          console.log(displayCurrentAddress)
        }
           }
  }
  
  return (
    <SafeAreaView style = {styles.container}>
      <View><Text>{displayCurrentAddress}</Text></View>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white'
    }
})