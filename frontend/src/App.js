import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import User from "./pages/User";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
