import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    
    return <View />;
  } 

  if (!permission.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center', 
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      width: '100%', 
      height: '70%', 
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20, 
      alignSelf: 'center',
      paddingBottom: '10%'
    },
    button: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 5,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
  });
  
