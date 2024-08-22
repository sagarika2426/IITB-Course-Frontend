import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewInstances = () => {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/instances/')
      .then(response => {
        setInstances(response.data);
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching instances:', error));
  }, []);

  const handleView = (instanceId) => {
    console.log('Viewing instance with ID:', instanceId);
  };

  const handleDelete = (instanceId, year, semester, courseId) => {
    console.log(instanceId, year, semester, courseId);

    axios.delete(`http://127.0.0.1:8000/api/instances/${year}/${semester}/${courseId}/`)
      .then(() => {
        setInstances(instances.filter(instance => instance.id !== instanceId));

      })
      .catch(error => console.error('Error deleting instance:', error));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md text-left">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Course Title</th>
            <th className="py-2 px-4 border-b">Year-Semester</th>
            <th className="py-2 px-4 border-b">Code</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(instance => (
            
            <tr key={instance.id}>
              <td className="py-2 px-4 border-b">{instance.course.title}</td>
              <td className="py-2 px-4 border-b">{instance.year}-{instance.semester}</td>
              <td className="py-2 px-4 border-b">{instance.course.course_code}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button 
                  onClick={() => handleView(instance.id)} 
                  className="text-blue-500 hover:text-blue-700"
                >
                  View
                </button>
                <button 
                  onClick={() => handleDelete(instance.id, instance.year, instance.semester, instance.course.id)} 
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

export default ViewInstances;
