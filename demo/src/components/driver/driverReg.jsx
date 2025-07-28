// src/pages/DriverRegistration.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  User,
  CreditCard,
  Smartphone,
  ArrowLeft,
  Check,
  Loader,
  Car,
  Bike,
  MapPin,
  Info,
  BadgeCheck,
} from "lucide-react";
import Header from "../nav/nav";
import { Button } from "../ui/button";
import { toast } from "sonner";
import VehicleTypeSelector from "../vehicle/vehicleTypeSelector";

const DriverRegistration = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [driverDetails, setDriverDetails] = useState({
    fullName: "",
    idNumber: "",
    licenseNumber: "",
    phone: "",
    email: "",
  });
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    capacity: "",
    color: "",
  });
  const [documents, setDocuments] = useState({
    licenseFront: null,
    licenseBack: null,
    vehicleRegistration: null,
    insurance: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vehicleTypes = [
    { id: "bike", name: "Motorcycle", icon: <Bike />, capacity: "Up to 50kg" },
    { id: "car", name: "Car/SUV", icon: <Car />, capacity: "Up to 500kg" },
    {
      id: "small-truck",
      name: "Small Truck",
      icon: <Truck />,
      capacity: "Up to 1.5 tons",
    },
    {
      id: "medium-truck",
      name: "Medium Truck",
      icon: <Truck />,
      capacity: "Up to 5 tons",
    },
    {
      id: "large-truck",
      name: "Large Truck",
      icon: <Truck />,
      capacity: "Up to 20 tons",
    },
    {
      id: "heavy-haul",
      name: "Heavy Hauler",
      icon: <Truck />,
      capacity: "20+ tons",
    },
  ];

  const handleDriverDetailsChange = (field, value) => {
    setDriverDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleVehicleDetailsChange = (field, value) => {
    setVehicleDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (docType, file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setDocuments((prev) => ({ ...prev, [docType]: url }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    toast.promise(promise, {
      loading: "Submitting your registration...",
      success: () => {
        setIsSubmitting(false);
        setStep(4);
        return "Registration submitted! Your account is under review";
      },
      error: () => {
        setIsSubmitting(false);
        return "Failed to submit registration. Please try again.";
      },
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <VehicleTypeSelector
            vehicleTypes={vehicleTypes}
            selectedType={vehicleType}
            setSelectedType={setVehicleType}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Driver Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={driverDetails.fullName}
                    onChange={(e) =>
                      handleDriverDetailsChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    National ID Number
                  </label>
                  <input
                    type="text"
                    value={driverDetails.idNumber}
                    onChange={(e) =>
                      handleDriverDetailsChange("idNumber", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="00-123456X00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driver's License Number
                  </label>
                  <input
                    type="text"
                    value={driverDetails.licenseNumber}
                    onChange={(e) =>
                      handleDriverDetailsChange("licenseNumber", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="DL-123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={driverDetails.phone}
                    onChange={(e) =>
                      handleDriverDetailsChange("phone", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+263 77 123 4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={driverDetails.email}
                    onChange={(e) =>
                      handleDriverDetailsChange("email", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Make
                  </label>
                  <input
                    type="text"
                    value={vehicleDetails.make}
                    onChange={(e) =>
                      handleVehicleDetailsChange("make", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Toyota"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    value={vehicleDetails.model}
                    onChange={(e) =>
                      handleVehicleDetailsChange("model", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hilux"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    value={vehicleDetails.year}
                    onChange={(e) =>
                      handleVehicleDetailsChange("year", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2020"
                    min="1990"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Plate
                  </label>
                  <input
                    type="text"
                    value={vehicleDetails.licensePlate}
                    onChange={(e) =>
                      handleVehicleDetailsChange("licensePlate", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ABC 1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="text"
                    value={vehicleDetails.capacity}
                    onChange={(e) =>
                      handleVehicleDetailsChange("capacity", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1.5 tons"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={vehicleDetails.color}
                    onChange={(e) =>
                      handleVehicleDetailsChange("color", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="White"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    For security and verification purposes, please upload clear
                    photos of the following documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DocumentUpload
                title="Driver's License (Front)"
                description="Clear photo of the front of your driver's license"
                value={documents.licenseFront}
                onChange={(file) => handleDocumentUpload("licenseFront", file)}
              />

              <DocumentUpload
                title="Driver's License (Back)"
                description="Clear photo of the back of your driver's license"
                value={documents.licenseBack}
                onChange={(file) => handleDocumentUpload("licenseBack", file)}
              />

              <DocumentUpload
                title="Vehicle Registration"
                description="Clear photo of your vehicle registration document"
                value={documents.vehicleRegistration}
                onChange={(file) =>
                  handleDocumentUpload("vehicleRegistration", file)
                }
              />

              <DocumentUpload
                title="Insurance Certificate"
                description="Clear photo of your current insurance certificate"
                value={documents.insurance}
                onChange={(file) => handleDocumentUpload("insurance", file)}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Registration Submitted!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Your driver registration has been submitted for verification. Our
              team will review your documents and notify you once your account
              is approved. This usually takes 1-2 business days.
            </p>
            <Button onClick={() => setStep(1)}>Back to Dashboard</Button>
          </div>
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (step === 1 && !vehicleType) {
      toast.error("Please select a vehicle type to continue");
      return;
    }

    if (step === 2 && (!driverDetails.fullName || !driverDetails.phone)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (
      step === 3 &&
      (!documents.licenseFront || !documents.vehicleRegistration)
    ) {
      toast.error(
        "Please upload at least your driver's license and vehicle registration"
      );
      return;
    }

    if (step === 3) {
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
          <div className="px-6 py-4 bg-blue-50 flex items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1 || step === 4}
              className={step === 4 ? "invisible" : ""}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-800">
                {step !== 4 ? "Driver Registration" : "Registration Complete"}
              </h1>
            </div>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>

          <div className="p-6">
            {step !== 4 && (
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {step === 1 && "Vehicle Type"}
                    {step === 2 && "Driver & Vehicle Details"}
                    {step === 3 && "Document Verification"}
                  </h2>
                  <p className="text-gray-600">
                    {step === 1 && "Select the type of vehicle you operate"}
                    {step === 2 &&
                      "Enter your personal and vehicle information"}
                    {step === 3 && "Upload required documents for verification"}
                  </p>
                </div>
                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Step {step} of 3
                </div>
              </div>
            )}

            {renderStepContent()}

            {step !== 4 && (
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !vehicleType) ||
                    (step === 2 &&
                      (!driverDetails.fullName || !driverDetails.phone)) ||
                    isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin mr-2" />
                  ) : step === 3 ? (
                    <>
                      Submit Registration
                      <Check className="ml-2" size={16} />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowLeft
                        className="ml-2 transform rotate-180"
                        size={16}
                      />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Document Upload Component
const DocumentUpload = ({ title, description, value, onChange }) => {
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
      <div className="mb-3 text-gray-400">
        <CreditCard size={40} className="mx-auto" />
      </div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>

      {value ? (
        <div className="mt-4">
          <img
            src={value}
            alt="Uploaded document"
            className="mx-auto max-h-40 rounded border"
          />
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => onChange(null)}
          >
            Change
          </Button>
        </div>
      ) : (
        <label className="inline-block cursor-pointer">
          <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Upload Document
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default DriverRegistration;
