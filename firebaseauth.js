import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRLHh4rhJYtsi6LYHGfcRflheoCU8W1a8",
    authDomain: "pero-s-website.firebaseapp.com",
    projectId: "pero-s-website",
    storageBucket: "pero-s-website.appspot.com",
    messagingSenderId: "461180613476",
    appId: "1:461180613476:web:ef616b339462f7f3c78071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to display messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Handle Sign Up
const signUpButton = document.getElementById('submitSignUp');
signUpButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };

            // Store user ID and first name in localStorage
            localStorage.setItem('loggedInUserId', user.uid);
            localStorage.setItem('userFirstName', firstName);

            showMessage('Account Created Successfully', 'signUpMessage');

            // Save user data to Firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    // Redirect to index.html after signup
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

// Handle Sign In
const signInButton = document.getElementById('submitSignIn');
signInButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Fetch user's first name from Firestore
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const firstName = docSnap.data().firstName;
                        localStorage.setItem('userFirstName', firstName);

                        // Store user ID in localStorage
                        localStorage.setItem('loggedInUserId', user.uid);

                        showMessage('Login successful', 'signInMessage');
                        // Redirect to index.html after login
                        window.location.href = 'index.html';
                    } else {
                        showMessage('User data not found', 'signInMessage');
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                    showMessage('Error retrieving user data', 'signInMessage');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});