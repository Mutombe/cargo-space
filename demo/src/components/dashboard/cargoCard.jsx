// src/components/dashboard/CargoCard.jsx
import React from 'react';
import { 
  Truck, MapPin, Clock, Check, X, 
  Package, ArrowRight, Loader 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CargoCard = ({ shipment }) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-transit': 'bg-blue-100 text-blue-800',
    'delivered': 'bg-green-100 text-green-800'
  };
  
  const statusIcons = {
    'pending': <Loader className="animate-spin mr-1" size={16} />,
    'in-transit': <Truck size={16} className="mr-1" />,
    'delivered': <Check size={16} className="mr-1" />
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 hover:bg-gray-50"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 rounded-lg mr-4">
            <Package className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{shipment.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{shipment.from} → {shipment.to}</span>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
                {statusIcons[shipment.status]}
                {shipment.status === 'pending' ? 'Pending' : 
                 shipment.status === 'in-transit' ? 'In Transit' : 
                 'Delivered'}
              </span>
              <span className="ml-2 text-sm text-gray-500">{shipment.date}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold text-gray-800">{shipment.price}</div>
          {shipment.driver && (
            <div className="text-sm text-gray-600 mt-1">{shipment.driver}</div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Link 
          to={`/tracking/${shipment.id}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CargoCard;