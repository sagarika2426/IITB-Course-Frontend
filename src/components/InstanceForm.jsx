import { useState } from 'react';
import axios from 'axios';

const InstanceForm = ({ courses, onInstanceAdded }) => {
  // State hooks to manage form data
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  // Function to handle adding a new instance
  const handleAddInstance = () => {
    // Ensure all fields are filled
    if (!selectedCourseTitle || !year || !semester) {
      alert("Please fill in all the fields.");
      return;
    }

    // Create a new instance object
    const newInstance = {
      course_title: selectedCourseTitle,
      year: parseInt(year),
      semester: parseInt(semester),
    };

    // Send a POST request to add the new instance
    axios.post("http://127.0.0.1:8000/api/instances/", newInstance)
      .then(response => {
        // Update the parent component with the new instance
        onInstanceAdded(response.data);
        // Reset form fields
        setSelectedCourseTitle("");
        setYear("");
        setSemester("");
        alert(`Instance added! Refresh the table to view.`);
      })
      .catch(error => console.error("Error adding instance:", error));
  };

  return (
    <div className="lg:w-1/5 mx-auto flex flex-col items-center my-auto w-full">
      {/* Dropdown to select a course */}
      <select
        value={selectedCourseTitle}
        onChange={(e) => setSelectedCourseTitle(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      >
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.title}>
            {course.title}
          </option>
        ))}
      </select>

      {/* Inputs for year and semester */}
      <div className="flex gap-6 w-full">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 mb-2 w-full border-gray-300 rounded-md"
          min="1000"
          max="9999"
          step="1"
        />
        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2 mb-2 w-full border-gray-300 rounded-md"
        />
      </div>

      {/* Button to add the instance */}
      <button
        onClick={handleAddInstance}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition-colors duration-300"
      >
        Add Instance
      </button>
    </div>
  );
};

export default InstanceForm;
