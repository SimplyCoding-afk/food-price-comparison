import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <h1>Role Selection</h1>
      <p>Select how you want to use the app</p>

      <div className="role-cards">
        <div className="role-card" onClick={() => navigate("/user")}>
          <h2>User</h2>
          <p>Compare food prices</p>
        </div>

        <div className="role-card" onClick={() => navigate("/admin-login")}
>
          <h2>Admin</h2>
          <p>Upload menu & prices</p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
