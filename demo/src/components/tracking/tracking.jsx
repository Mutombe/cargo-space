import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Truck, MapPin, Clock, Package, 
  ArrowLeft, Phone, MessageSquare, Check,
  Star, User, CreditCard, ChevronRight,DollarSign
} from 'lucide-react';
import Header from '../nav/nav';
import Map from '../ui/Map';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const Tracking = () => {
  const { cargoId } = useParams();
  const navigate = useNavigate();
  const [driverLocation, setDriverLocation] = useState({
    lat: -17.824858,
    lng: 31.053028
  });
  const [deliveryStatus, setDeliveryStatus] = useState('in-transit'); 
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isDelivered, setIsDelivered] = useState(false);
  
  // Dummy shipment data
  const shipment = {
    id: cargoId,
    title: 'Office Furniture',
    from: '123 Samora Machel Ave, Harare',
    to: '45 Robert Mugabe Rd, Chitungwiza',
    driver: {
      name: 'Tinashe Chikomo',
      phone: '+263 77 123 4567',
      vehicle: 'Toyota Hilux (Small Truck)',
      rating: 4.7,
      reviews: 124
    },
    status: deliveryStatus,
    startedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: 'ZWL 4,500',
    agreedPrice: 'ZWL 5,000'
  };

  // Simulate delivery progress
  const progress = deliveryStatus === 'in-transit' ? 60 : 
                  deliveryStatus === 'arriving' ? 90 : 
                  100;

  // Simulate driver movement
  useEffect(() => {
    if (deliveryStatus !== 'delivered') {
      const interval = setInterval(() => {
        setDriverLocation(prev => {
          // Calculate next position towards destination
          const destination = { lat: -17.832123, lng: 31.042345 };
          const latDiff = destination.lat - prev.lat;
          const lngDiff = destination.lng - prev.lng;
          const progress = deliveryStatus === 'arriving' ? 0.0005 : 0.0002;
          
          const newLat = prev.lat + (latDiff * progress);
          const newLng = prev.lng + (lngDiff * progress);
          
          // Check if arrived
          if (Math.abs(newLat - destination.lat) < 0.0001 && 
              Math.abs(newLng - destination.lng) < 0.0001) {
            setDeliveryStatus('delivered');
            clearInterval(interval);
          } 
          // Check if close to destination
          else if (Math.abs(newLat - destination.lat) < 0.001 && 
                   Math.abs(newLng - destination.lng) < 0.001 && 
                   deliveryStatus === 'in-transit') {
            setDeliveryStatus('arriving');
          }
          
          return { lat: newLat, lng: newLng };
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [deliveryStatus]);

  const handleDeliveryComplete = () => {
    setIsDelivered(true);
    toast.success("Delivery completed successfully!");
  };

  const handleRatingSubmit = () => {
    toast.success("Thank you for your feedback!");
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        
        {!isDelivered ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Shipment Details */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 mb-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Tracking Shipment</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    shipment.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                    shipment.status === 'arriving' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {shipment.status === 'in-transit' ? 'In Transit' : 
                    shipment.status === 'arriving' ? 'Arriving Soon' : 
                    'Delivered'}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{shipment.title}</h2>
                  <p className="text-gray-600">Shipment ID: {shipment.id}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-blue-500 mt-1 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Pickup Location</h3>
                      <p className="text-gray-600">{shipment.from}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-green-500 mt-1 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Drop-off Location</h3>
                      <p className="text-gray-600">{shipment.to}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Truck className="text-purple-500 mt-1 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Driver</h3>
                      <p className="text-gray-600">{shipment.driver.name}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(shipment.driver.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">({shipment.driver.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-yellow-500 mt-1 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Estimated Delivery</h3>
                      <p className="text-gray-600">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <DollarSign className="text-green-500 mt-1 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Agreed Price</h3>
                      <p className="text-gray-600">{shipment.agreedPrice}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="font-bold text-gray-800 mb-4">Delivery Progress</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Pickup</span>
                    <span>Delivery</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Started: {new Date(shipment.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="text-xs text-gray-500">Est: {shipment.estimatedDelivery}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {progress >= 0 && <Check size={14} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Order Confirmed</h4>
                      <p className="text-sm text-gray-500">{new Date(shipment.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= 30 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {progress >= 30 && <Check size={14} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Driver En Route</h4>
                      <p className="text-sm text-gray-500">{new Date(Date.now() - 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= 60 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {progress >= 60 && <Check size={14} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Cargo Picked Up</h4>
                      <p className="text-sm text-gray-500">{new Date(Date.now() - 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= 90 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {progress >= 90 && <Check size={14} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">In Transit</h4>
                      <p className="text-sm text-gray-500">Current</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      progress >= 100 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {progress >= 100 && <Check size={14} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Delivered</h4>
                      <p className="text-sm text-gray-500">Est. {shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                {deliveryStatus === 'delivered' && (
                  <Button 
                    className="w-full mt-6"
                    onClick={handleDeliveryComplete}
                  >
                    Confirm Delivery Completion
                  </Button>
                )}
              </motion.div>
            </div>
            
            {/* Right Column - Map and Actions */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden h-[500px] mb-6"
              >
                <Map 
                  center={driverLocation} 
                  pickupLocation={[-17.824858, 31.053028]}
                  dropoffLocation={[-17.832123, 31.042345]}
                  trackingDriver={{
                    ...shipment.driver,
                    location: driverLocation,
                    eta: shipment.estimatedDelivery
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Driver: {shipment.driver.name}</h3>
                    <p className="text-gray-600">{shipment.driver.vehicle}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex items-center">
                      <MessageSquare className="mr-2" size={16} />
                      Message
                    </Button>
                    <Button className="flex items-center">
                      <Phone className="mr-2" size={16} />
                      Call Driver
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Delivery Completed!</h1>
              <p className="text-gray-600">Your cargo has been successfully delivered</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Rate Your Experience</h2>
              
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-3xl mx-1"
                    onClick={() => setRating(star)}
                  >
                    {star <= rating ? (
                      <Star className="text-yellow-400 fill-current" />
                    ) : (
                      <Star className="text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave a review (optional)</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  placeholder="How was your experience with the driver?"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                className="w-full md:w-auto"
                onClick={handleRatingSubmit}
              >
                Submit Feedback
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tracking;