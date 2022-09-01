import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBG1qU8GRjXhi7aB7RX1H28VzKEwjEPoDM",
  authDomain: "tus-horas.firebaseapp.com",
  projectId: "tus-horas",
  storageBucket: "tus-horas.appspot.com",
  messagingSenderId: "20121706895",
  appId: "1:20121706895:web:7bad34f6f183c1d18b6bfa"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;