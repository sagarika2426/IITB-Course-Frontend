import { useState, useEffect } from "react";
import axios from "axios";
import DetailModal from "./DetailModal";
import { MdDelete, MdSearch } from "react-icons/md";
import RefreshData from "./RefreshData";

const ViewInstances = () => {
  // State hooks for managing instances, selected instance, modal visibility and filters
  const [instances, setInstances] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [filteredInstances, setFilteredInstances] = useState([]);

  // Function to fetch instances from the API
  const fetchInstances = () => {
    axios
      .get("http://127.0.0.1:8000/api/instances/")
      .then((response) => {
        setInstances(response.data);
        setFilteredInstances(response.data); // Set both the instances and filtered instances
      })
      .catch((error) => console.error("Error fetching instances:", error));
  };

  useEffect(() => {
    fetchInstances(); // Fetch data when the component mounts
  }, []);

  // Function to view details of a specific instance
  const handleView = (instanceId, year, semester, courseId) => {
    axios
      .get(
        `http://127.0.0.1:8000/api/instances/${year}/${semester}/${courseId}/`
      )
      .then((response) => {
        setSelectedInstance(response.data);
        setIsModalOpen(true); // Open the modal with instance details
      })
      .catch((error) =>
        console.error("Error fetching instance details:", error)
      );
  };

  // Function to close the detail modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstance(null);
  };

  // Function to delete a specific instance
  const handleDelete = (instanceId, year, semester, courseId) => {
    if (window.confirm("Are you sure you want to delete this instance?")) {
      axios
        .delete(
          `http://127.0.0.1:8000/api/instances/${year}/${semester}/${courseId}/`
        )
        .then(() => {
          // Remove the deleted instance from the list
          const updatedInstances = instances.filter(
            (instance) => instance.id !== instanceId
          );
          setInstances(updatedInstances);
          setFilteredInstances(updatedInstances); // Update filtered instances as well
        })
        .catch((error) => console.error("Error deleting instance:", error));
    }
  };

  // Function to handle search based on year and semester filters
  const handleSearch = () => {
    const year = yearFilter.trim();
    const semester = semesterFilter.trim();

    if (year && semester) {
      if (!/^\d{4}$/.test(year)) {
        alert("Year must be a 4-digit number.");
        return;
      }

      axios
        .get(`http://127.0.0.1:8000/api/instances/${year}/${semester}`)
        .then((response) => {
          setFilteredInstances(response.data);
        })
        .catch((error) =>
          console.error("Error fetching filtered instances:", error)
        );
    } else {
      setFilteredInstances(instances); // Reset to show all instances if no filter is applied
    }
  };

  // Function to reset filters and show all instances
  const handleViewAll = () => {
    setYearFilter("");
    setSemesterFilter("");
    setFilteredInstances(instances); // Show all instances
  };

  return (
    <div className="lg:px-14 bg-white rounded-md shadow-md text-left mb-6 py-6 px-4">
      {/* Filter controls */}
      <div className="flex flex-col lg:flex-row mb-2 items-center justify-center gap-2 lg:gap-6">
      <div className="mb-0 flex gap-3 items-center justify-center p-2">
        <input
          type="number"
          placeholder="Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border py-2 px-4 rounded-md border-gray-600"
          min="1000"
          max="9999"
          step="1"
        />
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="border py-2 rounded-md border-gray-600"
        >
          <option value="">Select Semester</option>
          {[...Array(8).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-6 rounded-md"
        >
          Search
        </button>
      
      </div>
      <button
          onClick={handleViewAll}
          className="w-1/2 lg:w-1/6 border border-blue-600 text-blue-600 py-2 px-6 rounded-md bg-white font-bold hover:border-blue-900 hover:text-blue-900 hover:bg-blue-100"
          style={{ transition: "all 0.5s ease-in-out" }}
        >
          View All
        </button>
      </div>
      
      {/* Refresh button */}
      <div className="flex justify-end mb-4">
        <button onClick={fetchInstances} className="flex items-center">
          <RefreshData />
        </button>
      </div>

      {/* Display instances or message if no instances are found */}
      {filteredInstances.length === 0 ? (
        <div className="text-center my-2 text-gray-600">
          No Course for this Year and Semester found! Please try with different Year and Semester or add a new instance.
        </div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border-b w-1/2">Course Title</th>
              <th className="py-2 px-4 border-b">Year-Semester</th>
              <th className="py-2 px-4 border-b w-1/5">Code</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstances.map((instance, index) => (
              <tr
                key={instance.id}
                className={index % 2 === 1 ? "bg-blue-100" : "bg-white"}
              >
                <td className="py-2 px-4 border-r">{instance.course.title}</td>
                <td className="py-2 px-4 border-r">
                  {instance.year}-{instance.semester}
                </td>
                <td className="py-2 px-4 border-r">
                  {instance.course.course_code}
                </td>
                <td className="py-2 px-4 border-r flex gap-4">
                  {/* Button to view instance details */}
                  <button
                    onClick={() =>
                      handleView(
                        instance.id,
                        instance.year,
                        instance.semester,
                        instance.course.id
                      )
                    }
                    className='text-lg text-black rounded-sm p-0.5 hover:text-white hover:bg-gray-700 transition-colors duration-300'
                  >
                    <MdSearch />
                  </button>
                  {/* Button to delete an instance */}
                  <button
                    onClick={() =>
                      handleDelete(
                        instance.id,
                        instance.year,
                        instance.semester,
                        instance.course.id
                      )
                    }
                    className="text-2xl text-red-600"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Detail modal for displaying instance information */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        details={selectedInstance || {}}
        type="Instance"
      />
    </div>
  );
};

export default ViewInstances;
