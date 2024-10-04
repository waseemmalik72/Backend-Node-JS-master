import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA0bI5IJlKbx1AtUKOEDxoiOZV8QBDg37k",
  authDomain: "social-media-project-131f3.firebaseapp.com",
  projectId: "social-media-project-131f3",
  storageBucket: "social-media-project-131f3.appspot.com",
  messagingSenderId: "787639678529",
  appId: "1:787639678529:web:1d12bc71f0e8df2eeff8c0",
  measurementId: "G-WXT43PC6LM",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
