import React from 'react';
import { motion } from 'framer-motion';
import { X, Image, Info } from 'lucide-react';

const CargoDetailsForm = ({ 
  cargoDetails, 
  onDetailsChange, 
  onImageUpload, 
  removeImage 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Cargo Details</h3>
        <p className="text-gray-600">Provide information about your shipment</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Title</label>
          <input
            type="text"
            value={cargoDetails.title}
            onChange={(e) => onDetailsChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Office Furniture"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            value={cargoDetails.weight}
            onChange={(e) => onDetailsChange('weight', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 50"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={cargoDetails.description}
            onChange={(e) => onDetailsChange('description', e.target.value)}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your cargo in detail..."
          ></textarea>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (cm)</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              value={cargoDetails.dimensions.length}
              onChange={(e) => onDetailsChange('dimensions', {
                ...cargoDetails.dimensions,
                length: e.target.value
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Length"
            />
          </div>
          <div>
            <input
              type="number"
              value={cargoDetails.dimensions.width}
              onChange={(e) => onDetailsChange('dimensions', {
                ...cargoDetails.dimensions,
                width: e.target.value
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Width"
            />
          </div>
          <div>
            <input
              type="number"
              value={cargoDetails.dimensions.height}
              onChange={(e) => onDetailsChange('dimensions', {
                ...cargoDetails.dimensions,
                height: e.target.value
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Height"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            id="fragile"
            type="checkbox"
            checked={cargoDetails.fragile}
            onChange={(e) => onDetailsChange('fragile', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="fragile" className="ml-2 block text-sm text-gray-700">
            Fragile Items
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="requiresHandling"
            type="checkbox"
            checked={cargoDetails.requiresHandling}
            onChange={(e) => onDetailsChange('requiresHandling', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="requiresHandling" className="ml-2 block text-sm text-gray-700">
            Requires Special Handling
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (Max 4)</label>
        <div className="flex flex-wrap gap-4">
          {cargoDetails.images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Cargo ${index}`} className="w-24 h-24 object-cover rounded-md border" />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}
          
          {cargoDetails.images.length < 4 && (
            <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
              <Image size={24} className="text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">Add Image</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={onImageUpload}
                multiple
              />
            </label>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg flex items-start">
        <Info size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-blue-800">
          Provide accurate details to help drivers understand your shipment requirements. 
          Special handling may include items that need temperature control, extra care, or specific orientation.
        </p>
      </div>
    </div>
  );
};

export default CargoDetailsForm;