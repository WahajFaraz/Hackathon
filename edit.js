import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
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

const editDiv = document.getElementById('editDiv');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const cnicInput = document.getElementById('cnic');

document
  .getElementById('getProfileBtn')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    const cnic = cnicInput.value;
    editDiv.style.display = 'none';

    try {
      const querySnapshot = await getDocs(collection(db, 'Students'));
      let found = false;
      let docId = ''; // Variable to store the document ID

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.cnic === cnic) {
          found = true;
          firstNameInput.value = data.firstName;
          lastNameInput.value = data.lastName;
          docId = docSnapshot.id; // Store the document ID
          editDiv.style.display = 'block';
        }
      });

      if (!found) {
        alert('No profile found for this CNIC.');
      } else {
        document
          .getElementById('updateProfileBtn')
          .addEventListener('click', async (e) => {
            e.preventDefault();
            try {
              const studentRef = doc(db, 'Students', docId); // Use the stored document ID
              await updateDoc(studentRef, {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                cnic: cnicInput.value,
              });
              alert('Profile updated successfully!');
            } catch (error) {
              alert('Error updating profile: ' + error.message);
            }
          });
      }
    } catch (error) {
      alert('Error fetching profile: ' + error.message);
    }
  });
