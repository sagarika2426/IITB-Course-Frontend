import { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ onCourseAdded }) => {
  // State hooks to manage input fields for course title, code, and description.
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  // Function to handle the addition of a new course.
  const handleAddCourse = () => {
    // Check if any input field is empty, and if so, alert the user.
    if (!courseTitle || !courseCode || !courseDescription) {
      alert("Please fill in all the fields.");
      return;
    }

    // Creating a new course object with the input data.
    const newCourse = {
      title: courseTitle,
      course_code: courseCode,
      description: courseDescription,
    };

    // Sending a POST request to the backend API to add the new course.
    axios.post("http://127.0.0.1:8000/api/courses/", newCourse)
      .then(response => {
        // On successful addition, pass the new course data to the parent component.
        onCourseAdded(response.data);
        
        // Clear the input fields.
        setCourseTitle("");
        setCourseCode("");
        setCourseDescription("");
        
        // Alert the user that the course has been added.
        alert(`Course added: ${response.data.title}. Refresh the table to view.`);
      })
      .catch(error => console.error("Error adding course:", error));
  };

  return (
    <div className="lg:w-1/3 flex flex-col items-center w-full">
      {/* Input field for the course title */}
      <input
        type="text"
        placeholder="Course Title"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      />
      
      {/* Input field for the course code */}
      <input
        type="text"
        placeholder="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      />
      
      {/* Textarea for the course description */}
      <textarea
        placeholder="Course Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        className="border p-2 mb-2 w-full border-gray-300 rounded-md"
      />
      
      {/* Button to trigger the add course action */}
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
