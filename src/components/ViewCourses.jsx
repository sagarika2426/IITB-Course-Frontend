import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleView = (courseId) => {
    console.log('Viewing course with ID:', courseId);
  };

  const handleDelete = (courseId) => {
    axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== courseId));
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md text-left">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Course Title</th>
            <th className="py-2 px-4 border-b">Course Code</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td className="py-2 px-4 border-b">{course.title}</td>
              <td className="py-2 px-4 border-b">{course.course_code}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button 
                  onClick={() => handleView(course.id)} 
                  className="text-blue-500 hover:text-blue-700"
                >
                  View
                </button>
                <button 
                  onClick={() => handleDelete(course.id)} 
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourses;
