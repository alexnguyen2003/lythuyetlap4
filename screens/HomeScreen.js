import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { logOut } from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await logOut();
    navigation.replace('Auth');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
      <Button mode="contained" onPress={() => navigation.navigate('UserManagement')}>
        Manage Users
      </Button>
      <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton}>
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 18, marginBottom: 20 },
  logoutButton: { marginTop: 20 }
});

export default HomeScreen;
