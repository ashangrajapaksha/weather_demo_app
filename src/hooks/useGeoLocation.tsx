import React, { useEffect, useState } from "react";
import { LocationData } from "../types/LocationData";

export const useGeolocation = (): { location: LocationData } => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const getLocation = () => {
      // Check if Geolocation API is supported by the browser
      if (navigator.geolocation) {
        // Retrieve the user's current position
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            if (position.coords.latitude && position.coords.longitude) {
              // Set the location state with the retrieved coordinates
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            }
          },
          // Error callback
          (err: GeolocationPositionError) => {
            console.log("Somethng went wrong", err.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    getLocation();

    // Cleanup function to reset state when the component unmounts or re-renders
    return () => {
      setLocation({ latitude: null, longitude: null });
    };
  }, []);

  // Return the location data
  return { location };
};
