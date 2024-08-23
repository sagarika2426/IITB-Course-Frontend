import { useState, useEffect } from "react";
import axios from "axios";
import DetailModal from "./DetailModal";
import { MdDelete } from "react-icons/md";
import { MdSearch } from "react-icons/md";


const ViewInstances = () => {
  const [instances, setInstances] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [filteredInstances, setFilteredInstances] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/instances/")
      .then((response) => {
        setInstances(response.data);
        setFilteredInstances(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching instances:", error));
  }, []);

  const handleView = (instanceId, year, semester, courseId) => {
    axios
      .get(
        `http://127.0.0.1:8000/api/instances/${year}/${semester}/${courseId}/`
      )
      .then((response) => {
        setSelectedInstance(response.data);
        setIsModalOpen(true);
      })
      .catch((error) =>
        console.error("Error fetching instance details:", error)
      );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstance(null);
  };

  const handleDelete = (instanceId, year, semester, courseId) => {
    console.log(instanceId, year, semester, courseId);

    axios
      .delete(
        `http://127.0.0.1:8000/api/instances/${year}/${semester}/${courseId}/`
      )
      .then(() => {
        setInstances(
          instances.filter((instance) => instance.id !== instanceId)
        );
      })
      .catch((error) => console.error("Error deleting instance:", error));
  };

  const handleSearch = () => {
    const year = yearFilter.trim();
    const semester = semesterFilter.trim();

    // Validate year and semester
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
      setFilteredInstances(instances);
    }
  };

  return (
    <div className="px-14 bg-white rounded-md shadow-md text-left">
      <div className="mb-4 flex gap-4 items-center justify-center bg-gray-200 p-2">
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
          className="border p-2 rounded-md border-gray-600"
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
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>
      
      {filteredInstances.length === 0 ? (
        <div className="text-center my-10">No Course for this Year and Semester found! Please try with different Year and Semester.</div>
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
                <td className="py-2 px-4 border-r flex space-x-2">
                  <button
                    onClick={() =>
                      handleView(
                        instance.id,
                        instance.year,
                        instance.semester,
                        instance.course.id
                      )
                    }
                    className='text-lg bg-black text-white rounded-sm p-0.5'

                  >
                    <MdSearch />
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(
                        instance.id,
                        instance.year,
                        instance.semester,
                        instance.course.id
                      )
                    }
                    className="text-2xl"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
