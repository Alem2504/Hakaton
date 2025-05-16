import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";

const AuthChecker: React.FC = () => {
  const [ime, setIme] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIme(userData.ime); // Postavi ime iz Firestore-a
          console.log("✅ Prijavljeni korisnik:", userData.ime);
        } else {
          console.log("📂 Nema podataka u Firestore-u.");
        }
      } else {
        console.log("❌ Niko nije prijavljen.");
        setIme(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Provjera autentikacije u konzoli 🔍</h2>
      {ime && <p>👤 Dobrodošao, {ime}!</p>}
    </div>
  );
};

export default AuthChecker;
