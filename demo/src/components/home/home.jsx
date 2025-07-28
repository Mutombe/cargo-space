// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Truck, Package, MapPin, Clock, ShieldCheck, 
  ArrowRight, Smartphone, Globe, Users, BarChart2 
} from 'lucide-react';
import Header from '../nav/nav';
import AuthModal from '../auth/auth';
import { Button } from '../ui/button';
import { useAuth } from '../context/authContext';

const HomePage = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authType, setAuthType] = React.useState('login');

  const openAuthModal = (type) => {
    setAuthType(type);
    setAuthModalOpen(true);
  };

  const features = [
    {
      icon: <Truck className="text-blue-600" size={40} />,
      title: 'Multiple Transport Modes',
      description: 'Choose from bikes, cars, trucks of all sizes to match your cargo needs.'
    },
    {
      icon: <Package className="text-green-600" size={40} />,
      title: 'Easy Cargo Posting',
      description: 'Upload your cargo details with pictures and get instant price estimates.'
    },
    {
      icon: <MapPin className="text-yellow-600" size={40} />,
      title: 'Real-time Tracking',
      description: 'Track your shipment in real-time with our interactive map.'
    },
    {
      icon: <Clock className="text-purple-600" size={40} />,
      title: 'Fast Matching',
      description: 'Get connected with available drivers in minutes, not days.'
    },
    {
      icon: <ShieldCheck className="text-red-600" size={40} />,
      title: 'Secure Payments',
      description: 'Pay securely through our platform with multiple payment options.'
    },
    {
      icon: <Users className="text-indigo-600" size={40} />,
      title: 'Enterprise Solutions',
      description: 'Manage your entire fleet with our enterprise-grade tools.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden rounded-t-lg">
        <Header transparent={true} />
        
        <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Revolutionizing Cargo Transport in <span className="text-yellow-400">Zimbabwe</span>
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connecting shippers with reliable drivers for efficient, affordable, and secure cargo delivery.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold"
                    onClick={() => openAuthModal('register')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white hover:bg-blue-700 bg-blue-600 font-bold"
                    onClick={() => openAuthModal('login')}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </motion.div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-700 rounded-2xl p-8 shadow-2xl transform rotate-3 w-full max-w-md">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg transform -rotate-6 w-64">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Truck className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">On the way</p>
                    <p className="text-sm text-gray-600">Harare to Bulawayo</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg transform rotate-6 w-64">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Cargo Delivered</p>
                    <p className="text-sm text-gray-600">15 mins ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 rounded-b-lg">
        <div className="container mx-auto px-4 rounded-b-lg">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How DeliverEx Works
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-blue-600 mx-auto"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-t-lg">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Ship or Drive?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of shippers and drivers already using DeliverEx to move cargo across Zimbabwe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold"
                onClick={() => openAuthModal('register')}
              >
                Sign Up Now
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 rounded-b-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <Truck size={28} className="text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">Deliver<span className="text-yellow-400">Ex</span></span>
              </div>
              <p className="mt-2 max-w-xs">Efficient cargo transportation across Zimbabwe</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} DeliverEx. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        type={authType} 
      />
    </div>
  );
};

export default HomePage;