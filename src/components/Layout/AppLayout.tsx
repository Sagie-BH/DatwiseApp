import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext/AuthContext';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <View style={styles.container}>
      {isAuthenticated && (
        <View style={styles.header}>
          <Button title="Logout" onPress={logout} />
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    width: '100%',
  },
  content: {
    flex: 1,
  },
});

export default AppLayout;
