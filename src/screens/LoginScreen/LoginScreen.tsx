import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Animated, Text } from 'react-native';
import LoginForm from '../../components/Login/LoginForm/LoginForm';
import BiometricLogin from '../../components/Login/BiometricLogin/BiometricLogin';
import { useAuth } from '../../context/AuthContext/AuthContext';

export default function LoginScreen() {
  const { isBiometricEnable, isFirstLogin,isBiometricSetUp, isBiometricAble } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'username' | 'biometric'>('username');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Automatically set login method to biometric if enabled
    if (isBiometricEnable && !isFirstLogin) {
      setLoginMethod('biometric');
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isBiometricEnable, isFirstLogin]);

  return (
    <View style={styles.container}>
      <Text>isBiometricEnable: {isBiometricEnable ? 'true' : 'false'}</Text>
      <Text>isFirstLogin: {isFirstLogin ? 'true' : 'false'}</Text>
      <Text>isBiometricSetUp: {isBiometricSetUp ? 'true' : 'false'}</Text>
      <Text>isBiometricAble: {isBiometricAble ? 'true' : 'false'}</Text>
      <Animated.View
        style={[
          styles.loginFormContainer,
          { opacity: fadeAnim },
          styles.shadow,
        ]}
      >
        {loginMethod === 'username' && <LoginForm />}
        {loginMethod === 'biometric' && isBiometricEnable && !isFirstLogin && <BiometricLogin />}
      </Animated.View>

      <View style={styles.buttonContainer}>
        <Button title="Credentials" onPress={() => setLoginMethod('username')} />
        {isBiometricEnable && (
          <Button title="Biometrics" onPress={() => setLoginMethod('biometric')} />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a1a1a1',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '80%',
  },
  loginFormContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
});
