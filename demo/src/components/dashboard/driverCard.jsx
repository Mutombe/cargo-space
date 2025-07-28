import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Star, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

// Sample driver images - you can replace these URLs with your own image assets
const getDriverImage = (driverId) => {
  const driverImages = {
    1: '/driver1.webp',
    2: '/driver2.png',
    3: 'driver3.webp',
    4: 'driver4.jpg',
  };
  
  // Return image based on driver ID, or use a default if not found
  return driverImages[driverId] || driverImages[1];
};

const DriverCard = ({ driver }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 mr-4">
          <img 
            src={getDriverImage(driver.id)} 
            alt={`${driver.name} profile`}
            className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
            onError={(e) => {
              // Fallback to a default avatar if image fails to load
              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
            }}
          />
          {/* Optional: Add online status indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{driver.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 fill-current ${
                    i < Math.floor(driver.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">({driver.reviews})</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <Truck size={16} className="text-gray-500 mr-2" />
          <span className="text-gray-700">{driver.vehicle}</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 mr-2 flex justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700">{driver.capacity} capacity</span>
        </div>
        <div className="flex items-center">
          <MapPin size={16} className="text-gray-500 mr-2" />
          <span className="text-gray-700">{driver.distance} away</span>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="font-bold text-gray-800">{driver.price}</div>
        <Button variant="outline" size="sm">
          Book Now
        </Button>
      </div>
    </motion.div>
  );
};

export default DriverCard;