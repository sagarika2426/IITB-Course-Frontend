import { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourseInstanceForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  useEffect(() => {
    // Fetch courses from the API
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleAddCourse = () => {
    const newCourse = {
      title: courseTitle,
      course_code: courseCode,
      description: courseDescription,
    };

    axios.post('http://127.0.0.1:8000/api/courses/', newCourse)
      .then(response => {
        setCourses([...courses, response.data]);
        setCourseTitle('');
        setCourseCode('');
        setCourseDescription('');
      })
      .catch(error => console.error('Error adding course:', error));
  };

  return (
    <div className="rounded-md shadow-md border p-4">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>
      <div className='w-1/2'>
        <input
          type="text"
          placeholder="Course Title"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleAddCourse} className="bg-blue-500 text-white p-2 rounded">
          Add Course
        </button>
      </div>
    </div>
  );
};

export default AddCourseInstanceForm;
