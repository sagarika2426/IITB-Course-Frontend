import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewCourses from "./ViewCourses";
import ViewInstances from "./ViewInstances";

const AddCourseInstanceForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [viewComponent, setViewComponent] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/courses/")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleAddCourse = () => {
    const newCourse = {
      title: courseTitle,
      course_code: courseCode,
      description: courseDescription,
    };

    axios
      .post("http://127.0.0.1:8000/api/courses/", newCourse)
      .then((response) => {
        setCourses([...courses, response.data]);
        setCourseTitle("");
        setCourseCode("");
        setCourseDescription("");
      })
      .catch((error) => console.error("Error adding course:", error));
  };

  const handleAddInstance = () => {
    const newInstance = {
      course_title: selectedCourseTitle,
      year: parseInt(year),
      semester: parseInt(semester),
    };

    axios
      .post("http://127.0.0.1:8000/api/instances/", newInstance)
      .then((response) => {
        setSelectedCourseTitle("");
        setYear("");
        setSemester("");
      })
      .catch((error) => console.error("Error adding instance:", error));
  };

  return (
    <>
      <div className="p-4 rounded-md shadow-md flex gap-10">
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
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Course
          </button>
        </div>

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
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 mb-2 w-full border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border p-2 mb-2 w-full border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleAddInstance}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Instance
          </button>
        </div>
      </div>

      <div className="flex gap-6 w-full border border-gray-300 rounded-lg justify-center mt-4 p-4 bg-gray-100">
        <button
          onClick={() => setViewComponent("courses")}
          className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 ${viewComponent === "courses" ? "bg-green-800 font-bold" : ""}`}
        >
          View All Courses
        </button>
        <button
          onClick={() => setViewComponent("instances")}
          className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 ${viewComponent === "instances" ? "bg-green-800 font-bold" : ""}`}
        >
          View All Instances
        </button>
      </div>

      <div className="mt-4">
        {viewComponent === "courses" && <ViewCourses />}
        {viewComponent === "instances" && <ViewInstances />}
      </div>
    </>
  );
};

export default AddCourseInstanceForm;
