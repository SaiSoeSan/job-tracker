import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddJobForm from "./components/AddJobForm";
import JobList from "./components/JobList";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import axiosInstance from "./api/axiosConfig";
import "./App.css";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get("/api/myjobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleDeleteJob = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <div className="min-h-screen py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <AddJobForm onAddJob={handleAddJob} />
                    <JobList jobs={jobs} onDeleteJob={handleDeleteJob} />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
