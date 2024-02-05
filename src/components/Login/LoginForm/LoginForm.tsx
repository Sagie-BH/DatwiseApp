import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import AppAlert from '../../general/AppAlert/AppAlert';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [biometricAlertVisible, setBiometricAlertVisible] = useState(false);

  const { login, isFirstLogin } = useAuth();

  const hideAlert = () => setAlertVisible(false);
  const hideBiometricAlert = () => setBiometricAlertVisible(false);

  const handleLoginPress = async () => {
    const authorized = await login({ username, password }, 'credentials');
    if (authorized) {
      if (isFirstLogin) {
        setBiometricAlertVisible(true);
      } else {
        // Navigate to next screen or show success message
      }
    } else {
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        containerStyle={styles.input}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.input}
      />
      <Button
        title="Login"
        onPress={handleLoginPress}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
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
    width: '100%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
  },
  inputContainerStyle: {
    paddingHorizontal: 10, 
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  inputStyle: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#397af8',
    paddingVertical: 10,
  },
});
