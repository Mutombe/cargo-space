import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Check, X, Truck, 
  Package, DollarSign, User, Clock 
} from 'lucide-react';
import Header from '../nav/nav';
import { Button } from '../ui/button';
import { useAuth } from '../context/authContext';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'new_driver',
      title: 'Driver accepted your shipment',
      description: 'Tinashe Chikomo has accepted your furniture delivery request',
      time: '10 minutes ago',
      read: false,
      icon: <Truck size={20} className="text-blue-500" />
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment successful',
      description: 'Your payment of ZWL 4,500 was processed successfully',
      time: '1 hour ago',
      read: false,
      icon: <DollarSign size={20} className="text-green-500" />
    },
    {
      id: '3',
      type: 'delivery',
      title: 'Cargo picked up',
      description: 'Your office supplies shipment has been picked up',
      time: '2 hours ago',
      read: true,
      icon: <Package size={20} className="text-purple-500" />
    },
    {
      id: '4',
      type: 'new_message',
      title: 'New message from driver',
      description: 'Takunda Moyo: I\'m running 15 minutes late',
      time: '4 hours ago',
      read: true,
      icon: <User size={20} className="text-yellow-500" />
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Shipment reminder',
      description: 'Your shipment to Bulawayo is scheduled for tomorrow',
      time: '1 day ago',
      read: true,
      icon: <Clock size={20} className="text-orange-500" />
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600">You have {notifications.filter(n => !n.read).length} unread notifications</p>
            </div>
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 flex ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="mr-4 mt-1">
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{notification.title}</h3>
                  <p className="text-gray-600">{notification.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
                <div className="flex items-start space-x-2">
                  {!notification.read && (
                    <button 
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check size={16} className="text-green-500" />
                    </button>
                  )}
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X size={16} className="text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {notifications.length === 0 && (
              <div className="p-12 text-center">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
                <p className="text-gray-500">We'll notify you when something arrives</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;