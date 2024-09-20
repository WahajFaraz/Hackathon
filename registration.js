import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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

window.onload = function () {
  mainDiv.innerHTML = '';
  renderStudents();
};

const registrationButton = document.getElementById('registrationBtn');
registrationButton.addEventListener('click', registrationHandler);

async function registrationHandler(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cnic = document.getElementById('CNIC').value;
  const userType = document.querySelector('select[name="type"]').value;
  type;
  const userObj = {
    firstName,
    lastName,
    email,
    password,
    cnic,
    userType,
  };

  try {
    const docRef = await addDoc(collection(db, 'Students'), userObj);
    renderStudents();
  } catch (e) {
    alert('Error adding document: ' + e.message);
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert('user account successfully Created ');
      renderStudents();
    })
    .catch((error) => {
      alert('Error : ' + error.message);
    });
}

async function renderStudents() {}

try {
  mainDiv.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, 'Students'));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    let ele = `
      <div class="card">
        <div class="card-body">
        <span class=>
        <h5 class="card-title">First Name : ${data.firstName}</h5>
        <h5 class="card-title">Last Name :${data.lastName}</h5>
        <span/>
          <p class="card-text">Email :${data.email}</p>
          <p class="card-text">CNIC :${data.cnic}</p>
          <button><a href="./portal.html">Go To Portal<a/></button>
          <a href="./Marks.html" id="marksButton">Upload Marks</a>
          </div>
      </div><br><br><br><br><br>`;
    mainDiv.innerHTML += ele;
  });
} catch (error) {
  alert(error.message);
}
