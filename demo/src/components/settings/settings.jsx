import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Smartphone, Globe, 
  Bell, Lock, CreditCard, LogOut 
} from 'lucide-react';
import Header from '../nav/nav';
import { Button } from '../ui/button';
import Avatar from '../ui/Avatar';
import { useAuth } from '../context/authContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const settingsSections = [
    {
      id: 'profile',
      icon: <User size={18} />,
      title: 'Profile'
    },
    {
      id: 'account',
      icon: <Mail size={18} />,
      title: 'Account'
    },
    {
      id: 'notifications',
      icon: <Bell size={18} />,
      title: 'Notifications'
    },
    {
      id: 'security',
      icon: <Lock size={18} />,
      title: 'Security'
    },
    {
      id: 'payment',
      icon: <CreditCard size={18} />,
      title: 'Payment'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row"
        >
          <div className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-6">
                <Avatar name={user?.name || 'User'} size="15" />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{user?.name || 'User'}</h3>
                  <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <nav>
                <ul className="space-y-1">
                  {settingsSections.map((section) => (
                    <li key={section.id}>
                      <button 
                        className={`w-full text-left flex items-center px-3 py-2 rounded-lg ${
                          activeTab === section.id 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveTab(section.id)}
                      >
                        <span className="mr-3">{section.icon}</span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2" size={16} />
                    Log Out
                  </Button>
                </div>
              </nav>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {settingsSections.find(s => s.id === activeTab)?.title}
              </h1>
              
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar name={user?.name || 'User'} size="16" className="mb-4" />
                    <Button variant="outline">Change Photo</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+263 77 123 4567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        defaultValue="Harare, Zimbabwe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Save Profile</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Shipment Updates</h4>
                          <p className="text-sm text-gray-600">Notify me about shipment status changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Promotional Offers</h4>
                          <p className="text-sm text-gray-600">Receive special offers and discounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Password & Security</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Change Password</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Current Password</label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">New Password</label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <Button className="mt-4">Update Password</Button>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account
                          </p>
                          <Button variant="outline">Enable</Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-800 mb-2">Active Sessions</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Chrome on Windows</p>
                              <p className="text-sm text-gray-600">Harare, Zimbabwe • Now</p>
                            </div>
                            <Button variant="destructive" size="sm">Logout</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;