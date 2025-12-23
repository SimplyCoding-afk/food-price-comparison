import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";

function AdminDashboard() {
  // 🔒 PROTECT DASHBOARD
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      window.location.href = "/admin-login";
    }
  }, []);

  const logout = async () => {
    await signOut(auth); // 🔥 VERY IMPORTANT
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin-login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">You are logged in as Admin</p>

        {/* FUTURE: Zomato / Swiggy / Upload menu here */}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
