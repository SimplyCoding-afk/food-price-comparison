import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState("");
  const [dish, setDish] = useState("");
  const [image, setImage] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend only – backend + OCR later
    console.log("Admin Upload:", {
      restaurant,
      dish,
      image,
    });

    alert("Menu data captured (frontend only)");
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <label>Restaurant Name</label>
        <input
          type="text"
          placeholder="Domino's"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          required
        />

        <label>Dish Name</label>
        <input
          type="text"
          placeholder="Margherita Pizza"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          required
        />

        <label>Upload Menu Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Upload Menu</button>
      </form>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
