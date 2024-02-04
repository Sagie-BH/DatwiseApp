import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

type AppAlertButton = {
  text: string;
  onPress: () => void;
};

type AppAlertProps = {
  title: string;
  message: string;
  buttons: AppAlertButton[];
  visible: boolean;
  onRequestClose: () => void;
};

const AppAlert: React.FC<AppAlertProps> = ({ title, message, buttons, visible, onRequestClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.alertView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={button.onPress}>
                <Text style={styles.buttonText}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  alertView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppAlert;
