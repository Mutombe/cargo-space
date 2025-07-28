// src/components/ui/Avatar.jsx
import React from 'react';

const Avatar = ({ name, size = 8 }) => {
  const initials = name ? name.split(' ').map(part => part[0]).join('').toUpperCase() : 'U';
  
  return (
    <div className={`w-${size} h-${size} rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold p-1`}>
      {initials}
    </div>
  );
};

export default Avatar;