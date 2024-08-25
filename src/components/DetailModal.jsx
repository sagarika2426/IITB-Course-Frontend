const DetailModal = ({ isOpen, onClose, details, type }) => {
  // If the modal is not open, return null to prevent rendering.
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-3/4">
        <h2 className="text-xl font-bold mb-4">{type} Details</h2>

        {/* Conditional rendering based on the type prop. If the type is "Course", show course details. */}
        {type === "Course" && (
          <>
            {/* Display the course title. If the title is not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Course Title:</strong> {details.title || 'N/A'}
            </div>
            {/* Display the course code. If the course code is not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Course Code:</strong> {details.course_code || 'N/A'}
            </div>
            {/* Display the course description. If the description is not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Description:</strong> {details.description || 'N/A'}
            </div>
          </>
        )}

        {/* Conditional rendering based on the type prop. If the type is "Instance", show instance details. */}
        {type === "Instance" && (
          <>
            {/* Display the course title related to the instance. If not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Course Title:</strong> {details.course?.title || 'N/A'}
            </div>
            {/* Display the course code related to the instance. If not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Course Code:</strong> {details.course?.course_code || 'N/A'}
            </div>
            {/* Display the course description related to the instance. If not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Description:</strong> {details.course?.description || 'N/A'}
            </div>
            {/* Display the year for the instance. If not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Year:</strong> {details.year || 'N/A'}
            </div>
            {/* Display the semester for the instance. If not available, show 'N/A'. */}
            <div className="mb-4">
              <strong>Semester:</strong> {details.semester || 'N/A'}
            </div>
          </>
        )}

        {/* Close button to close the modal. It triggers the onClose function passed as a prop. */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
