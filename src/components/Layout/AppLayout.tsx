import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Drawer from 'react-native-drawer';
import { useAuth } from '../../context/AuthContext/AuthContext';
import DrawerContent from './DrawerContent';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const closeDrawerAndResetOptions = () => {
    setDrawerOpen(false);
    setExpandedOption(null); // Reset expanded options when closing the drawer
  };

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
        content={<DrawerContent onClose={() => setDrawerOpen(false)} expandedOption={expandedOption} setExpandedOption={setExpandedOption} drawerOpen={drawerOpen}/>}
        tapToClose={true}
        openDrawerOffset={0.1} // 20% gap on the right side of drawer
        onClose={closeDrawerAndResetOptions}
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
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#878f96',
  },
});

export default AppLayout;
