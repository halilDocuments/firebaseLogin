import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ Giriş başarılı:", user);
      Alert.alert('✅ Giriş başarılı!');
      
      
      navigation.navigate('Home'); // Giriş başarılıysa ana ekrana yönlendir

    } catch (error) {
      console.log("❌ Hata:", error.code, error.message);
      
    }
  };

  return (
    <LinearGradient
      colors={['#1e1e2f', '#3e2f5b']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Giriş Yap</Text>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerRedirect}>Hesabın yok mu? Kayıt Ol</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    
    paddingHorizontal: 30, 
  },
  innerContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2f2f45',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerRedirect: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 14,
  },
});
