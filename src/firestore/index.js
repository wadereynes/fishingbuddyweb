import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  // apiKey: 'AIzaSyBH-rhyR8tHJ0b6jsCqVkkZeYQKgKinndo',
  // authDomain: 'fishingbuddy-web.firebaseapp.com',
  // projectId: 'fishingbuddy-web',
  // storageBucket: 'fishingbuddy-web.appspot.com',
  // messagingSenderId: '1004313328108',
  // appId: '1:1004313328108:web:7f3ef10e51cab8fcb168c9',

  apiKey: 'AIzaSyBH-rhyR8tHJ0b6jsCqVkkZeYQKgKinndo',
  authDomain: 'fishingbuddy-web.firebaseapp.com',
  databaseURL: 'https://fishingbuddy-mobile.firebaseio.com/',
  projectId: 'fishingbuddy-web',
  storageBucket: 'fishingbuddy-web.appspot.com',
  messagingSenderId: '1004313328108',
  appId: '1:1004313328108:web:7f3ef10e51cab8fcb168c9',
}

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
const dbfire = firebaseApp.firestore()
const db = firebaseApp.database()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  await auth.signInWithPopup(provider)
  window.location.reload()
}

export function checkAuth(cb) {
  return auth.onAuthStateChanged(cb)
}

export async function logOut() {
  await auth.signOut()
  window.location.reload()
}

export async function getCollection(id) {
  const snapshot = await db.collection(id).get()
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  console.log(data)
}

export async function getUserLists(userId) {
  // const snapshot = await db
  const snapshot = await dbfire
    .collection('lists')
    // .where('author', '==', userId)
    // .where('userIds', 'array-contains', userId)
    .get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function getHobbyLists(userId) {
  // const snapshot = await db
  const snapshot = await db.ref('hobbylists')
  // .where('author', '==', userId)
  // .where('userIds', 'array-contains', userId)
  // .get()
  snapshot.on('value', (snapshot) => {
    const lists = snapshot.val()
    const todoList = []
    for (let id in lists) {
      todoList.push(lists[id])
    }
    console.log(todoList)
  })
  // Object.keys(contactObjects).map()
  // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

function uploadCoverImage(file) {
  const uploadTask = storage
    .ref(`images/${file.name}-${file.lastModified}`)
    .put(file)
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => console.log('image uploading', snapshot),
      reject,
      () => {
        storage
          .ref('images')
          .child(`${file.name}-${file.lastModified}`)
          .getDownloadURL()
          .then(resolve)
      }
    )
  })
}

export async function createList(list, user) {
  const { name, description, image } = list
  await db.collection('lists').add({
    name,
    description,
    image: image ? await uploadCoverImage(image) : null,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    author: user.uid,
    userIds: [user.uid],
    users: [
      {
        id: user.uid,
        name: user.displayName,
      },
    ],
  })
}

export async function createHobbyList(hobbylist, user) {
  const { name, description, image } = hobbylist
  // await db.collection('hobbylists').add({
  //   name,
  //   description,
  //   created: firebase.firestore.FieldValue.serverTimestamp(),
  //   author: user.uid,
  //   userIds: [user.uid],
  //   users: [
  //     {
  //       id: user.uid,
  //       name: user.displayName,
  //     },
  //   ],
  // })

  await db.ref('hobbylists').push({
    name,
    description,
    image: image ? await uploadCoverImage(image) : null,
    // created: firebase.database.FieldValue.serverTimestamp(),
    author: user.uid,
    userIds: [user.uid],
    users: [
      {
        id: user.uid,
        name: user.displayName,
      },
    ],
  })
}

export async function getList(listId) {
  try {
    // const list = await db.collection('lists').doc(listId).get()
    const list = await dbfire.collection('lists').doc(listId).get()
    if (!list.exists) throw Error(`List doesn't exist`)
    return list.data()
  } catch (error) {
    console.error(error)
    throw Error(error)
  }
}

export async function createListItem({ user, listId, item }) {
  try {
    const response = await fetch(
      `https://screenshotapi.net/api/v1/screenshot?url=${item.link}&token=ICNJ6YO75YAMQ53P29FU6UJSS6MRWZK8`
    )
    const { screenshot } = await response.json()
    db.collection('lists')
      .doc(listId)
      .collection('items')
      .add({
        name: item.name,
        link: item.link,
        image: screenshot,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        author: {
          id: user.uid,
          username: user.displayName,
        },
      })
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export function subscribeToListItems(listId, cb) {
  return db
    .collection('lists')
    .doc(listId)
    .collection('items')
    .orderBy('created', 'desc')
    .onSnapshot(cb)
}

export function deleteListItem(listId, itemId) {
  return db
    .collection('lists')
    .doc(listId)
    .collection('items')
    .doc(itemId)
    .delete()
}

export function deleteList(listId) {
  return db.collection('lists').doc(listId).delete()
}

export async function addUserToList(user, listId) {
  await db
    .collection('lists')
    .doc(listId)
    .update({
      userIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
      users: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        name: user.displayName,
      }),
    })
  window.location.reload()
}
