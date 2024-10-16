// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });

      // Simpan token di AsyncStorage
      const { access_token } = response.data;
      await AsyncStorage.setItem('access_token', access_token);

      console.log('Login successful:', response.data);
      setErrorMessage(''); // Reset error message jika login berhasil
      // Lakukan sesuatu setelah login berhasil, seperti navigasi ke halaman lain
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Atur pesan error jika login gagal
      setErrorMessage('Email atau Password salah');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default LoginScreen;
