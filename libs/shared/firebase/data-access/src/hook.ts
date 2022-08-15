// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

let _globalFirebaseApp: FirebaseApp | null = null;
let _globalFirebaseAuth: Auth | null = null;
let _globalFirebaseFirestore: Firestore | null = null;

const _firebaseInitialized = false;

export function initializeFirebaseApp(config: FirebaseConfig) {
  if (!_firebaseInitialized) {
    // Initialize Firebase
    const app = initializeApp(config);
    const analytics = getAnalytics(app);

    _globalFirebaseApp = app;
    _globalFirebaseAuth = getAuth();
    _globalFirebaseFirestore = getFirestore(_globalFirebaseApp);
  }
  return {
    app: _globalFirebaseApp,
    auth: _globalFirebaseAuth,
    firestore: _globalFirebaseFirestore,
  };
}

export function useFirebase() {
  if (!_globalFirebaseApp || !_globalFirebaseAuth) {
    console.error(
      'Tried to use firebase before initializing it. Please call `initializeFirebaseApp` first!'
    );
  }
  return {
    app: _globalFirebaseApp,
    auth: _globalFirebaseAuth,
    db: _globalFirebaseFirestore,
  };
}
