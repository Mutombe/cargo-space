import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Click handler component
const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      if (onClick) {
        onClick(e);
      }
    },
  });
  return null;
};

const Map = ({ 
  center = [-17.824858, 31.053028], 
  zoom = 13, 
  pickupLocation = null,
  dropoffLocation = null,
  onClick = null
}) => {
  return (
    <div className="w-full h-full">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Pickup Location Marker */}
        {pickupLocation && (
          <Marker position={pickupLocation}>
            <Popup>
              <div className="font-medium text-gray-800">Pickup Location</div>
            </Popup>
          </Marker>
        )}
        
        {/* Dropoff Location Marker */}
        {dropoffLocation && (
          <Marker position={dropoffLocation}>
            <Popup>
              <div className="font-medium text-gray-800">Drop-off Location</div>
            </Popup>
          </Marker>
        )}
        
        {/* Click handler */}
        {onClick && <MapClickHandler onClick={onClick} />}
      </MapContainer>
    </div>
  );
};

export default Map;