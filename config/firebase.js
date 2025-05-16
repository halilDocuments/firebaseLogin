// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // 🔥 Burası önemli

// Firebase config bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyBvxdNgLqpjLZCw4JYoJ_a6hMwIhGNHLHM",
  authDomain: "sosyalapp-c7735.firebaseapp.com",
  projectId: "sosyalapp-c7735",
  storageBucket: "sosyalapp-c7735.firebasestorage.app",
  messagingSenderId: "899982021651",
  appId: "1:899982021651:web:874d4d01fd3c8010bf1be6",
  measurementId: "G-9VM1EKB5VL" // analytics kullanılmayacak
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 🔥 Firestore başlatılıyor

// Sadece Auth kullanılacak
const auth = getAuth(app);

export { auth , db};
//test