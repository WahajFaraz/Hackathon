import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import {
  getFirestore,
  collection,
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

document.getElementById('getResultBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  let cnic = document.getElementById('cnic').value.trim();
  const resultDiv = document.getElementById('resultDiv');
  resultDiv.innerHTML = ''; // Clear the result div

  try {
    const querySnapshot = await getDocs(collection(db, 'Marks'));
    let found = false;

    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();

      const studentID = String(data.studentID).trim();

      if (studentID === cnic) {
        found = true;
        resultDiv.innerHTML += `
          <div class="card">
            <div class="card-body">
              <h5>Course: ${data.courseName}</h5>
              <p>Marks: ${data.marks} / ${data.totalMarks}</p>
              <p>Grade: ${data.grade}</p>
            </div>
          </div>
          <br>`;
      }
    });

    if (!found) {
      resultDiv.innerHTML = `<p>No result found for CNIC: ${cnic}</p>`;
    }
  } catch (error) {
    alert('Error fetching result: ' + error.message);
  }
});
