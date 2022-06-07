import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDG358-940y83GqEJ5ETVV_Q8Esf3jPa24",
  authDomain: "linkedin-clone-cd88f.firebaseapp.com",
  projectId: "linkedin-clone-cd88f",
  storageBucket: "linkedin-clone-cd88f.appspot.com",
  messagingSenderId: "140804145525",
  appId: "1:140804145525::5cded9f8e4cd507513133c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

export { auth, provider, storage };
export default db;
