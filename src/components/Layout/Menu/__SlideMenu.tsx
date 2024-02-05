import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

interface MenuItem {
    title: string;
    action: () => void;
}

const SlideMenu: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const animateLeft = useRef(new Animated.Value(-250)).current; // Start off-screen

    useEffect(() => {
        Animated.timing(animateLeft, {
            toValue: menuVisible ? 0 : -250, // Move in from or out to the left
            duration: 250,
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [menuVisible]);

    const menuItems: MenuItem[] = [
        { title: 'Home', action: () => console.log('Home clicked') },
        { title: 'Profile', action: () => console.log('Profile clicked') },
        { title: 'Home', action: () => console.log('Home clicked') },
        { title: 'Profile', action: () => console.log('Profile clicked') },
        { title: 'Home', action: () => console.log('Home clicked') },
        { title: 'Profile', action: () => console.log('Profile clicked') },
        { title: 'Home', action: () => console.log('Home clicked') },
        { title: 'Profile', action: () => console.log('Profile clicked') },
        { title: 'Home', action: () => console.log('Home clicked') },
        { title: 'Profile', action: () => console.log('Profile clicked') },
        { title: 'Home', action: () => console.log('Home clicked') },
        { title: 'Profile', action: () => console.log('Profile clicked') },
    ];
    

    const handleMenuItemClick = (action: () => void) => {
        action();
        setMenuVisible(false); // Close the menu after selection
    };

    return (
        <Animated.View style={[styles.menu, { transform: [{ translateX: animateLeft }] }]}>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.toggleButton}>
                <Text>Toggle Menu</Text>
            </TouchableOpacity>
            {menuItems.map((item, index) => (
                <ListItem key={index} onPress={() => handleMenuItemClick(item.action)} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    menu: {
        zIndex: 100,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 250, // Fixed width for the menu
    },
    toggleButton: {
        padding: 10,
        marginBottom: 20,
    },
});

export default SlideMenu;



