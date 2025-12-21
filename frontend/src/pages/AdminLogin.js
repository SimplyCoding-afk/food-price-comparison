import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ADMIN_EMAILS = [
  "anishdutta977@gmail.com"
  
];

function AdminLogin() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;

    // TEMP decode (frontend demo only)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const email = payload.email;

    if (ADMIN_EMAILS.includes(email)) {
      localStorage.setItem("role", "admin");
      localStorage.setItem("email", email);
      navigate("/admin");
    } else {
      alert("You are not authorized as admin");
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      <p>Login with Google to continue</p>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Login Failed")}
      />
    </div>
  );
}

export default AdminLogin;
