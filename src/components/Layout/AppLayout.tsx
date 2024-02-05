import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Header, ListItem, Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

type DrawerContentProps = {
  onClose: () => void;
};

const DrawerContent: React.FC<DrawerContentProps> = ({ onClose }) => {
  const navigation = useNavigation(); // Use the hook to get navigation object

  return (
    <View style={styles.drawerContent}>
      <ListItem onPress={() => { navigation.navigate('Home' as never); onClose(); }} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Home</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={onClose} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Close Drawer</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {/* Add more items here */}
    </View>
  );
};


type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
    // More styles can be added here according to your preference
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={isAuthenticated ? {
          icon: 'menu',
          color: '#fff',
          onPress: toggleDrawer,
        } : undefined}
        centerComponent={{ text: 'My App', style: { color: '#fff' } }}
        rightComponent={isAuthenticated ? {
          icon: 'logout',
          color: '#fff',
          onPress: logout,
        } : undefined}
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}
      />
      <Drawer
        open={drawerOpen}
        content={<DrawerContent onClose={() => setDrawerOpen(false)} />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        type="overlay" // The drawer slides over the content
        styles={drawerStyles}
      >
        <View style={styles.content}>{children}</View>
      </Drawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Make sure this view fills the space not occupied by the header
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppLayout;
