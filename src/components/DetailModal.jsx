import React from 'react';

const DetailModal = ({ isOpen, onClose, details, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-3/4">
        <h2 className="text-xl font-bold mb-4">{type} Details</h2>
        
        {type === "Course" && (
          <>
            <div className="mb-4">
              <strong>Course Title:</strong> {details.title || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Course Code:</strong> {details.course_code || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Description:</strong> {details.description || 'N/A'}
            </div>
          </>
        )}

        {type === "Instance" && (
          <>
            <div className="mb-4">
              <strong>Course Title:</strong> {details.course?.title || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Course Code:</strong> {details.course?.course_code || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Description:</strong> {details.course?.description || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Year:</strong> {details.year || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Semester:</strong> {details.semester || 'N/A'}
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
