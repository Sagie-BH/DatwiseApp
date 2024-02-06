// DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HRScreen from '../screens/HRScreen/HRScreen';
import TasksScreen from '../screens/TasksScreen/TasksScreen';
import DrawerContent from './DrawerContent';
import withAppLayout from '../components/Layout/withAppLayout';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Home" component={withAppLayout(HomeScreen)} />
            <Drawer.Screen name="HRScreen" component={HRScreen} />
            <Drawer.Screen name="TasksScreen" component={TasksScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
