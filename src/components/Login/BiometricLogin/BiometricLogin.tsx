import React from 'react';
import { View, Button, StyleSheet, Alert, Image, Animated, Easing } from 'react-native';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import { Icon } from 'react-native-elements';


export default function BiometricLogin() {
  const { authenticateBiometric } = useAuth();

  // Animation settings
  const rotateAnim = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleBiometricAuth = async () => {
    const success = await authenticateBiometric();
    if (success) {
      Alert.alert('Authenticated', 'You have successfully logged in using biometrics.');
      // Handle successful authentication, e.g., navigate to the home screen
    } else {
      Alert.alert('Authentication Failed', 'Failed to authenticate using biometrics.');
      // Handle authentication failure
    }
  };

  return (
    <View style={styles.container}>
      {/* Add Image component with styles */}
      <Image source={require('../../../../assets/images/biometrics.png')} style={styles.biometricImage} />

      {/* Add rotation animation to the image */}
      {/* <Animated.View
        style={[
          styles.rotateIconContainer,
          {
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
        onLayout={startAnimation}
      >
        <Icon name="sync" type="font-awesome" color="#fff" size={30} />
      </Animated.View> */}

      <Button title="Biometric Login" onPress={handleBiometricAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  biometricImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 20,
    // Apply shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  rotateIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#007AFF', // Background color of the rotation icon container
    borderRadius: 25,
    bottom: 20,
    // Apply shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
