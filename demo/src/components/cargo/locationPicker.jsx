import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, X, Info } from 'lucide-react';
import Map from '../ui/Map';

const LocationPicker = ({ pickupLocation, dropoffLocation, onLocationSelect }) => {
  const [activeLocation, setActiveLocation] = useState('pickup');
  
  // Sample locations for demonstration
  const locations = [
    { name: 'Harare CBD', address: '123 Samora Machel Ave, Harare', coordinates: [-17.82922, 31.05221] },
    { name: 'Chitungwiza', address: '45 Robert Mugabe Rd, Chitungwiza', coordinates: [-17.993, 31.048] },
    { name: 'Ruwa', address: '12 Enterprise Road, Ruwa', coordinates: [-17.889, 31.147] },
    { name: 'Norton', address: '34 Independence Ave, Norton', coordinates: [-17.883, 30.700] },
  ];
  
  const handleMapClick = (e) => {
    const location = {
      name: 'Selected Location',
      address: `Approximate location (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`,
      coordinates: [e.latlng.lat, e.latlng.lng]
    };
    onLocationSelect(activeLocation, location);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Set Pickup and Drop-off Locations</h3>
        <p className="text-gray-600">
          {activeLocation === 'pickup' 
            ? 'Click on the map to select pickup location' 
            : 'Click on the map to select drop-off location'}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-4">
          <div>
            <button
              className={`w-full p-4 rounded-lg text-left ${
                activeLocation === 'pickup' 
                  ? 'border-2 border-blue-500 bg-blue-50' 
                  : 'border border-gray-300'
              }`}
              onClick={() => setActiveLocation('pickup')}
            >
              <div className="flex items-center">
                <MapPin className="text-blue-500 mr-2" size={20} />
                <div className="font-medium text-gray-800">Pickup Location</div>
              </div>
              {pickupLocation ? (
                <div className="mt-2">
                  <div className="font-medium">{pickupLocation.name}</div>
                  <p className="text-sm text-gray-600">{pickupLocation.address}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-1">Select pickup location</p>
              )}
            </button>
          </div>
          
          <div>
            <button
              className={`w-full p-4 rounded-lg text-left ${
                activeLocation === 'dropoff' 
                  ? 'border-2 border-green-500 bg-green-50' 
                  : 'border border-gray-300'
              }`}
              onClick={() => setActiveLocation('dropoff')}
            >
              <div className="flex items-center">
                <MapPin className="text-green-500 mr-2" size={20} />
                <div className="font-medium text-gray-800">Drop-off Location</div>
              </div>
              {dropoffLocation ? (
                <div className="mt-2">
                  <div className="font-medium">{dropoffLocation.name}</div>
                  <p className="text-sm text-gray-600">{dropoffLocation.address}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-1">Select drop-off location</p>
              )}
            </button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <MapPin className="mr-2" size={16} />
              Recent Locations
            </h4>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50"
                  onClick={() => onLocationSelect(activeLocation, location)}
                >
                  <div className="font-medium">{location.name}</div>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 h-96 rounded-xl overflow-hidden border border-gray-300">
          <Map 
            onClick={handleMapClick}
            pickupLocation={pickupLocation?.coordinates}
            dropoffLocation={dropoffLocation?.coordinates}
          />
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="text-blue-500 mt-0.5 mr-2" size={16} />
          <p className="text-sm text-blue-700">
            Click anywhere on the map to set the {activeLocation} location. 
            The selected coordinates will be shown as a marker.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;