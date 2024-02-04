import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigationTypes/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function BiometricLogin() {
  const navigation = useNavigation<NavigationProp>();
  
  const handleBiometricAuth = async () => {
    // Check if hardware supports biometric authentication
    const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricSupported) {
      Alert.alert('Biometric authentication not supported');
      navigation.navigate('Login' as never);
      return;
    }

    // Check if biometrics are enrolled
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert('No Biometrics Found', 'Please ensure you have set up biometric authentication in your device settings.');
      navigation.navigate('Login' as never);
      return;
    }

    // Authenticate using biometrics
    const authResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Enter Password', // iOS only
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    });

    if (authResult.success) {
      Alert.alert('Authenticated', 'You have successfully logged in using biometrics.');
      // Implement what happens after successful authentication, e.g., navigate to home screen
      navigation.replace('Home');
    } else {
      Alert.alert('Authentication Failed', authResult.error || 'Failed to authenticate');
      // Handle authentication failure (e.g., fallback to password login, retry, etc.)
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Biometric Login" onPress={handleBiometricAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
