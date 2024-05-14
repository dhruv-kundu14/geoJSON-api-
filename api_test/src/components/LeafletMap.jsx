

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ latitude, longitude }) => {
  useEffect(() => {
    // Check if map container exists
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map container not found');
      return;
    }

    // Initialize map
    const map = L.map(mapElement).setView([latitude, longitude], 13);

    // Add tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add marker to the map
    let newMarker;
    map.on('click', function (e) {
      if (typeof newMarker === 'undefined') {
        newMarker = L.marker(e.latlng, { draggable: true });
        newMarker.addTo(map);
      } else {
        newMarker.setLatLng(e.latlng);
      }

      console.log(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
      now();
    });

    // Log message when component is mounted
    console.log('LeafletMap component mounted');
  }, [latitude, longitude]);

  function now() {
    console.log(
      `Latitude: ${latitude}, Longitude: ${longitude} (Global after click)`
    );
  }

  return <div id='map' style={{ height: '400px' }}></div>;
};

export default LeafletMap;
