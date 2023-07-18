import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/userContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (loading) {
          // Show a loading indicator while checking authentication status
          return;
        }

        if (!token || !user) {
          navigate("/login", { state: { from: location.pathname } }); // Redirect to the login page and pass the current location as the "from" state
        } else {
          // Perform additional authentication checks if required
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthStatus();
  }, [user, loading, navigate, location]);

  if (loading) {
    // Show a loading indicator while checking authentication status
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
