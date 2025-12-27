import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 🍔 Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍔</span>
            <span className="text-xl font-bold text-gray-800">
              FoodCompare
            </span>
          </div>

          {/* 🔍 Search Bar (Center) */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for restaurant or dish..."
                onChange={(e) => onSearch && onSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-orange-500 
                           focus:border-transparent"
              />
              {/* 🔍 Search Icon - Using Emoji instead of lucide-react */}
              <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
                🔍
              </span>
            </div>
          </div>

          {/* 🛠️ Admin Button */}
          <button
            onClick={() => navigate("/admin-login")}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r 
                       from-orange-500 to-red-500 rounded-lg hover:from-orange-600 
                       hover:to-red-600 transition-all duration-200 shadow-md 
                       hover:shadow-lg"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;