import { useState } from 'react';
import axios from 'axios';

const InstanceForm = ({ courses, onInstanceAdded }) => {
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const handleAddInstance = () => {
    if (!selectedCourseTitle || !year || !semester) {
      alert("Please fill in all the fields.");
      return;
    }

    const newInstance = {
      course_title: selectedCourseTitle,
      year: parseInt(year),
      semester: parseInt(semester),
    };

    axios.post("http://127.0.0.1:8000/api/instances/", newInstance)
      .then(response => {
        onInstanceAdded(response.data);
        setSelectedCourseTitle("");
        setYear("");
        setSemester("");
        alert(`Instance added! Refresh the table to view.`);
      })
      .catch(error => console.error("Error adding instance:", error));
  };

  return (
    <div className="w-1/5 mx-auto flex flex-col items-center my-auto">
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
