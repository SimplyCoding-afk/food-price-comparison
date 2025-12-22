import { useEffect } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = "anishdutta977@gmail.com"; // 🔴 CHANGE THIS

function AdminLogin() {
  

  // 🔥 Always clear old session when page loads
  useEffect(() => {
    signOut(auth);
    localStorage.removeItem("isAdmin");
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      // 🔥 FORCE GOOGLE POPUP EVERY TIME
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      // 🔒 LOCK ADMIN ACCESS TO ONE EMAIL
      if (email !== ADMIN_EMAIL) {
        alert("Access denied: Not an admin");
        await signOut(auth);
        return;
      }

      localStorage.setItem("isAdmin", "true");

      // 🔥 OPEN DASHBOARD IN NEW TAB
      window.open("/admin", "_blank");

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
