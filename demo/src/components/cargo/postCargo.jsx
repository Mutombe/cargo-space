import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, MapPin, Truck, Car, Bike, 
  ArrowRight, X, Check, Loader, Info 
} from 'lucide-react';
import Header from '../nav/nav';
import CargoTypeSelector from './cargoType';
import LocationPicker from './locationPicker';
import CargoDetailsForm from './carDetailsForm';
import TransportModeSelector from './transportModeSlector';
import CargoPreview from './cargoPreview';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const PostCargo = () => {
  const [step, setStep] = useState(1);
  const [cargoType, setCargoType] = useState('general');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [cargoDetails, setCargoDetails] = useState({
    title: '',
    description: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    images: [],
    fragile: false,
    requiresHandling: false
  });
  const [transportMode, setTransportMode] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const transportModes = [
    { id: 'bike', name: 'Bike', icon: <Bike />, capacity: 'Up to 50kg' },
    { id: 'car', name: 'Car', icon: <Car />, capacity: 'Up to 200kg' },
    { id: 'small-truck', name: 'Small Truck', icon: <Truck />, capacity: 'Up to 1 ton' },
    { id: 'medium-truck', name: 'Medium Truck', icon: <Truck />, capacity: 'Up to 5 tons' },
    { id: 'large-truck', name: 'Large Truck', icon: <Truck />, capacity: 'Up to 20 tons' },
    { id: 'heavy-haul', name: 'Heavy Haul', icon: <Truck />, capacity: '20+ tons' },
  ];

  const handleLocationSelect = (type, location) => {
    if (type === 'pickup') {
      setPickupLocation(location);
    } else {
      setDropoffLocation(location);
    }
  };

  const handleCargoDetailsChange = (field, value) => {
    setCargoDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => URL.createObjectURL(file));
      setCargoDetails(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 4)
      }));
    }
  };

  const removeImage = (index) => {
    setCargoDetails(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const calculateEstimate = () => {
    // Dummy calculation based on distance and transport mode
    const baseCost = {
      'bike': 500,
      'car': 1500,
      'small-truck': 5000,
      'medium-truck': 15000,
      'large-truck': 35000,
      'heavy-haul': 100000
    }[transportMode] || 0;
    
    // Add 10% for fragile items
    const fragileAdd = cargoDetails.fragile ? baseCost * 0.1 : 0;
    
    // Add 15% for special handling
    const handlingAdd = cargoDetails.requiresHandling ? baseCost * 0.15 : 0;
    
    const total = Math.round(baseCost + fragileAdd + handlingAdd);
    setEstimatedCost(total);
    return total;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });

    toast.promise(promise, {
      loading: 'Posting your cargo...',
      success: () => {
        setIsSubmitting(false);
        navigate(`/find-drivers/123`);
        return 'Cargo posted successfully! Drivers are being notified';
      },
      error: () => {
        setIsSubmitting(false);
        return 'Failed to post cargo. Please try again.';
      }
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CargoTypeSelector 
            cargoType={cargoType} 
            setCargoType={setCargoType} 
          />
        );
      case 2:
        return (
          <LocationPicker 
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            onLocationSelect={handleLocationSelect}
          />
        );
      case 3:
        return (
          <CargoDetailsForm 
            cargoDetails={cargoDetails}
            onDetailsChange={handleCargoDetailsChange}
            onImageUpload={handleImageUpload}
            removeImage={removeImage}
          />
        );
      case 4:
        return (
          <TransportModeSelector 
            transportModes={transportModes}
            selectedMode={transportMode}
            setSelectedMode={setTransportMode}
          />
        );
      case 5:
        return (
          <CargoPreview 
            cargoType={cargoType}
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            cargoDetails={cargoDetails}
            transportMode={transportModes.find(mode => mode.id === transportMode)?.name || ''}
            estimatedCost={estimatedCost || calculateEstimate()}
          />
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (step === 2 && (!pickupLocation || !dropoffLocation)) {
      toast.error('Please select both pickup and dropoff locations');
      return;
    }
    
    if (step === 3 && (!cargoDetails.title || !cargoDetails.weight)) {
      toast.error('Please fill in all required cargo details');
      return;
    }
    
    if (step === 4 && !transportMode) {
      toast.error('Please select a transport mode');
      return;
    }
    
    if (step === 5) {
      handleSubmit();
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="px-6 py-4 bg-blue-50">
            <div className="flex justify-between mb-3 text-sm text-gray-600">
              <span>Cargo</span>-
              <span>Locations</span>-
              <span>Details</span>-
              <span>Transport</span>-
              <span>Review</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                initial={{ width: `${(step-1) * 25}%` }}
                animate={{ width: `${(step-1) * 25}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Step Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {step === 1 && 'Select Cargo Type'}
                {step === 2 && 'Set Locations'}
                {step === 3 && 'Cargo Details'}
                {step === 4 && 'Select Transport Mode'}
                {step === 5 && 'Review & Post'}
              </h2>
              <div className="text-gray-500">Step {step} of 5</div>
            </div>
            
            {renderStepContent()}
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
              >
                Back
              </Button>
              
              <Button 
                onClick={nextStep}
                disabled={(step === 4 && !transportMode) || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader className="animate-spin mr-2" />
                ) : step === 5 ? (
                  <>
                    Post Cargo & Find Drivers
                    <ArrowRight className="ml-2" size={16} />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PostCargo;