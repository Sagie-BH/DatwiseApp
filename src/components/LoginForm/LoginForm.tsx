import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext/AuthContext';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLoginPress = () => {
    login({ username, password }, 'credentials'); 
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername} // Set username state on change
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword} // Set password state on change
      />
      <Button title="Login" onPress={handleLoginPress} />
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
