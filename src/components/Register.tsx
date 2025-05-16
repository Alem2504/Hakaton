import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth,db } from "../firebase/firebase.config.ts";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [Ime, setIme] = useState<string>('');
  const [Prezime, setPrezime] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upis u Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      ime: Ime,
      prezime: Prezime,
      createdAt: new Date(),
    });

    console.log("Korisnik registrovan i upisan u Firestore!");
    navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.error("Greška prilikom registracije:");
    alert("Registracija nije uspjela: ");
  }
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ime" className="block text-sm font-medium text-gray-700">
                Ime
              </label>
              <div className="mt-1">
                <input
                    id="ime"
                    name="ime"
                    type="text"
                    required
                    value={Ime}
                    onChange={(e) => setIme(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="prezime" className="block text-sm font-medium text-gray-700">
                Prezime
              </label>
              <div className="mt-1">
                <input
                    id="prezime"
                    name="prezime"
                    type="text"
                    required
                    value={Prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Terms of Service</a> and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </label>
            </div>

            <div>
              <Button type="submit" variant="primary" fullWidth>
                Create account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
