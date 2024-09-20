import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import {
  getFirestore,
  addDoc,
  collection,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyATyZqgr0kUfTmabCu3yr3ckX2d9yILHE0',
  authDomain: 'my-hackathon-9530c.firebaseapp.com',
  projectId: 'my-hackathon-9530c',
  storageBucket: 'my-hackathon-9530c.appspot.com',
  messagingSenderId: '618652551082',
  appId: '1:618652551082:web:523dc66ba9252352c04dd3',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logIn = document.getElementById('logIn');
logIn.addEventListener('click', loginHandler);

async function loginHandler(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userObj1 = {
    email,
    password,
  };

  try {
    const docRef = await addDoc(collection(db, 'users'), userObj1);
  } catch (e) {
    alert('Error : ' + e.message);
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.assign('./studentRegistration.html');
    })
    .catch((error) => {
      alert('Error : ' + error.message);
    });
}
