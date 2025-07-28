import React from 'react';
import { 
  Package, MapPin, Truck, Box, 
  Info, Ruler, AlertTriangle 
} from 'lucide-react';

const CargoPreview = ({ 
  cargoType, 
  pickupLocation, 
  dropoffLocation, 
  cargoDetails, 
  transportMode,
  estimatedCost
}) => {
  // Map cargo type to display name
  const cargoTypeNames = {
    general: 'General',
    furniture: 'Furniture',
    electronics: 'Electronics',
    documents: 'Documents',
    clothing: 'Clothing',
    jewelry: 'Jewelry',
    agricultural: 'Agricultural'
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-800">Review Your Shipment</h3>
        <p className="text-gray-600">Confirm all details before posting</p>
      </div>
      
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Left Column */}
            <div className="md:w-1/2 space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Package className="mr-2 text-blue-600" size={20} />
                  Cargo Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cargo Type</span>
                    <span className="font-medium">{cargoTypeNames[cargoType]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title</span>
                    <span className="font-medium">{cargoDetails.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{cargoDetails.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium">
                      {cargoDetails.dimensions.length}cm x {cargoDetails.dimensions.width}cm x {cargoDetails.dimensions.height}cm
                    </span>
                  </div>
                  {cargoDetails.fragile && (
                    <div className="flex items-center text-yellow-600">
                      <AlertTriangle size={16} className="mr-2" />
                      <span className="font-medium">Fragile Items</span>
                    </div>
                  )}
                  {cargoDetails.requiresHandling && (
                    <div className="flex items-center text-purple-600">
                      <Info size={16} className="mr-2" />
                      <span className="font-medium">Requires Special Handling</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Truck className="mr-2 text-blue-600" size={20} />
                  Transport Mode
                </h4>
                <div className="font-medium">{transportMode}</div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="md:w-1/2 space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <MapPin className="mr-2 text-blue-600" size={20} />
                  Locations
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Pickup Location</div>
                    <div className="font-medium">{pickupLocation?.name}</div>
                    <div className="text-sm text-gray-600">{pickupLocation?.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Drop-off Location</div>
                    <div className="font-medium">{dropoffLocation?.name}</div>
                    <div className="text-sm text-gray-600">{dropoffLocation?.address}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Estimated Cost</h4>
                <div className="text-3xl font-bold text-blue-600">ZWL {estimatedCost}</div>
                <p className="text-sm text-gray-600">Final price may vary based on driver negotiation</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 border-t">
          <h4 className="font-bold text-gray-800 mb-3">Cargo Description</h4>
          <p className="text-gray-600">
            {cargoDetails.description || 'No description provided'}
          </p>
        </div>
        
        <div className="p-6 border-t">
          <h4 className="font-bold text-gray-800 mb-3">Cargo Images</h4>
          <div className="flex flex-wrap gap-4">
            {cargoDetails.images.length > 0 ? (
              cargoDetails.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Cargo preview ${index}`} 
                  className="w-24 h-24 object-cover rounded-md border" 
                />
              ))
            ) : (
              <div className="text-gray-500">No images uploaded</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
        <Info size={20} className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-yellow-800">
          Once you post this cargo, drivers will be notified and can start bidding. 
          You'll be able to review offers and select a driver that meets your requirements.
        </p>
      </div>
    </div>
  );
};

export default CargoPreview;