import { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../api/axiosConfig";

const JobList = ({ jobs, onDeleteJob }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAppliedFrom, setFilterAppliedFrom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const jobsPerPage = 15;

  // Filter jobs based on search term and applied from
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAppliedFrom
      ? job.applied_from === filterAppliedFrom
      : true;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axiosInstance.delete(`/api/myjobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        onDeleteJob(jobId);
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const truncateNote = (note) => {
    const maxLength = 100;
    if (note.length > maxLength) {
      return note.substring(0, maxLength) + "...";
    }
    return note;
  };

  const handleReadMore = (note) => {
    setSelectedNote(note);
  };

  const handleClosePopup = () => {
    setSelectedNote(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by company or job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 flex-grow"
        />
        <select
          value={filterAppliedFrom}
          onChange={(e) => setFilterAppliedFrom(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">All Sources</option>
          <option value="Indeed">Indeed</option>
          <option value="Direct Email">Direct Email</option>
          <option value="Glassdoor">Glassdoor</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="ZipRecruiter">ZipRecruiter</option>
          <option value="Dice">Dice</option>
        </select>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{job.job_title}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Company:</span> {job.company}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Date Applied:</span>{" "}
              {formatDate(job.created_at)}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Applied From:</span>{" "}
              {job.applied_from}
            </p>
            <a
              href={job.application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mb-2"
            >
              Application Link
            </a>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Notes:</span>{" "}
              {truncateNote(job.note)}
              {job.note.length > 100 && (
                <button
                  onClick={() => handleReadMore(job.note)}
                  className="text-blue-500 hover:underline ml-2 cursor-pointer"
                >
                  Read More
                </button>
              )}
            </p>
            <button
              onClick={() => handleDelete(job.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({
          length: Math.ceil(filteredJobs.length / jobsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Note Popup */}
      {selectedNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Full Note</h2>
            <p className="text-gray-700 mb-4">{selectedNote}</p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

JobList.propTypes = {
  onDeleteJob: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default JobList;
