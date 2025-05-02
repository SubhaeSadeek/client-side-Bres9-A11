// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2vDA-pajLKD7KwpGn4ZgnNiYJjA4LSP8",
  authDomain: "hikmah-blog.firebaseapp.com",
  projectId: "hikmah-blog",
  storageBucket: "hikmah-blog.firebasestorage.app",
  messagingSenderId: "933530187466",
  appId: "1:933530187466:web:0b7e6f86f6e5d55052e633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)