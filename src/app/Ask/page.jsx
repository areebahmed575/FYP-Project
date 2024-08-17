import { FaPencilAlt, FaSearch } from 'react-icons/fa';

const Ask = () => {
  return (
    <div className="min-h-screen bg-white p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start relative">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 z-10">
          <div className="mb-2">
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">BETA</span>
          </div>
          <h1 className="text-6xl font-bold text-black mb-2">Ask Pak Tour<span className="text-teal-500">.</span></h1>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Meet your new favorite travel planning tool. Powered by our data and AI, 
            we'll help you discover your next vacation.
          </p>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 relative lg:translate-x-[80px] lg:translate-y-[50px]">
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Starting destination:</span>
                <span className="text-blue-500">Karachi</span>
                <FaPencilAlt className="text-blue-500 ml-2 text-xs" />
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="text"
                className="flex-grow p-4 text-gray-700 focus:outline-none border border-gray-300 rounded-l-lg"
                placeholder="What are you looking for in your next trip?"
              />
              <button className="bg-teal-500 text-white p-4 rounded-r-lg">
                <FaSearch />
              </button>
            </div>
            
            <div className="text-gray-500 text-sm">
              Try something specific like: what direct flights are offered to beach destinations under $500?
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-[85%] pb-[90%] lg:translate-x-[-85px]">
            <div className="absolute inset-0 overflow-hidden" style={{
              borderTopLeftRadius: '120px',
              borderTopRightRadius: '120px',
              borderBottomLeftRadius: '120px',
              borderBottomRightRadius: '120px'
            }}>
              <img src="/57075ec37792f.jpg" alt="Family Travel" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;
