import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Role Selection
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Select how you want to use the app
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Card */}
          <div
            onClick={() => navigate("/user")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-8 text-center
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-5xl mb-4">🍔</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              User
            </h2>
            <p className="text-gray-500">
              Compare food prices across restaurants
            </p>
          </div>

          {/* Admin Card */}
          <div
            onClick={() => navigate("/admin-login")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-8 text-center
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-5xl mb-4">🛠️</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Admin
            </h2>
            <p className="text-gray-500">
              Upload menu items and manage prices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
