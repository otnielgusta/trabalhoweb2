import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkw8_z0KimhaguQvFfU19D9wPBn3KOPeY",
    authDomain: "gobarber-11c93.firebaseapp.com",
    projectId: "gobarber-11c93",
    storageBucket: "gobarber-11c93.appspot.com",
    messagingSenderId: "250443053716",
    appId: "1:250443053716:web:3fc0d8c6ed18dc94689281",
    measurementId: "G-MJH10P0Y3L"
  };

  const app = initializeApp(firebaseConfig);

 export const storage = getStorage(app);
