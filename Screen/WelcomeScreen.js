import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient
      colors={['#1e1e2f', '#3e2f5b']} // Morumsu koyu bir zemin
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <Text style={styles.subtitle}>Uygulamaya giriş yap veya kayıt ol</Text>

      <TouchableOpacity onPress={handleLogin} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>veya devam et</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="google" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="apple1" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#ff6b6b',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: '#ff6b6b',
    borderWidth: 1.5,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  secondaryButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  iconButton: {
    backgroundColor: '#4d3c77',
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});
