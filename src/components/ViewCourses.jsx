import { useState, useEffect } from 'react';
import axios from 'axios';
import DetailModal from './DetailModal';
import { MdDelete } from "react-icons/md";
import { MdSearch } from "react-icons/md";


const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleView = (courseId) => {
    axios.get(`http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then(response => {
        setSelectedCourse(response.data);
        setIsModalOpen(true);
      })
      .catch(error => console.error('Error fetching course details:', error));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDelete = (courseId) => {
    axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== courseId));
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  return (
    <div className="lg:px-14 bg-white rounded-md shadow-md text-left">
      <table className="min-w-full bg-white">
        <thead>
          <tr className='bg-blue-500 text-white'>
            <th className="py-2 px-4 border-b">Course Title</th>
            <th className="py-2 px-4 border-b lg:w-1/4">Code</th>
            <th className="py-2 px-4 border-b lg:w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id} className={index % 2 === 1 ? 'bg-blue-100' : 'bg-white'}>
              <td className="py-2 px-4 border-r">{course.title}</td>
              <td className="py-2 px-4 border-r">{course.course_code}</td>
              <td className="py-2 px-4 border-r flex">
                <button 
                  onClick={() => handleView(course.id)}
                  className='text-lg bg-black text-white rounded-sm p-0.5'
                >
                  {/* <IoEye/> */}
                  <MdSearch/>
                 
                </button>
                <button 
                  onClick={() => handleDelete(course.id)} 
                  className="text-2xl"
                >
                   <MdDelete/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        details={selectedCourse || {}}
        type="Course"
      />
    </div>
  );
};

export default ViewCourses;
