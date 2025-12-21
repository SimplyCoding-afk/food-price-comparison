import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Admin Login</h1>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // ✅ STEP 3.1 IS HERE
          const token = credentialResponse.credential;

          // Save login session
          localStorage.setItem("adminToken", token);

          // Go to dashboard
          navigate("/admin/dashboard");
        }}
        onError={() => {
          alert("Google Login Failed");
        }}
      />
    </div>
  );
}

export default Admin;
