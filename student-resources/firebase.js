const firebaseConfig = {
  apiKey: "AIzaSyDIUW9AfOeYYcSXQ94u3hZqVkFYG8mB9Dw",
  authDomain: "reviewly-f204e.firebaseapp.com",
  projectId: "reviewly-f204e",
  storageBucket: "reviewly-f204e.appspot.com",
  messagingSenderId: "824981179741",
  appId: "1:824981179741:web:873350bbaa6ec829b3acb4",
  measurementId: "G-BD1R01XM49",
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = firebase.storage();
/*
Get's data from firebase
filename - the name of the file to get
userCode - the user's Id
func - a function that is ran inside of this function
*/
export function getGlobalData(fileName, func = () => {}) {
  const storageRef = storage.ref(`/Global Sets`);
  storageRef
    .child(fileName)
    .getDownloadURL()
    .then((url) => {
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          func(data);
          return data;
        });
    })
    .catch((error) => {
      // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
      func(undefined);
      return undefined;
    });
}
export function setGlobalData(fileName, data) {
  const storageRef = storage.ref(`/Global Sets`);
  storageRef
    .child(fileName)
    .putString(data)
    .then((snapshot) => {
      console.log("Uploaded a raw string!");
    });
}
export function getData(fileName, userCode, func = () => {}) {
  const storageRef = storage.ref(`/Users/${userCode}`);
  storageRef
    .child(fileName)
    .getDownloadURL()
    .then((url) => {
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          func(data);
          return data;
        });
    })
    .catch((error) => {
      // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
      func(undefined);
      return undefined;
    });
}
export function setData(fileName, userCode, data) {
  const storageRef = storage.ref(`/Users/${userCode}`);
  storageRef
    .child(fileName)
    .putString(data)
    .then((snapshot) => {
      console.log("Uploaded a raw string!");
    });
}

export var userInfo = undefined;
// test if the user is signed in
if (localStorage.getItem("USER_DATA") == null || undefined) {
  // user is not signned in
  console.log("NOT SIGNED IN");
} else {
  userInfo = JSON.parse(localStorage.getItem("USER_DATA"));
  console.log("SIGNED IN");
  console.log(userInfo);
}
