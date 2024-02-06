import React from 'react';
import DrawerNavigator from "./DrawerNavigator";
import { useAuth } from "../context/AuthContext/AuthContext";
import AuthStack from "../context/AuthContext/AuthStack";



const NavigationContent: React.FC = () => {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? <DrawerNavigator /> : <AuthStack />;
  };
  

  export default NavigationContent;