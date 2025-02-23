import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../api/axiosConfig";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name");
    if (isAuthenticated) {
      setUserName(storedUserName);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Job Tracker
        </Link>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300">Welcome, {userName}</span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;
