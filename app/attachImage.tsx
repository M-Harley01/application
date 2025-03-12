import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
  
    return <View />;
  }

  if (!permission.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto =  async () => {
    if (cameraRef.current) {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        const takedPhoto = await cameraRef.current.takePictureAsync(options);

        setPhoto(takedPhoto);
    }
  }; 

  const handleRetakePhoto = () => setPhoto(null);
  
  return photo ? (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.previewContainer} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} />
      </View>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
          <Text style={styles.text}> Retake Picture </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}> Use Picture </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      </CameraView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    justifyContent: 'center',
    backgroundColor: '#AAC4EA',
    height: '100%' 
  },
  camera: {
    flex: 3,
    height: '80%',
    width: '90%',
  },
  box: {
    flex: 0.7,
    borderRadius: 15,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
  },
  previewContainer: {
    width: '95%',
    height: '100%', 
    borderRadius: 15,
    resizeMode: 'contain', 
  },
  buttonContainer: {
    flex: 0.3, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: '15%',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    position: 'relative',
  
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});