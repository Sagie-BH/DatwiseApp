import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

type DrawerContentProps = {
    onClose: () => void;
};

const DrawerContent: React.FC<DrawerContentProps> = ({ onClose }) => {
    const navigation = useNavigation();
    const [expandedOption, setExpandedOption] = useState<string | null>(null);

    const handlePressOption = (optionTitle: string) => {
        setExpandedOption(expandedOption === optionTitle ? null : optionTitle);
    };

    const handlePressIcon = (optionTitle: string, event: any) => {
        event.stopPropagation(); // Prevent TouchableOpacity from triggering navigation
        handlePressOption(optionTitle);
    };

    const isOptionExpanded = (optionTitle: string) => {
        return expandedOption === optionTitle;
    };

    const options = [
        { 
            title: 'Home', 
            onPress: () => { 
                navigation.navigate('Home' as never); 
                onClose(); 
            }
        },
        {
            title: 'HR Screen',
            onPress: () => {
                navigation.navigate('HRScreen' as never);
                onClose();
            },
            moreOptions: [
                { title: 'Create new employee', onPress: () => console.log('Option 1 selected - Create employee task') },
                { title: 'Show employee list', onPress: () => console.log('Option 2 selected - Show employee list') },
            ]
        },
        {
            title: 'Tasks Screen',
            onPress: () => {
                navigation.navigate('TasksScreen' as never);
                onClose();
            },
            moreOptions: [
                { title: 'Create new task', onPress: () => console.log('Option 1 selected - Create new task') },
                { title: 'Show tasks list', onPress: () => console.log('Option 2 selected - Show tasks list') },
            ]
        },
        { 
            title: 'Close Drawer', 
            onPress: onClose 
        },
        { 
            title: 'More Options', 
            onPress: () => handlePressOption('More Options'),
            moreOptions: [
                { title: 'Option 1', onPress: () => console.log('Option 1 selected') },
                { title: 'Option 2', onPress: () => console.log('Option 2 selected') },
            ]
        },
    ];


    return (
        <View style={styles.drawerContent}>
            {options.map((option, index) => (
                <View key={index}>
                    <TouchableOpacity
                        onPress={option.onPress}
                        style={styles.listItem}
                    >
                        <View style={styles.optionRow}>
                            <Text style={styles.listItemTitle}>{option.title}</Text>
                            {option.moreOptions && (
                                <TouchableOpacity 
                                    onPress={(e) => handlePressIcon(option.title, e)} 
                                    style={styles.iconContainer}
                                >
                                    <Icon 
                                        name={isOptionExpanded(option.title) ? 'arrow-drop-up' : 'arrow-drop-down'} 
                                        type="material" 
                                        color="#000"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {isOptionExpanded(option.title) && option.moreOptions && (
                            option.moreOptions.map((subOption, subIndex) => (
                                <TouchableOpacity
                                    key={`sub-${subIndex}`}
                                    onPress={subOption.onPress}
                                    style={[styles.listItem, styles.subOption]}
                                >
                                    <Text style={styles.subOptionText}>{subOption.title}</Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#878f96',
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 8,
        flexDirection: 'column', // Ensure that sub-options layout correctly
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        // Additional style for touchable opacity around the icon
        padding: 10, // Makes it easier to press
    },
    subOption: {
        backgroundColor: '#f0f0f0',
        marginLeft: 20,
        marginRight: 20,
        borderTopWidth: 0,
    },
    subOptionText: {
        color: '#333',
    },
    listItemTitle: {
        color: '#333',
    },
});

export default DrawerContent;
