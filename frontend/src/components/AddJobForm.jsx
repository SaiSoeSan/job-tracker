import { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../api/axiosConfig";

const AddJobForm = ({ onAddJob }) => {
  const [formData, setFormData] = useState({
    company: "",
    job_title: "",
    applied_from: "",
    application_link: "",
    note: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/myjobs", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onAddJob(response.data);
      setFormData({
        company: "",
        job_title: "",
        applied_from: "",
        application_link: "",
        note: "",
      });
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error creating job");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Applied From</label>
          <select
            name="applied_from"
            value={formData.applied_from}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          >
            <option value="">Select Source</option>
            <option value="Indeed">Indeed</option>
            <option value="Direct_Email">Direct Email</option>
            <option value="Glassdoor">Glassdoor</option>
            <option value="LinkedIn">LinkedIn</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Application Link</label>
          <input
            type="url"
            name="application_link"
            value={formData.application_link}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Job
        </button>
      </form>

      {/* Error Popup */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={handleCloseError}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

AddJobForm.propTypes = {
  onAddJob: PropTypes.func.isRequired,
};

export default AddJobForm;
