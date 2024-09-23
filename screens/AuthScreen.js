import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signIn, signUp } from '../services/authService';

const AuthScreen = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        await signUp(email, password, name, age);
      } else {
        await signIn(email, password);
      }
      navigation.navigate('Home');
    } catch (error) {
      console.error("Authentication Error: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {isSignUp && (
        <>
          <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput label="Age" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
        </>
      )}
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button mode="contained" onPress={handleSubmit}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Text onPress={() => setIsSignUp(!isSignUp)} style={styles.link}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 10 },
  link: { marginTop: 10, textAlign: 'center', color: 'blue' }
});

export default AuthScreen;
