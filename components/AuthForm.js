import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';

const AuthForm = ({ onSubmit, buttonLabel, isSignUp, setIsSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <div>
      {isSignUp && (
        <>
          <TextInput label="Name" value={name} onChangeText={setName} />
          <TextInput label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
        </>
      )}
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={() => onSubmit(email, password, name, age)}>
        {buttonLabel}
      </Button>
      <Text onPress={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </Text>
    </div>
  );
};

export default AuthForm;
