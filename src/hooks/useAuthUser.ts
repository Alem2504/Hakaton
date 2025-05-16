// src/hooks/useAuthUser.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";

export const useAuthUser = () => {
  const [ime, setIme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIme(userDoc.data().ime);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { ime, loading };
};
