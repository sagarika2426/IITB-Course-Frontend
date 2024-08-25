import { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";
import InstanceForm from "./InstanceForm";
import ViewToggle from "./ViewToggle";
import ViewCourses from "./ViewCourses";
import ViewInstances from "./ViewInstances";

const CourseInstanceForms = () => {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [viewComponent, setViewComponent] = useState("courses");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses/")
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));

    axios.get("http://127.0.0.1:8000/api/instances/")
      .then(response => setInstances(response.data))
      .catch(error => console.error("Error fetching instances:", error));
  }, []);

  const handleCourseAdded = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleInstanceAdded = (newInstance) => {
    setInstances([...instances, newInstance]);
  };

  return (
    <>
      <div className="p-4 rounded-md shadow-md flex gap-10">
        <CourseForm onCourseAdded={handleCourseAdded} />
        <InstanceForm courses={courses} onInstanceAdded={handleInstanceAdded} />
      </div>
      <ViewToggle viewComponent={viewComponent} onViewChange={setViewComponent} />
      <div className="mt-4">
        {viewComponent === "courses" && <ViewCourses courses={courses} />}
        {viewComponent === "instances" && <ViewInstances instances={instances} />}
      </div>
    </>
  );
};

export default CourseInstanceForms;
