// Funktion zur Berechnung der Entfernung zwischen zwei Koordinaten
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Erdradius in Kilometern
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Runde auf den nächsten Kilometer, mindestens 1 km
  return Math.max(1, Math.round(distance));
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

// Funktion zur Formatierung der Entfernungsanzeige
export const formatDistance = (distance: number): string => {
  return `~${distance} km entfernt`;
};