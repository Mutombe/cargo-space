import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Send, User, ArrowLeft, 
  Search, MoreVertical, Clock, Check, CheckCheck 
} from 'lucide-react';
import Header from '../nav/nav';
import { useAuth } from '../context/authContext';
import { Button } from '../ui/button';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy conversations data
  const conversations = [
    {
      id: '1',
      driver: {
        id: '1',
        name: 'Tinashe Chikomo',
        vehicle: 'Toyota Hilux',
        profilePic: null
      },
      cargo: {
        id: '123',
        title: 'Office Furniture',
        status: 'in-transit'
      },
      messages: [
        { id: '1', sender: 'driver', text: 'Hello, I can pick up your cargo in 15 minutes', time: '10:30 AM' },
        { id: '2', sender: 'user', text: 'That sounds good. See you soon!', time: '10:32 AM' },
        { id: '3', sender: 'driver', text: 'I\'m at the pickup location. Where should I meet you?', time: '10:45 AM' }
      ],
      unread: 0,
      lastActive: '10:45 AM'
    },
    {
      id: '2',
      driver: {
        id: '2',
        name: 'Takunda Moyo',
        vehicle: 'Honda XR150',
        profilePic: null
      },
      cargo: {
        id: '124',
        title: 'Documents',
        status: 'delivered'
      },
      messages: [
        { id: '1', sender: 'driver', text: 'Your documents have been delivered', time: 'Yesterday' },
        { id: '2', sender: 'user', text: 'Thank you for the quick delivery!', time: 'Yesterday' }
      ],
      unread: 0,
      lastActive: 'Yesterday'
    },
    {
      id: '3',
      driver: {
        id: '3',
        name: 'Fleet Logistics',
        vehicle: 'Isuzu NQR',
        profilePic: null
      },
      cargo: {
        id: '125',
        title: 'Agricultural Equipment',
        status: 'pending'
      },
      messages: [
        { id: '1', sender: 'driver', text: 'We can handle your agricultural equipment shipment', time: '2 days ago' }
      ],
      unread: 1,
      lastActive: '2 days ago'
    }
  ];

  const filteredConversations = conversations.filter(convo => 
    convo.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    convo.cargo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // In a real app, this would send to a backend
    const newMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedConversations = conversations.map(convo => {
      if (convo.id === activeChat.id) {
        return {
          ...convo,
          messages: [...convo.messages, newMessage],
          lastActive: 'Just now'
        };
      }
      return convo;
    });
    
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
      lastActive: 'Just now'
    });
    
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row h-[calc(100vh-150px)] bg-white rounded-xl shadow-md overflow-hidden">
          {/* Conversations List */}
          <div className={`md:w-1/3 border-r border-gray-200 ${activeChat ? 'hidden md:block' : 'w-full'}`}>
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-800">Messages</h1>
              <div className="mt-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100vh-220px)]">
              {filteredConversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className={`p-4 border-b border-gray-200 cursor-pointer flex items-center ${
                    activeChat?.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(conversation)}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-gray-800 truncate">{conversation.driver.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastActive}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.cargo.title}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.messages[conversation.messages.length - 1].text}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Chat Window */}
          <div className={`flex-1 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
            {activeChat ? (
              <div className="flex flex-col h-full w-full">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <button 
                    className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
                    onClick={() => setActiveChat(null)}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                    <div>
                      <h2 className="font-bold text-gray-800">{activeChat.driver.name}</h2>
                      <p className="text-sm text-gray-600">{activeChat.driver.vehicle}</p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {activeChat.messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white border border-gray-200 rounded-bl-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className={`text-xs mt-1 flex items-center ${
                            msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            <span>{msg.time}</span>
                            {msg.sender === 'user' && (
                              <span className="ml-2">
                                <CheckCheck size={12} />
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      className="rounded-l-none rounded-r-md h-full"
                      onClick={handleSendMessage}
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No conversation selected</h3>
                  <p className="text-gray-600 max-w-md">
                    Select a conversation from the list to start messaging, or start a new conversation from your active shipments.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;