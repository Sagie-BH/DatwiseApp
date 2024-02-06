import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../types/navigationTypes/types';


type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Header
        leftComponent={isAuthenticated ? {
          icon: 'menu',
          color: '#fff',
          onPress: () => navigation.openDrawer(),
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
      <View style={styles.content}>{children}</View>
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
});

export default AppLayout;