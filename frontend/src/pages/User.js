import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

function User() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/foods")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch foods");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Foods from backend:", data);
      setFoods(data);
      setFilteredFoods(data);
    })
    .catch((err) => {
      console.error("Error fetching foods:", err);
    });
}, []);


  // 🔍 SEARCH FILTER
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter((food) =>
        food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [searchQuery, foods]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🧭 Navbar */}
      <Navbar onSearch={setSearchQuery} />

      {/* 🎯 Hero Section (Optional) */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the Best Food Prices
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Compare prices between Swiggy and Zomato instantly
          </p>
        </div>
      </div>

      {/* 🍔 Food Comparison Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Food Comparison Cards
        </h2>

        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No food items found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;