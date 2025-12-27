function FoodCard({ food }) {
  const { foodName, imageUrl, swiggy, zomato } = food;

  // Determine which platform is cheaper
  const swiggyPrice = swiggy?.basePrice || 0;
  const zomatoPrice = zomato?.basePrice || 0;
  const isSwiggyCheaper = swiggyPrice < zomatoPrice;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl 
                    transition-shadow duration-300">
      
      {/* 🖼️ Food Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={foodName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 📝 Food Name */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          {foodName}
        </h3>

        {/* 💰 Price Comparison Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Swiggy Card */}
          <div
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              isSwiggyCheaper
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="text-sm text-gray-600 mb-1">Swiggy</div>
            <div className="text-2xl font-bold text-gray-800">
              ₹{swiggyPrice}
            </div>
            {isSwiggyCheaper && (
              <button className="mt-2 w-full bg-orange-500 text-white text-xs 
                               py-1.5 rounded-md hover:bg-orange-600 transition-colors">
                Order Lowest Price
              </button>
            )}
          </div>

          {/* Zomato Card */}
          <div
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              !isSwiggyCheaper
                ? "border-red-500 bg-red-50 shadow-md"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="text-sm text-gray-600 mb-1">Zomato</div>
            <div className="text-2xl font-bold text-gray-800">
              ₹{zomatoPrice}
            </div>
            {!isSwiggyCheaper && (
              <button className="mt-2 w-full bg-red-500 text-white text-xs 
                               py-1.5 rounded-md hover:bg-red-600 transition-colors">
                Order Lowest Price
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;