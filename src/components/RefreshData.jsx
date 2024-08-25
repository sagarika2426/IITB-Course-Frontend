import { MdRefresh } from 'react-icons/md';

const RefreshData = ({ onRefresh }) => {
  return (
    <button
      onClick={onRefresh}
      className="bg-blue-600 text-white py-2 px-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-300"
    >
      <MdRefresh className="mr-2" /> Refresh
    </button>
  );
};

export default RefreshData;