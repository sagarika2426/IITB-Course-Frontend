import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewCourses from './ViewCourses';
import ViewInstances from './ViewInstances';

const AddCourseInstanceForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [viewComponent, setViewComponent] = useState(null);

  useEffect(() => {
    // Fetch courses from the API
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
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

  const handleAddInstance = () => {
    const newInstance = {
      course_title: selectedCourseTitle,
      year: parseInt(year),
      semester: parseInt(semester),
    };

    axios.post('http://127.0.0.1:8000/api/instances/', newInstance)
      .then(response => {
        setSelectedCourseTitle('');
        setYear('');
        setSemester('');
      })
      .catch(error => console.error('Error adding instance:', error));
  };

  return (
    <>
      <div className="p-4 bg-gray-100 rounded-md shadow-md flex gap-10">
        <div className='w-1/3 border border-black justify-center'>
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
          <button onClick={handleAddCourse} className="bg-blue-500 text-white p-2 rounded justify-center">
            Add Course
          </button>
        </div>

        <div className='w-1/4 border border-black m-auto'>
          <select
            value={selectedCourseTitle}
            onChange={(e) => setSelectedCourseTitle(e.target.value)}
            className="border p-2 mb-2 w-full"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
          <div className='flex gap-6'>
            <input
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
          </div>
          <button onClick={handleAddInstance} className="bg-blue-500 text-white p-2 rounded">
            Add Instance
          </button>
        </div>
      </div>

      <div className='flex gap-4 w-full border border-black justify-center mt-4'>
        <button
          onClick={() => setViewComponent('courses')}
          className='bg-green-500 px-4 py-2 rounded-lg'
        >
          View All Courses
        </button>
        <button
          onClick={() => setViewComponent('instances')}
          className='bg-green-500 px-4 py-2 rounded-lg'
        >
          View All Instances
        </button>
      </div>

      <div className="mt-4">
        {viewComponent === 'courses' && <ViewCourses />}
        {viewComponent === 'instances' && <ViewInstances/>}
      </div>
    </>
  );
};

export default AddCourseInstanceForm;
