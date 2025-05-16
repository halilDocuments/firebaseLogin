import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../config/firebase';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const userId = auth.currentUser?.uid;

  // Firestore'dan kullanıcı adını çek
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (!userId) return;
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.name || 'Kullanıcı');
        }
      } catch (error) {
        console.log('Kullanıcı adı alınırken hata:', error.message);
      }
    };

    fetchUserName();
  }, [userId]);

  // Notları dinle
  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, 'notes'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(newNotes.reverse());
    });

    return unsubscribe;
  }, [userId]);

  const handleAddNote = async () => {
    if (note.trim() === '') return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'notes'), {
        text: note,
        userId: userId,
        createdAt: new Date().toISOString()
      });
      setNote('');
      setMessage('Not başarıyla kaydedildi!');
    } catch (error) {
      console.log("Hata:", error.message);
      setMessage('Not kaydedilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      console.log("Silme hatası:", error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#1e1e2f', '#3e2f5b']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Hoş Geldin, {userName || 'kullanıcı'}!</Text>
        <Text style={styles.subtitle}>Notlarını buraya kaydedebilirsin.</Text>

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Notunuzu yazın..."
          placeholderTextColor="#ccc"
          style={styles.input}
          multiline
        />
        <TouchableOpacity
          onPress={handleAddNote}
          style={loading ? [styles.button, styles.buttonDisabled] : styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Yükleniyor...' : 'Notu Kaydet'}</Text>
        </TouchableOpacity>

        {message && <Text style={styles.message}>{message}</Text>}

        {notes.length > 0 ? (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>{item.text}</Text>
                <TouchableOpacity onPress={() => handleDeleteNote(item.id)} style={styles.deleteButton}>
                  <Ionicons name="trash-bin" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noNotesText}>Henüz bir not eklemediniz.</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginTop: 50,
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#B2B2B2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
  },
  noteContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF5A5F',
    padding: 10,
    borderRadius: 25,
  },
  noNotesText: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});
