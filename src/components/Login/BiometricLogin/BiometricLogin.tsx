import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../../context/AuthContext/AuthContext'; // Adjust import path as necessary

export default function BiometricLogin() {
  const { authenticateBiometric } = useAuth();

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
      <Button title="Biometric Login" onPress={handleBiometricAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
