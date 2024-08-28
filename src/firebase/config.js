import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

console.log("API Key:", process.env.REACT_APP_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_PROJECT_ID);
console.log("Storage Bucket:", process.env.REACT_APP_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.REACT_APP_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.REACT_APP_APP_ID);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebase_app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Failed to set session persistence:", error);
  });

export { auth };
export default firebase_app;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User ID:", user.uid);
  } else {
    console.error("No user is signed in");
  }
});