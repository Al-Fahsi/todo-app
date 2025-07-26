import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔧 Ersetze hier mit deinen echten Firebase-Daten
const firebaseConfig = {
  apiKey: "AIzaSyBcGJGAsa9mfYhpLYq48P9gkFxJ5sv-2h8",
  authDomain: "todo-app-4dbf4.firebaseapp.com",
  projectId: "todo-app-4dbf4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login
document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    document.getElementById("login-error").textContent = "Login fehlgeschlagen: " + err.message;
  }
});

// Bei Login UI anpassen
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("todo-box").classList.remove("hidden");
  }
});

// Neue Aufgabe speichern
document.getElementById("todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const duration = parseInt(document.getElementById("duration").value);
  const status = document.getElementById("status").value;

  if (user) {
    await addDoc(collection(db, "todos"), {
      title,
      category,
      duration,
      status,
      userId: user.uid
    });
    alert("Aufgabe gespeichert!");
    e.target.reset();
  }
});

// Aufgaben anzeigen
document.getElementById("show-tasks").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(collection(db, "todos"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  const table = document.getElementById("task-table");
  table.innerHTML = `<tr><th>Titel</th><th>Kategorie</th><th>Dauer</th><th>Status</th></tr>`;

  snapshot.forEach((doc) => {
    const d = doc.data();
    table.innerHTML += `
      <tr>
        <td>${d.title}</td>
        <td>${d.category}</td>
        <td>${d.duration} Min</td>
        <td>${d.status}</td>
      </tr>
    `;
  });

  document.getElementById("task-list").classList.remove("hidden");
});
