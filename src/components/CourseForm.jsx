import { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ onCourseAdded }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleAddCourse = () => {
    if (!courseTitle || !courseCode || !courseDescription) {
      alert("Please fill in all the fields.");
      return;
    }

    const newCourse = {
      title: courseTitle,
      course_code: courseCode,
      description: courseDescription,
    };

    axios.post("http://127.0.0.1:8000/api/courses/", newCourse)
      .then(response => {
        onCourseAdded(response.data);
        setCourseTitle("");
        setCourseCode("");
        setCourseDescription("");
        alert(`Course added: ${response.data.title}. Refresh the table to view.`);
      })
      .catch(error => console.error("Error adding course:", error));
  };

  return (
    <div className="w-1/3 flex flex-col items-center">
      <input
        type="text"
        placeholder="Course Title"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      />
      <textarea
        placeholder="Course Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      />
      <button
        onClick={handleAddCourse}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition-colors duration-300"
      >
        Add Course
      </button>
    </div>
  );
};

export default CourseForm;
