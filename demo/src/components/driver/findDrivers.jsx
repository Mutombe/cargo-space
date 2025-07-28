import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Clock,
  MapPin,
  DollarSign,
  Star,
  MessageSquare,
  Phone,
  X,
  Check,
  Loader,
  Package,
  User,
  CreditCard,
} from "lucide-react";
import Header from "../nav/nav";
import NegotiationModal from "../negotiation/negotiationModal";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Map from "../ui/Map";

// Moved DriverCard inside the same file to fix the button issue
const DriverCard = ({ driver, onAccept, onNegotiate }) => {
  const getDriverImage = (driverId) => {
    const driverImages = {
      1: "/driver1.webp",
      2: "/driver2.png",
      3: "driver3.webp",
      4: "driver4.jpg",
    };

    // Return image based on driver ID, or use a default if not found
    return driverImages[driverId] || driverImages[1];
  };

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
              e.target.src =
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
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
            <span className="text-sm text-gray-500 ml-1">
              ({driver.reviews})
            </span>
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
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-gray-700">{driver.capacity} capacity</span>
        </div>
        <div className="flex items-center">
          <MapPin size={16} className="text-gray-500 mr-2" />
          <span className="text-gray-700">{driver.distance} away</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="font-bold text-gray-800 text-lg">{driver.price}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onNegotiate}>
            Negotiate
          </Button>
          <Button size="sm" onClick={onAccept}>
            Accept
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const FindDrivers = () => {
  const { cargoId } = useParams();
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: drivers, 2: negotiation, 3: payment, 4: tracking
  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreedPrice, setAgreedPrice] = useState(null);

  // Define pickup and dropoff locations
  const pickupLocation = [-17.824858, 31.053028];
  const dropoffLocation = [-17.832123, 31.042345];
  const [driverLocation, setDriverLocation] = useState(pickupLocation);

  // Dummy driver data
  const dummyDrivers = [
    {
      id: "1",
      name: "Tinashe Chikomo",
      rating: 4.7,
      reviews: 124,
      vehicle: "Toyota Hilux (Small Truck)",
      capacity: "1.5 Tons",
      distance: "3.2 km",
      eta: "15 min",
      price: "ZWL 4,500",
      profilePic: null,
      location: { lat: pickupLocation[0], lng: pickupLocation[1] },
      status: "available",
      offers: [
        { id: "1", price: "ZWL 4,200", message: "I can pick up now" },
        { id: "2", price: "ZWL 3,800", message: "I have space available" },
      ],
    },
    {
      id: "2",
      name: "Fleet Logistics",
      rating: 4.9,
      reviews: 287,
      vehicle: "Isuzu NQR (Medium Truck)",
      capacity: "5 Tons",
      distance: "5.7 km",
      eta: "25 min",
      price: "ZWL 8,200",
      profilePic: null,
      location: { lat: -17.812345, lng: 31.048765 },
      status: "available",
      offers: [
        { id: "1", price: "ZWL 7,800", message: "Available immediately" },
      ],
    },
    {
      id: "3",
      name: "Takunda Moyo",
      rating: 4.5,
      reviews: 86,
      vehicle: "Honda XR150 (Bike)",
      capacity: "50 kg",
      distance: "1.8 km",
      eta: "8 min",
      price: "ZWL 1,200",
      profilePic: null,
      location: { lat: -17.830123, lng: 31.042345 },
      status: "available",
    },
    {
      id: "4",
      name: "Harare Hauliers",
      rating: 4.8,
      reviews: 342,
      vehicle: "MAN TGS (Large Truck)",
      capacity: "15 Tons",
      distance: "7.2 km",
      eta: "30 min",
      price: "ZWL 18,500",
      profilePic: null,
      location: { lat: -17.801234, lng: 31.065432 },
      status: "available",
      offers: [
        {
          id: "1",
          price: "ZWL 17,000",
          message: "Special rate for regular customers",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate API call to get drivers
    setTimeout(() => {
      setDrivers(dummyDrivers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Simulate driver movement when tracking starts
  useEffect(() => {
    if (activeStep === 4) {
      const interval = setInterval(() => {
        setDriverLocation((prev) => {
          // Move driver closer to destination
          const latDiff = dropoffLocation[0] - pickupLocation[0];
          const lngDiff = dropoffLocation[1] - pickupLocation[1];
          const stepSize = 0.001;

          const newLat = prev[0] + latDiff * stepSize;
          const newLng = prev[1] + lngDiff * stepSize;

          // Stop when close to destination
          if (
            Math.abs(newLat - dropoffLocation[0]) < 0.001 &&
            Math.abs(newLng - dropoffLocation[1]) < 0.001
          ) {
            clearInterval(interval);
            return dropoffLocation;
          }

          return [newLat, newLng];
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [activeStep]);

  const handleAccept = (driver) => {
    setSelectedDriver(driver);
    setAgreedPrice(parseInt(driver.price.replace(/[^\d]/g, "")));
    setActiveStep(3); // Skip negotiation, go directly to payment
  };

  const handleNegotiate = (driver) => {
    setSelectedDriver(driver);
    setShowNegotiation(true);
  };

  const handleOfferSubmit = (offer) => {
    setShowNegotiation(false);
    setAgreedPrice(parseInt(offer.price.replace(/[^\d]/g, "")));
    setActiveStep(3); // Move to payment step
    toast.success(`Offer of ${offer.price} accepted!`);
  };

  const handlePaymentSubmit = () => {
    setIsConfirming(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsConfirming(false);
      setActiveStep(4); // Move to tracking
      toast.success("Payment processed successfully!");
    }, 1500);
  };

  const startTracking = () => {
    navigate(`/tracking/${cargoId}`);
  };

  const renderDriverSelection = () => (
    <div className="md:w-1/3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6 mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Available Drivers
          </h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {drivers.length} drivers
          </span>
        </div>

        <p className="text-gray-600 mb-6">
          Drivers have been notified about your shipment. They can accept
          immediately or negotiate the price.
        </p>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {drivers.map((driver) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DriverCard
                    driver={driver}
                    onAccept={() => handleAccept(driver)}
                    onNegotiate={() => handleNegotiate(driver)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/post-cargo")}
      >
        Cancel Shipment
      </Button>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="md:w-2/3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Confirm Booking</h2>
            <p className="text-gray-600">Review details and make payment</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Step 3 of 4
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Driver Details</h3>
            <div className="flex items-center mb-4">
                      <div className="relative w-16 h-16 mr-4">
          <img 
            src='driver1.webp' 
            alt='Driver profile'
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
                <h4 className="font-bold">{selectedDriver?.name}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          i < Math.floor(selectedDriver?.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">
                    ({selectedDriver?.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-gray-500 mr-2" />
                <span>{selectedDriver?.vehicle}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span>Estimated arrival: {selectedDriver?.eta}</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Payment Details</h3>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Agreed Price</span>
                <span className="font-bold">
                  ZWL {agreedPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Fee</span>
                <span>ZWL {(agreedPrice * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>ZWL {(agreedPrice * 1.1).toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Payment Method</h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`p-3 border rounded-lg flex flex-col items-center ${
                    paymentMethod === "ecocash"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("ecocash")}
                >
                  <div className="bg-purple-100 p-2 rounded-lg mb-2">
                    <CreditCard className="text-purple-600" size={20} />
                  </div>
                  <span className="text-sm">EcoCash</span>
                </button>
                <button
                  className={`p-3 border rounded-lg flex flex-col items-center ${
                    paymentMethod === "visa"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("visa")}
                >
                  <div className="bg-blue-100 p-2 rounded-lg mb-2">
                    <CreditCard className="text-blue-600" size={20} />
                  </div>
                  <span className="text-sm">Visa</span>
                </button>
                <button
                  className={`p-3 border rounded-lg flex flex-col items-center ${
                    paymentMethod === "cash"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <div className="bg-green-100 p-2 rounded-lg mb-2">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <span className="text-sm">Cash</span>
                </button>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handlePaymentSubmit}
              disabled={!paymentMethod || isConfirming}
            >
              {isConfirming ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderTrackingStep = () => (
    <div className="md:w-2/3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600">Your driver is on the way</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Step 4 of 4
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Check className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-800">
                Payment Successful
              </h3>
              <p className="text-green-700">
                ZWL {(agreedPrice * 1.1).toLocaleString()} paid via{" "}
                {paymentMethod}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Driver Information</h3>
            <div className="flex items-center mb-4">
                      <div className="relative w-16 h-16 mr-4">
          <img 
            src='driver1.webp'
            alt='Driver profile'
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
                <h4 className="font-bold">{selectedDriver?.name}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
                          i < Math.floor(selectedDriver?.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">
                    ({selectedDriver?.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-gray-500 mr-2" />
                <span>{selectedDriver?.vehicle}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span>Estimated arrival: {selectedDriver?.eta}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                <span>+263 77 123 4567</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Cargo Details</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Package className="text-blue-500 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800">
                    Office Furniture
                  </h4>
                  <p className="text-gray-600">800kg, Requires handling</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-green-500 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800">Pickup Location</h4>
                  <p className="text-gray-600">123 Samora Machel Ave, Harare</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-red-500 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-gray-800">
                    Drop-off Location
                  </h4>
                  <p className="text-gray-600">
                    45 Robert Mugabe Rd, Chitungwiza
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button className="w-full md:w-auto" onClick={startTracking}>
            Start Tracking Delivery
          </Button>
          <p className="text-gray-500 mt-2">
            You'll be able to see real-time location of your driver
          </p>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {activeStep === 1 && renderDriverSelection()}

            {/* Map View - Shown in all steps */}
            <div className="md:w-2/3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden h-[500px]"
              >
                <Map
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  drivers={drivers}
                  trackingDriver={
                    activeStep === 4 && selectedDriver
                      ? {
                          id: selectedDriver.id,
                          name: selectedDriver.name,
                          location: {
                            lat: driverLocation[0],
                            lng: driverLocation[1],
                          },
                          eta: selectedDriver.eta,
                        }
                      : null
                  }
                />
              </motion.div>

              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-6 mt-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Your Shipment Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <MapPin className="text-blue-500 mt-1 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Pickup Location
                        </h3>
                        <p className="text-gray-600">
                          123 Samora Machel Ave, Harare
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="text-green-500 mt-1 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Drop-off Location
                        </h3>
                        <p className="text-gray-600">
                          45 Robert Mugabe Rd, Chitungwiza
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Truck className="text-purple-500 mt-1 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Cargo Type
                        </h3>
                        <p className="text-gray-600">Furniture (800kg)</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <DollarSign
                        className="text-yellow-500 mt-1 mr-3"
                        size={20}
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Estimated Cost
                        </h3>
                        <p className="text-gray-600">ZWL 5,200</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && renderPaymentStep()}
              {activeStep === 4 && renderTrackingStep()}
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Modal */}
      <AnimatePresence>
        {showNegotiation && selectedDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <NegotiationModal
              driver={selectedDriver}
              onClose={() => setShowNegotiation(false)}
              onSubmit={handleOfferSubmit}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FindDrivers;
