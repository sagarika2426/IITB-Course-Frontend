const ViewToggle = ({ viewComponent, onViewChange }) => {
  return (
    <div className="flex gap-6 w-full border border-gray-300 rounded-lg justify-center mt-4 p-4 bg-gray-100">
      <button
        onClick={() => onViewChange("courses")}
        className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 ${viewComponent === "courses" ? "bg-green-800 font-bold" : ""}`}
      >
        View All Courses
      </button>
      <button
        onClick={() => onViewChange("instances")}
        className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 ${viewComponent === "instances" ? "bg-green-800 font-bold" : ""}`}
      >
        View All Instances
      </button>
    </div>
  );
};

export default ViewToggle;
