// src/pages/Profile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Smartphone, MapPin, 
  Truck, CreditCard, Shield, LogOut 
} from 'lucide-react';
import Header from '../nav/nav';
import { Button } from '../ui/button';
import { useAuth } from '../context/authContext';
import { GoPackage } from "react-icons/go";

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dummy data
  const userData = {
    name: user?.name || "Tafadzwa Chiwara",
    email: user?.email || "tafadzwa@example.com",
    phone: user?.phone || "+263 77 123 4567",
    address: "123 Samora Machel Ave, Harare, Zimbabwe",
    userType: user?.userType || "shipper",
    profilePic: null
  };
  
  const paymentMethods = [
    { id: '1', type: 'ecocash', last4: '1234' },
    { id: '2', type: 'visa', last4: '5678' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 md:mr-6 mb-4 md:mb-0" />
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-blue-100">{userData.email}</p>
                  <div className="mt-2 inline-flex items-center bg-blue-700 px-3 py-1 rounded-full text-sm">
                    {userData.userType === 'shipper' ? (
                      <><GoPackage className="mr-1" size={16} /> Shipper</>
                    ) : (
                      <><Truck className="mr-1" size={16} /> Driver</>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                <button
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'profile' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'payment' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  Payment Methods
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'security' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  Security
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            defaultValue={userData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            defaultValue={userData.phone}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            defaultValue={userData.address}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {userData.userType === 'driver' && (
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <Truck className="text-green-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Vehicle Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Make</label>
                            <input
                              type="text"
                              defaultValue="Toyota"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
                            <input
                              type="text"
                              defaultValue="Hilux"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                            <input
                              type="text"
                              defaultValue="ABC 1234"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                            <input
                              type="text"
                              defaultValue="1.5 tons"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-8">
                    <Button>Save Changes</Button>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'payment' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <CreditCard className="text-purple-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h3>
                      
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-4" />
                              <div>
                                <h4 className="font-medium text-gray-800">
                                  {method.type === 'ecocash' ? 'EcoCash' : 'Visa'} •••• {method.last4}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {method.type === 'ecocash' ? 'Mobile Money' : 'Credit Card'}
                                </p>
                              </div>
                            </div>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="mt-6">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <Shield className="text-red-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Security Settings</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Change Password</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                              <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                              <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                              <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <Button className="mt-4">Update Password</Button>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h4>
                          <p className="text-gray-600 mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                          <div className="flex items-center">
                            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input type="checkbox" id="2fa-toggle" className="sr-only" />
                              <div className="block w-10 h-6 bg-gray-300 rounded-full"></div>
                              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                            </div>
                            <label htmlFor="2fa-toggle" className="text-gray-700">Enable 2FA</label>
                          </div>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2">Log Out of All Sessions</h4>
                          <p className="text-gray-600 mb-4">For security, you can log out of all other active sessions on other devices.</p>
                          <Button variant="outline">Log Out Everywhere Else</Button>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2">Delete Account</h4>
                          <p className="text-gray-600 mb-4">Permanently delete your account and all associated data. This action is irreversible.</p>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Button 
              variant="outline" 
              className="flex items-center text-red-600 border-red-300 hover:bg-red-50 w-full"
              onClick={logout}
            >
              <LogOut className="mr-2" size={16} />
              Log Out
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;