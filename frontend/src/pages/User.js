import { useState } from "react";


function User() {
  const [restaurant, setRestaurant] = useState("");
  const [dish, setDish] = useState("");
  const [result, setResult] = useState(null);

  const handleCompare = () => {
    // Dummy data (later comes from backend)
    const swiggyPrice = 249;
    const zomatoPrice = 229;

    setResult({
      swiggy: swiggyPrice,
      zomato: zomatoPrice,
      cheaper:
        swiggyPrice < zomatoPrice ? "Swiggy" : "Zomato",
    });
  };

  return (
    <div className="container">
      <h1>Food Price Comparison</h1>
      <p>Compare prices across platforms</p>

      <label>Restaurant Name</label>
      <input
        type="text"
        placeholder="Domino's"
        value={restaurant}
        onChange={(e) => setRestaurant(e.target.value)}
      />

      <label>Dish Name</label>
      <input
        type="text"
        placeholder="Margherita Pizza"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <button onClick={handleCompare}>Compare Prices</button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>Price Comparison</h3>

          <p>🟠 Swiggy: ₹{result.swiggy}</p>
          <p>🔴 Zomato: ₹{result.zomato}</p>

          <h4 style={{ marginTop: "10px", color: "green" }}>
            Cheaper on: {result.cheaper}
          </h4>
        </div>
      )}
    </div>
  );
}

export default User;
