// Firebase configuration
const firebaseConfig = const firebaseConfig = {
    apiKey: "AIzaSyBg1Md-TmUtyjMx0FUlhaV7Vzyah5tgHNs",
    authDomain: "simplechatx-e4ad7.firebaseapp.com",
    databaseURL: "https://simplechatx-e4ad7-default-rtdb.firebaseio.com",
    projectId: "simplechatx-e4ad7",
    storageBucket: "simplechatx-e4ad7.appspot.com",
    messagingSenderId: "496684446165",
    appId: "1:496684446165:web:f383af548974d4be178d5c"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Function to send a message
sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    if (message) {
        db.collection("messages").add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = '';
    }
});

// Function to load messages
db.collection("messages").orderBy("timestamp")
    .onSnapshot(snapshot => {
        messagesDiv.innerHTML = ''; // Clear previous messages
        snapshot.forEach(doc => {
            const message = document.createElement("div");
            message.classList.add("message");
            message.textContent = doc.data().text;
            messagesDiv.appendChild(message);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
    });
