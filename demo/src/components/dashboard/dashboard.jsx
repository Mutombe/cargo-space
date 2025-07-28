// src/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, Truck, MapPin, Clock, 
  Plus, ArrowRight, BarChart2, Bell 
} from 'lucide-react';
import Header from '../nav/nav';
import CargoCard from './cargoCard';
import DriverCard from './driverCard';
import { Button } from '../ui/button';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Dummy data for the dashboard
  const recentShipments = [
    {
      id: '123',
      title: 'Furniture Delivery',
      from: 'Harare CBD',
      to: 'Chitungwiza',
      status: 'in-transit',
      date: '2023-06-15',
      driver: 'Tinashe Chikomo',
      price: 'ZWL 4,500'
    },
    {
      id: '124',
      title: 'Office Supplies',
      from: 'Mutare',
      to: 'Harare',
      status: 'delivered',
      date: '2023-06-10',
      driver: 'Fleet Logistics',
      price: 'ZWL 12,000'
    },
    {
      id: '125',
      title: 'Agricultural Equipment',
      from: 'Gweru',
      to: 'Bulawayo',
      status: 'pending',
      date: '2023-06-05',
      driver: null,
      price: 'ZWL 28,000'
    }
  ];

  const availableDrivers = [
    {
      id: '1',
      name: 'Tinashe Chikomo',
      rating: 4.7,
      vehicle: 'Toyota Hilux',
      capacity: '1.5 Tons',
      reviews: 124,
      distance: '3.2 km',
      price: 'ZWL 4,500'
    },
    {
      id: '2',
      name: 'Takunda Moyo',
      rating: 4.5,
      vehicle: 'Honda XR150',
      reviews: 87,
      capacity: '50 kg',
      distance: '1.8 km',
      price: 'ZWL 1,200'
    },
    {
      id: '3',
      name: 'Harare Hauliers',
      rating: 4.8,
      vehicle: 'MAN TGS',
      reviews: 65,
      capacity: '15 Tons',
      distance: '7.2 km',
      price: 'ZWL 18,500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-gray-600">Here's what's happening with your shipments today</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 md:mt-0"
          >
            <Button
            onClick={() => navigate('/post-cargo')}
            >
              <Plus className="mr-2" size={16} />
              New Shipment
            </Button>
          </motion.div>
        </div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Package className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">12</h3>
                <p className="text-gray-600">Total Shipments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Truck className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">8</h3>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <BarChart2 className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">ZWL 42,500</h3>
                <p className="text-gray-600">Total Spent</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Shipments */}
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Recent Shipments</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <div className="divide-y divide-gray-200">
            {recentShipments.map((shipment) => (
              <CargoCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </motion.div>

        {/* Available Drivers */}
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Available Drivers Near You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {availableDrivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200 text-center">
            <Button variant="outline" className="flex items-center mx-auto">
              See More Drivers
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;