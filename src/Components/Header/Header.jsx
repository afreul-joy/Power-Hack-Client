import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const handleLogout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem("token"); // Remove the token from localStorage
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/">
            <div className="flex items-center">
              <img
                className="h-8 w-8 mr-2"
                src="https://cdn.dribbble.com/userupload/3158903/file/original-3f5abe8b99ff4ba4626ddf6660115182.jpg?compress=1&resize=1024x768"
                alt="Logo"
              />
              <span className="text-lg font-semibold">Power Pack</span>
            </div>
          </Link>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Paid total:</span>
            <span className="text-green-500 font-bold">$ 0</span>
          </div>
          <div className="flex items-center">
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>
            <Link
              to="/billing"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Billing
            </Link>

            {user ? (
              <>
                <p> {user.email} </p>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-700 bg-red-400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:bg-red-700 bg-red-400 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
