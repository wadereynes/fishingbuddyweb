import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyBH-rhyR8tHJ0b6jsCqVkkZeYQKgKinndo',
  authDomain: 'fishingbuddy-web.firebaseapp.com',
  databaseURL: 'https://fishingbuddy-mobile.firebaseio.com/',
  projectId: 'fishingbuddy-web',
  storageBucket: 'fishingbuddy-web.appspot.com',
  messagingSenderId: '1004313328108',
  appId: '1:1004313328108:web:7f3ef10e51cab8fcb168c9',
}

var fireDb = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

// let timestamp = '1452488445471'
// let newDate = new Date(timestamp * 1000)
// let Hours = newDate.getHours()
// let Minutes = newDate.getMinutes()
// let Year = newDate.getDate()
// const HourComplete = Year + '-' + Hours + ':' + Minutes
// let formatedTime = HourComplete
var today = new Date()
var dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
var yyyy = today.getFullYear()
var hour = today.getHours()
var minutes = today.getMinutes()

today = mm + '/' + dd + '/' + yyyy + ' ' + hour + ':' + minutes
console.log(today)

const storage = fireDb.storage()
const database = fireDb.database()
// export default fireDb.database()
export { storage, database as default }
