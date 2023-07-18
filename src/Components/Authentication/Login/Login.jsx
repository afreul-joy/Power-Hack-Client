import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth(); // setUser is a function that will update the user state

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      const { status, JWT_TOKEN } = response.data;
      if (status === "valid user") {
        localStorage.setItem("token", JWT_TOKEN);

        // Decode the JWT token to extract user information
        const decodedToken = jwtDecode(JWT_TOKEN);
        const user = {
          email: decodedToken.email,
          // Add other user information you want to extract from the token
        };

        // Redirect the user to the requested page or a default page if no specific page is requested
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }

        setUser(user);
        alert("Login successful");
      } else {
        alert("Please check your username and password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-md my-3 mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={loginUser}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Login
          </button>
          <p>
            <span className="text-yellow-700"> New User? </span>
            <Link
              to="/register"
              className="text-gray-600 hover:text-indigo-600"
            >
              Register now!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
