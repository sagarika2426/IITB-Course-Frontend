import { useState, useEffect } from 'react';
import axios from 'axios';
import DetailModal from './DetailModal';
import { MdDelete, MdSearch, MdRefresh } from 'react-icons/md'; // Import the refresh icon
import RefreshData from './RefreshData';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = () => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  };

  useEffect(() => {
    fetchCourses(); 
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
    if (window.confirm("Are you sure you want to delete this course?")) {

    axios.delete(`http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== courseId));
      })
      .catch(error => console.error('Error deleting course:', error));
    }
  };

  return (
    <div className="px-14 bg-white rounded-md shadow-md text-left pb-6">
      <div className="flex justify-end mb-4">
        <button 
          onClick={fetchCourses}
          className="flex items-center"
        >
          <RefreshData/>
        </button>
      </div>
      {courses.length === 0 ? (
        <p className="text-center text-gray-700">No courses available! Add courses to view here.</p>
      ) : (
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
                <td className="py-2 px-4 border-r flex gap-4">
                  <button 
                    onClick={() => handleView(course.id)}
                    className='text-lg font-bold text-black rounded-sm p-0.5 hover:text-white hover:bg-gray-700 transition-colors duration-300'
                  >
                    <MdSearch/>
                  </button>
                  <button 
                    onClick={() => handleDelete(course.id)} 
                    className="text-2xl text-red-600"
                  >
                     <MdDelete/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
