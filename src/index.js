import { initializeApp} from 'firebase/app'
import { 
    getFirestore, collection, collectionGroup, onSnapshot, query, where, orderBy, limit, doc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDO-ueZMrZz82bzdXTs9HqDhlfG4BYVopY",
    authDomain: "contemporary-databases.firebaseapp.com",
    projectId: "contemporary-databases",
    storageBucket: "contemporary-databases.appspot.com",
    messagingSenderId: "655077228214",
    appId: "1:655077228214:web:dc43f82680f8e83de1b017",
    measurementId: "G-PXX1KGYXJ4"
  };

// Initialize firebase app
initializeApp(firebaseConfig)

// Initialize services
const db = getFirestore()

// Initialize collection reference
const restaurantRef = collection(db, 'restaurants')
const menuRef = collectionGroup(db, 'menu_items')

// Queries
// Query #1 - Find all Chinese restaurants
// const q = query(restaurantRef, where("cuisine", "==", "Italian"))

// Query #2 - Find all Italian restaurants in Clark Freeport Zone or Angeles City
// const q = query(restaurantRef, where("cuisine", "==", "Italian"), where("address.city", "in", ["Clark Freeport Zone", "Angeles City"]))

// Query #3 - Find the highest rated Italian restaurant (created composite index)
// const q = query(restaurantRef, where("cuisine", "==", "Italian"), orderBy('rating', 'desc'), limit(1))

// Query #4 - Find top 3 rated restaurants in Angeles City from highest to lowest (created composite index)
// const q = query(restaurantRef, where("address.city", "==", "Angeles City"), orderBy('rating', 'desc'), limit(3))

// Real time data collection
onSnapshot(q, (snapshot) => {
    let items = []
    snapshot.docs.forEach((doc) => { 
        items.push({ ...doc.data(), id:doc.id})
    })
    console.log(items)
})

// ---// // Query #5 - Find all restaurants serving Pepperoni Pizza sorted from cheapest to most expensive (created composite index with collection group query scope)
// const q = query(collectionGroup(db, 'menu_items'), where("name", "==", "Pepperoni Pizza"), orderBy("price", 'asc'))

// // Querying based on collection name and document id 
// async function getDocument (coll, id) {
//     const snap = await getDoc(doc(db, coll, id))
//     if (snap.exists())
//       return snap.data()
//     else
//       return Promise.reject(Error(`No such document: ${coll}.${id}`))
// }

// // Real-time data collection with subcollection
// onSnapshot(q, (snapshot) => {
//     let items = []
//     snapshot.docs.forEach((doc) => { 
//         let restaurantInfo = getDocument("restaurants", doc.ref.parent.parent.id).then((element) => {return element})
//         items.push({ ...doc.data(), id:doc.id, restaurant:restaurantInfo})
//     })
//     console.log(items)
// })


