import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [foodName, setFoodName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [swiggyPrice, setSwiggyPrice] = useState("");
  const [zomatoPrice, setZomatoPrice] = useState("");
  const [foods, setFoods] = useState([]);

  // 🔐 Admin protection
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      window.location.href = "/admin-login";
    }
  }, []);

  // 📦 Fetch foods on load
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foods");
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods", err);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin-login";
  };

  // ➕ ADD FOOD
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFood = {
      foodName,
      imageUrl,
      swiggy: { basePrice: parseFloat(swiggyPrice) },
      zomato: { basePrice: parseFloat(zomatoPrice) },
    };

    try {
      const res = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });

      if (!res.ok) throw new Error("Failed to add food");

      alert("Food item added successfully!");
      fetchFoods();

      setFoodName("");
      setImageUrl("");
      setSwiggyPrice("");
      setZomatoPrice("");
    } catch (err) {
      console.error(err);
      alert("Error adding food");
    }
  };

  // 🗑️ DELETE FOOD
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food item?")) return;

    try {
      await fetch(`http://localhost:5000/api/foods/${id}`, {
        method: "DELETE",
      });
      fetchFoods();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  // ✏️ EDIT FOOD
  const handleEdit = async (food) => {
    const newSwiggy = prompt(
      "Enter new Swiggy price",
      food.swiggy.basePrice
    );
    const newZomato = prompt(
      "Enter new Zomato price",
      food.zomato.basePrice
    );

    if (!newSwiggy || !newZomato) return;

    try {
      await fetch(`http://localhost:5000/api/foods/${food._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: food.foodName,
          imageUrl: food.imageUrl,
          swiggy: { basePrice: Number(newSwiggy) },
          zomato: { basePrice: Number(newZomato) },
        }),
      });

      fetchFoods();
    } catch (err) {
      console.error("Edit error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Add / Edit / Delete food items
              </p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>

          {/* Add Food Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              required
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Food Name"
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                required
                value={swiggyPrice}
                onChange={(e) => setSwiggyPrice(e.target.value)}
                placeholder="Swiggy Price"
                className="px-4 py-2 border rounded"
              />

              <input
                type="number"
                required
                value={zomatoPrice}
                onChange={(e) => setZomatoPrice(e.target.value)}
                placeholder="Zomato Price"
                className="px-4 py-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded font-semibold"
            >
              Add Food Item
            </button>
          </form>

          {/* Existing Foods */}
          <hr className="my-8" />

          <h2 className="text-xl font-bold mb-4">Existing Food Items</h2>

          {foods.length === 0 && (
            <p className="text-gray-500">No food items found</p>
          )}

          {foods.map((food) => (
            <div
              key={food._id}
              className="flex justify-between items-center border p-4 rounded mb-3"
            >
              <div>
                <p className="font-semibold">{food.foodName}</p>
                <p className="text-sm text-gray-600">
                  Swiggy ₹{food.swiggy.basePrice} | Zomato ₹{food.zomato.basePrice}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(food)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
