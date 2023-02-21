import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where, orderBy, serverTimestamp,
  getDoc
} from 'firebase/firestore';

const booksList = document.querySelector('#books-list');

const firebaseConfig = {
    apiKey: "AIzaSyC0of_8VzgBTfFKEXdJOHG6Q-mgkrr7si4",
    authDomain: "firestore-1d468.firebaseapp.com",
    projectId: "firestore-1d468",
    storageBucket: "firestore-1d468.appspot.com",
    messagingSenderId: "617977506380",
    appId: "1:617977506380:web:3f58a463830ca2bd3222e9",
    measurementId: "G-MXR81VZZXT"
  };

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'Cafes');

const q = query(colRef, orderBy('createdAt'))

//Get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let cafes = [];
//     snapshot.docs.forEach((doc) => {
//       cafes.push({...doc.data( ), id: doc.id})
//     })

//     console.log(cafes)
//   })
//   .catch(err => {
//     console.log(err.massage);
//   })


//Get real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
       snapshot.docs.forEach((doc) => {
         books.push({...doc.data( ), id: doc.id})
         renderBooksList(doc);
       })
  
       console.log(books)
})


//Add Cafe
const addBookForm = document.querySelector('#add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => addBookForm.reset())
})


//Delete Cafe 
// const deleteCafe = document.querySelector('#deleteCafe');
// deleteCafe.addEventListener('click', (e) => {
//   e.preventDefault();

//   const docRef = doc(db, "Cafes", blank.id.value);
//   deleteDoc(docRef)
//   .then(() => {
//     jnjel listi mejic et field@
//   })
// })


function renderBooksList(doc) {
  let li = document.createElement('li');
  let title = document.createElement('span');
  let author = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  title.textContent = doc.data().title;
  author.textContent = doc.data().author;

  li.appendChild(title);
  li.appendChild(author);

  booksList.appendChild(li)

}

