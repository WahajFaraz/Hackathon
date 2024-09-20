// Marks.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
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
const db = getFirestore(app);

const uploadButton = document.getElementById('uploadBtn');
uploadButton.addEventListener('click', marksHandler);

// Check for CNIC and Student ID uniqueness
async function checkUniqueness(cnic, studentID) {
  const querySnapshot = await getDocs(collection(db, 'Marks'));
  let cnicExists = false;
  let studentIDExists = false;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.cnic === cnic) cnicExists = true;
    if (data.studentID === studentID) studentIDExists = true;
  });

  return { cnicExists, studentIDExists };
}

async function marksHandler(e) {
  e.preventDefault();

  const courseName = document.getElementById('courseName').value;
  const studentID = document.getElementById('studentID').value.trim();
  const marks = document.getElementById('marks').value;
  const totalMarks = document.getElementById('totalMarks').value;
  const grade = document.getElementById('type').value;
  const cnic = document.getElementById('cnic').value.trim();

  const { cnicExists, studentIDExists } = await checkUniqueness(
    cnic,
    studentID
  );

  if (cnicExists || studentIDExists) {
    alert(
      cnicExists
        ? 'Error: CNIC already exists in Marks.'
        : 'Error: Student ID already exists in Marks.'
    );
    return;
  }

  try {
    await addDoc(collection(db, 'Marks'), {
      courseName,
      studentID,
      marks,
      totalMarks,
      grade,
      cnic,
    });
    alert('Marks uploaded successfully!');
    renderMarks();
  } catch (e) {
    alert('Error adding marks: ' + e.message);
  }
}

async function renderMarks() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Marks'));
    querySnapshot.forEach((doc) => {
      //    console.log(doc.id, ' => ', doc.data());
      let data = doc.data();
      let ele = `
      <div class="card">
        <div class="card-body">
        <span class=>
        <h5 class="card-title">Course : ${data.courseName}</h5>
        <h5 class="card-title">ID :${data.studentID}</h5>
        <span/>
          <p class="card-text"> Marks : ${data.marks}</p>
          <p class="card-text">Total Marks : ${data.totalMarks}</p>
          <p class="card-text">Grade : ${data.grade}</p>
          <p class="card-text">CNIC : ${data.cnic}</p>
          <button id="updateButton" onclick="updateButton('${doc.id}',this)">Edit</button>
           <a href="./Marks.html" id="marksButton" onclick="marksButton('${doc.id}',this)">Upload Marks</a>
          </div>
      </div><br><br><br><br><br>`;
      mainDiv.innerHTML += ele;
    });
  } catch (error) {
    alert(error.message);
  }
}

window.onload = renderMarks;
