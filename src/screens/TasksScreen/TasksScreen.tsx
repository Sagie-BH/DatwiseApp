import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const TasksScreen = () => {
    return (
        <ImageBackground
            source={require('../../../assets/images/tasksScreen.png')}
            style={styles.container}
        >
            <View style={styles.overlay}>
                <Text style={styles.text}>Welcome to the Tasks Screen!</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    // This overlay view can be styled to make the text more readable
    // depending on your background image's colors and patterns.
    backgroundColor: 'rgba(0,0,0,0.5)', // Example: a semi-transparent dark overlay
    padding: 20,
    borderRadius: 5,
  },
  text: {
    color: 'white', // Adjust text color for better readability over the background image
    fontSize: 20, // Adjust font size as needed
  },
});

export default TasksScreen;
