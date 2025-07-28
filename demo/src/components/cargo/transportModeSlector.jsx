import React from 'react';
import { motion } from 'framer-motion';

const TransportModeSelector = ({ transportModes, selectedMode, setSelectedMode }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Select Transport Mode</h3>
        <p className="text-gray-600">Choose the vehicle type that best fits your cargo</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transportModes.map((mode) => (
          <motion.button
            key={mode.id}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 ${
              selectedMode === mode.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            } transition-colors`}
            onClick={() => setSelectedMode(mode.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="mb-3 text-blue-600">
              {mode.icon}
            </div>
            <span className="text-lg font-medium text-gray-800 mb-1">{mode.name}</span>
            <span className="text-sm text-gray-600">{mode.capacity}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TransportModeSelector;