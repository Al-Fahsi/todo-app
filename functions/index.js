const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.validateTask = functions.firestore.document("todos/{todoId}")
  .onCreate((snap, context) => {
    const data = snap.data();

    if (!data.title || data.title.length < 3 || data.duration <= 0) {
      console.log("Ungültige Aufgabe erkannt. Lösche Eintrag.");
      return snap.ref.delete();
    }

    return null;
  });
