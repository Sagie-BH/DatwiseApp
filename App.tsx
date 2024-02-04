import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './src/types/navigationTypes/types';
import { AuthProvider, useAuth } from './src/context/AuthContext/AuthContext';

// Define your stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

const AuthNavigation: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      ) : (
        // User is not authenticated, show the login screen
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default App;
