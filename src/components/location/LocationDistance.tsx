import { useState, useEffect } from 'react';
import { calculateDistance, formatDistance } from '../../utils/locationUtils';
import { useToast } from "../../components/ui/use-toast";
import { MapPin } from 'lucide-react';

interface LocationDistanceProps {
  targetLat: number;
  targetLng: number;
}

export const LocationDistance = ({ targetLat, targetLng }: LocationDistanceProps) => {
  const [distance, setDistance] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        toast({
          title: "Fehler",
          description: "Geolokalisierung wird von Ihrem Browser nicht unterstützt.",
          variant: "destructive",
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const calculatedDistance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            targetLat,
            targetLng
          );
          setDistance(calculatedDistance);
        },
        (error) => {
          toast({
            title: "Standortfehler",
            description: "Ihr Standort konnte nicht ermittelt werden.",
            variant: "destructive",
          });
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: false, // Deaktiviere hohe Genauigkeit
          maximumAge: 300000, // Cache für 5 Minuten
          timeout: 5000
        }
      );
    };

    getLocation();
  }, [targetLat, targetLng]);

  if (!distance) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <MapPin className="w-4 h-4" />
      <span>{formatDistance(distance)}</span>
    </div>
  );
};