'use client'

import { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { Map, NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const AskPakTour = () => {
  const [messages, setMessages] = useState([]);
  const [inputUserMsg, setInputUserMsg] = useState('');
  const [mapState, setMapState] = useState({
    latitude: 30.3753, // Centered on Pakistan
    longitude: 69.3451,
    zoom: 5,
  });
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUserMsg.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: inputUserMsg },
    ]);

    setInputUserMsg('');
    setLoading(true);

    console.log("inputUserMsg",inputUserMsg)
    try {
      const response = await axios.post('http://localhost:8000/chat', {
        message: inputUserMsg,
      });

      const assistantResponse = response.data.response;
      const functionOutputs = response.data.function_outputs;

      functionOutputs.forEach((output) => {
        if (output['action'] === 'update_map') {
          console.log('Map center coordinates:', output['longitude'], output['latitude']);
          setMapState({
            latitude: output['latitude'],
            longitude: output['longitude'],
            zoom: output['zoom'] || 12,
          });
        } else {
          console.warn('Unknown action:', output['action']);
        }
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: assistantResponse },
      ]);
    } catch (error) {
      console.error('Error fetching assistant response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, there was an error processing your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMapStyle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-start relative bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Left Panel (Chat) */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-teal-500 text-white text-xs px-2 py-1 rounded-full mb-2">BETA</div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Ask PakiGenTravel<span className="text-teal-500">.</span>
            </h1>
            <p className="text-gray-600 mt-2 text-base lg:text-lg">
              Meet your new favorite travel planning tool. Powered by our data and AI,
              we'll help you discover your next vacation.
            </p>
          </div>

          {/* Chat messages */}
          <div className="chat-container mb-6 max-h-60 sm:max-h-80 overflow-y-auto bg-gray-50 rounded-lg p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.role === 'user' ? 'bg-teal-100' : 'bg-white'
                } text-left p-3 mb-2 rounded-lg shadow`}
              >
                <p className="text-gray-800 whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 mb-2 italic">
                Assistant is typing...
              </div>
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex items-center mb-4">
            <input
              type="text"
              // Smaller text & padding on mobile, larger on bigger screens
              className="flex-grow p-2 text-sm md:p-4 md:text-base text-gray-700 bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-teal-500
                         border border-gray-300 rounded-l-lg"
              placeholder="What are you looking for in your next trip?"
              value={inputUserMsg}
              onChange={(e) => setInputUserMsg(e.target.value)}
            />
            <button
              type="submit"
              className="bg-teal-500 text-white p-2 md:p-4 rounded-r-lg hover:bg-teal-600 transition duration-300"
            >
              <FaSearch />
            </button>
          </form>

          <div className="text-gray-500 text-sm italic">
            Try something specific like: What are three must-visit places in Lahore?
          </div>
        </div>

        {/* Right Panel (Map) */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-64 sm:h-[600px]">
            <Map
              {...mapState}
              onMove={(evt) => setMapState(evt.viewState)}
              mapStyle={
                isDarkMode
                  ? 'mapbox://styles/mapbox/dark-v11'
                  : 'mapbox://styles/mapbox/light-v11'
              }
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              style={{ width: '100%', height: '100%' }}
            >
              <NavigationControl position="top-left" />
              <Marker
                latitude={mapState.latitude}
                longitude={mapState.longitude}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div
                  className="text-4xl cursor-pointer animate-bounce"
                  onClick={() =>
                    setSelectedLocation({
                      latitude: mapState.latitude,
                      longitude: mapState.longitude,
                    })
                  }
                >
                  📍
                </div>
              </Marker>

              {selectedLocation && (
                <Popup
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude}
                  onClose={() => setSelectedLocation(null)}
                  closeOnClick={false}
                  anchor="bottom"
                >
                  <div className="p-2">
                    <h3 className="font-bold">Selected Location</h3>
                    <p>Lat: {selectedLocation.latitude.toFixed(4)}</p>
                    <p>Lon: {selectedLocation.longitude.toFixed(4)}</p>
                  </div>
                </Popup>
              )}
            </Map>

            {/* Zoom Info */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded-lg shadow-md">
              <p className="text-sm font-semibold">Zoom: {mapState.zoom.toFixed(2)}</p>
            </div>

            {/* Toggle Map Style Button */}
            <button
              onClick={toggleMapStyle}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md
                         hover:bg-gray-100 transition duration-300"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskPakTour;