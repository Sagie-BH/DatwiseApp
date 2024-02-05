import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import HRScreen from './src/screens/HRScreen/HRScreen';
import TasksScreen from './src/screens/TasksScreen/TasksScreen';
import { RootStackParamList } from './src/types/navigationTypes/types';
import { AuthProvider, useAuth } from './src/context/AuthContext/AuthContext';
import AppLayout from './src/components/Layout/AppLayout';

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
    <AppLayout>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HRScreen" component={HRScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TasksScreen" component={TasksScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </AppLayout>
  );
};
export default App;
