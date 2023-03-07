import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where, orderBy,
  getDoc, 
  updateDoc
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


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'Cafes');

//Add Item
const addBookForm = document.querySelector('#add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(addBookForm.title.value) {
    addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value
    })
    .then(() => {
      addBookForm.reset();
     
    })
  } else {
    alert('There is no book entered!!!')
  }
})


//Get Items
function getItems() {
  onSnapshot(colRef, (snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()})
    })
    generateItems(items);
  })
}

getItems()

//Show Items in page
function generateItems(items) {
  function deleteItem() {
    console.log('delete');
  }
  let booksList = document.querySelector('#books-list')
  let htmlItems = '';
  items.forEach((item) => {
    htmlItems += `<li data-id="${item.id}">
                    <div class="span-container">
                      <span>${item.title}</span>
                      <span>${item.author}</span>
                    </div>
                    <button class="delete" onClick="deleteItem()">Delete</button>
                  </li>`;
    booksList.innerHTML = htmlItems;
  })
}



