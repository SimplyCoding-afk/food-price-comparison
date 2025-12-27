import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import User from "./pages/User"; // This becomes your homepage
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 MAIN CHANGE: User page is now the homepage */}
        <Route path="/" element={<User />} />
        
        {/* 🔐 Admin routes remain the same */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;