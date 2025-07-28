import React from 'react';
import { motion } from 'framer-motion';
import { 
 Box, 
  Briefcase, Leaf 
} from 'lucide-react';
import { FaShoppingBag } from "react-icons/fa";
import { GrLounge } from "react-icons/gr";
import { GoPackage } from "react-icons/go";
import { LiaGemSolid } from "react-icons/lia";

const CargoTypeSelector = ({ cargoType, setCargoType }) => {
  const cargoTypes = [
    { id: 'general', name: 'General', icon: <GoPackage size={24} /> },
    { id: 'furniture', name: 'Furniture', icon: <GrLounge size={24} /> },
    { id: 'electronics', name: 'Electronics', icon: <Box size={24} /> },
    { id: 'documents', name: 'Documents', icon: <Briefcase size={24} /> },
    { id: 'clothing', name: 'Clothing', icon: <FaShoppingBag size={24} /> },
    { id: 'jewelry', name: 'Jewelry', icon: <LiaGemSolid size={24} /> },
    { id: 'agricultural', name: 'Agricultural', icon: <Leaf size={24} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">What type of cargo are you shipping?</h3>
        <p className="text-gray-600">Select the category that best describes your shipment</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cargoTypes.map((type) => (
          <motion.button
            key={type.id}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${
              cargoType === type.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            } transition-colors`}
            onClick={() => setCargoType(type.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-2 text-blue-600">
              {type.icon}
            </div>
            <span className="text-sm font-medium text-gray-800">{type.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CargoTypeSelector;