import React from 'react';
import { motion } from 'framer-motion';

const VehicleTypeSelector = ({ vehicleTypes, selectedType, setSelectedType }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Vehicle Type</h3>
        <p className="text-gray-600 mb-6">Select the type of vehicle you'll be using for deliveries</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicleTypes.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
              selectedType === vehicle.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedType(vehicle.id)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-blue-600">
                {vehicle.icon}
              </div>
              <h4 className="font-bold text-gray-800">{vehicle.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{vehicle.capacity}</p>
              <div className={`mt-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedType === vehicle.id 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-gray-300'
              }`}>
                {selectedType === vehicle.id && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeSelector;