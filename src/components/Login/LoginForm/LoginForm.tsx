import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import AppAlert from '../../AppAlert/AppAlert';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [biometricAlertVisible, setBiometricAlertVisible] = useState(false);

  const { login, isFirstLogin, isAuthenticated } = useAuth();

  const hideAlert = () => setAlertVisible(false);
  const hideBiometricAlert = () => setBiometricAlertVisible(false);

  const handleLoginPress = async () => {
    const authorized = await login({ username, password }, 'credentials');
    console.log("authorized: " + authorized)
    if (authorized) {
      console.log("isFirstLogin: " + isFirstLogin)
      if (isFirstLogin) {
        // Show biometric setup alert
        setBiometricAlertVisible(true);
      } else {
        // Proceed with other post-login actions for returning users
      }
    } else {
      // Show login failed alert
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLoginPress} />
      <AppAlert
        title="Login Failed"
        message="Your username or password is incorrect."
        buttons={[{ text: 'OK', onPress: hideAlert }]}
        visible={alertVisible}
        onRequestClose={hideAlert}
      />
      <AppAlert
        title="Biometric Setup"
        message="Would you like to set up biometric login for faster access next time?"
        buttons={[
          { text: 'Yes', onPress: () => {/* Add logic for enabling biometric setup */} },
          { text: 'No', onPress: hideBiometricAlert }
        ]}
        visible={biometricAlertVisible}
        onRequestClose={hideBiometricAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});
