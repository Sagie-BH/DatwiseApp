import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/context/AuthContext/AuthContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import AuthStack from './src/context/AuthContext/AuthStack';
import NavigationContent from './src/navigation/NavigationContent';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationContent/>
      </NavigationContainer>
    </AuthProvider>
  );
};


export default App;