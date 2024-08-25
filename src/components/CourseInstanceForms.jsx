import { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";
import InstanceForm from "./InstanceForm";
import ViewToggle from "./ViewToggle";
import ViewCourses from "./ViewCourses";
import ViewInstances from "./ViewInstances";

const CourseInstanceForms = () => {
  // State hooks to manage the list of courses, instances, and the current view component (either "courses" or "instances").
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [viewComponent, setViewComponent] = useState("courses");

  // useEffect to fetch courses and instances data from the backend API when the component mounts.
  useEffect(() => {
    // Fetching courses data from the API.
    axios.get("http://127.0.0.1:8000/api/courses/")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));

    // Fetching instances data from the API.
    axios.get("http://127.0.0.1:8000/api/instances/")
      .then(response => setInstances(response.data))  // Setting the fetched instances data to the instances state.
      .catch(error => console.error("Error fetching instances:", error));
  }, []);  // The empty dependency array means this effect runs only once when the component mounts.

  // Function to handle when a new course is added. It updates the courses state with the new course.
  const handleCourseAdded = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  // Function to handle when a new instance is added. It updates the instances state with the new instance.
  const handleInstanceAdded = (newInstance) => {
    setInstances([...instances, newInstance]);
  };

  return (
    <>
      <div className="p-4 rounded-md shadow-md flex gap-10 flex-col lg:flex-row">
        {/* Rendering the CourseForm component, passing down the handleCourseAdded function as a prop. */}
        <CourseForm onCourseAdded={handleCourseAdded} />
        
        {/* Rendering the InstanceForm component, passing down the list of courses and the handleInstanceAdded function as props. */}
        <InstanceForm courses={courses} onInstanceAdded={handleInstanceAdded} />
      </div>

      {/* Rendering the ViewToggle component, which allows switching between viewing courses or instances. */}
      <ViewToggle viewComponent={viewComponent} onViewChange={setViewComponent} />

      <div className="mt-4">
        {/* Conditionally rendering either the ViewCourses or ViewInstances component based on the selected view. */}
        {viewComponent === "courses" && <ViewCourses courses={courses} />}
        {viewComponent === "instances" && <ViewInstances instances={instances} />}
      </div>
    </>
  );
};

export default CourseInstanceForms;
