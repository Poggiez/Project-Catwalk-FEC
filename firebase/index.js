import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBocgHVX-9CU6E3CG5_w2DAKs0UmxSb1_s',
  authDomain: 'frontend--capstone.firebaseapp.com',
  projectId: 'frontend--capstone',
  storageBucket: 'frontend--capstone.appspot.com',
  messagingSenderId: '363443525448',
  appId: '1:363443525448:web:7e33f4f2034b8f1319c57d',
  measurementId: 'G-06CQSHMVCB',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
