// src/pages/EnterpriseRegistration.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Building, User, Mail, 
  Smartphone, ArrowLeft, Check, Loader, 
  MapPin, CreditCard, FileText, Users 
} from 'lucide-react';
import Header from '../nav/nav';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const EnterpriseRegistration = () => {
  const [step, setStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    regNumber: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    website: ''
  });
  const [fleetInfo, setFleetInfo] = useState({
    vehicles: [
      { type: 'medium-truck', count: 0 },
      { type: 'large-truck', count: 0 },
      { type: 'heavy-haul', count: 0 }
    ]
  });
  const [documents, setDocuments] = useState({
    companyReg: null,
    taxCert: null,
    fleetInsurance: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vehicleTypes = {
    'medium-truck': 'Medium Trucks (5-10 tons)',
    'large-truck': 'Large Trucks (10-20 tons)',
    'heavy-haul': 'Heavy Haulers (20+ tons)'
  };

  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFleetCountChange = (type, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setFleetInfo(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(v => 
        v.type === type ? { ...v, count: newValue } : v
      )
    }));
  };

  const handleDocumentUpload = (docType, file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setDocuments(prev => ({ ...prev, [docType]: url }));
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
      loading: 'Submitting your registration...',
      success: () => {
        setIsSubmitting(false);
        setStep(4);
        return 'Registration submitted! Our team will contact you soon';
      },
      error: () => {
        setIsSubmitting(false);
        return 'Failed to submit registration. Please try again.';
      }
    });
  };



  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyInfo.name}
                    onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ABC Logistics Ltd"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={companyInfo.regNumber}
                    onChange={(e) => handleCompanyInfoChange('regNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="CR12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={companyInfo.contactPerson}
                    onChange={(e) => handleCompanyInfoChange('contactPerson', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={companyInfo.phone}
                    onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+263 77 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={companyInfo.website}
                    onChange={(e) => handleCompanyInfoChange('website', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://company.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={companyInfo.address}
                    onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Enterprise Rd, Harare"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Fleet Information</h3>
              <p className="text-gray-600 mb-6">Tell us about the vehicles in your fleet that will be available on DeliverEx.</p>
              
              <div className="space-y-6">
                {fleetInfo.vehicles.map((vehicle, index) => (
                  <div key={vehicle.type} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-gray-200 rounded-lg">
                    <div className="mb-4 md:mb-0">
                      <h4 className="font-medium text-gray-800">{vehicleTypes[vehicle.type]}</h4>
                      <p className="text-gray-600">Capacity: {vehicle.type === 'medium-truck' ? '5-10 tons' : 
                                                      vehicle.type === 'large-truck' ? '10-20 tons' : '20+ tons'}</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onClick={() => handleFleetCountChange(vehicle.type, vehicle.count - 1)}
                      >
                        <span className="text-xl">-</span>
                      </button>
                      <input
                        type="number"
                        value={vehicle.count}
                        onChange={(e) => handleFleetCountChange(vehicle.type, e.target.value)}
                        className="w-16 text-center mx-2 border-0 p-0 text-lg font-medium focus:ring-0"
                      />
                      <button 
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onClick={() => handleFleetCountChange(vehicle.type, vehicle.count + 1)}
                      >
                        <span className="text-xl">+</span>
                      </button>
                    </div>
                  </div>
                ))}
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
                  <FileText size={16} className="text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    For enterprise verification, please upload the following documents.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DocumentUpload 
                title="Company Registration Certificate"
                description="Clear photo or scan of your company registration"
                value={documents.companyReg}
                onChange={(file) => handleDocumentUpload('companyReg', file)}
              />
              
              <DocumentUpload 
                title="Tax Clearance Certificate"
                description="Clear photo or scan of your tax clearance certificate"
                value={documents.taxCert}
                onChange={(file) => handleDocumentUpload('taxCert', file)}
              />
              
              <DocumentUpload 
                title="Fleet Insurance Certificate"
                description="Clear photo or scan of your fleet insurance"
                value={documents.fleetInsurance}
                onChange={(file) => handleDocumentUpload('fleetInsurance', file)}
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
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Registration Submitted!</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Your enterprise registration has been submitted for verification. Our team will review your documents and contact you within 2 business days to complete your account setup.
            </p>
            <Button onClick={() => setStep(1)}>Back to Dashboard</Button>
          </div>
        );
      default:
        return null;
    }
  };

  const nextStep = () => {
    if (step === 1 && (!companyInfo.name || !companyInfo.regNumber)) {
      toast.error('Please fill in all required company details');
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
              className={step === 4 ? 'invisible' : ''}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold text-gray-800">
                {step !== 4 ? 'Enterprise Registration' : 'Registration Complete'}
              </h1>
            </div>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
          
          <div className="p-6">
            {step !== 4 && (
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {step === 1 && 'Company Details'}
                    {step === 2 && 'Fleet Information'}
                    {step === 3 && 'Document Verification'}
                  </h2>
                  <p className="text-gray-600">
                    {step === 1 && 'Enter your company information'}
                    {step === 2 && 'Tell us about your fleet'}
                    {step === 3 && 'Upload required documents'}
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
                  disabled={isSubmitting}
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
                      <ArrowLeft className="ml-2 transform rotate-180" size={16} />
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

// Reusing DocumentUpload component from DriverRegistration
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
            accept="image/*, .pdf"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
};

export default EnterpriseRegistration;