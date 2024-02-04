// LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../../components/LoginForm/LoginForm';
import BiometricLogin from '../../components/BiometricLogin/BiometricLogin';


export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LoginForm />
      <BiometricLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Example background color
  },
});
