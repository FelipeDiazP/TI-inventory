// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCNTBPfYQS_YaeO7VOEIWpEYIekVTPTz50',
  authDomain: 'controlapp-21e24.firebaseapp.com',
  projectId: 'controlapp-21e24',
  storageBucket: 'controlapp-21e24.firebasestorage.app',
  messagingSenderId: '369527561546',
  appId: '1:369527561546:web:3dcc0c289b7127daeeb5b3',
  measurementId: 'G-ZZZY3VC7WX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
