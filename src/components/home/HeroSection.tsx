import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, UserPlus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export const HeroSection = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      videoElement.defaultMuted = true;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.autoplay = true;
      videoElement.loop = true;
      
      // Debug-Ausgaben erweitert
      const videoPath = "/hero-background.mp4";
      console.log("Versuchter Video-Pfad:", videoPath);
      console.log("BASE_URL:", import.meta.env.BASE_URL);
      console.log("Vollständiger Pfad:", import.meta.env.BASE_URL + videoPath.substring(1));
      
      console.log("Video Eigenschaften:", {
        src: videoElement.src,
        muted: videoElement.muted,
        autoplay: videoElement.autoplay,
        loop: videoElement.loop,
        readyState: videoElement.readyState,
        paused: videoElement.paused,
        currentTime: videoElement.currentTime,
        duration: videoElement.duration
      });

      const playVideo = async () => {
        try {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log("Video wird erfolgreich abgespielt");
          }
        } catch (error) {
          console.error("Fehler beim Abspielen des Videos:", error);
        }
      };

      videoElement.addEventListener('loadedmetadata', () => {
        console.log("Video Metadaten geladen");
        playVideo();
      });

      videoElement.addEventListener('playing', () => {
        console.log("Video spielt ab");
      });

      videoElement.addEventListener('pause', () => {
        console.log("Video pausiert");
      });

      videoElement.addEventListener('error', (e) => {
        console.error("Video Fehler:", e);
      });

      playVideo();
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.removeEventListener('loadedmetadata', () => {});
        videoElement.removeEventListener('playing', () => {});
        videoElement.removeEventListener('pause', () => {});
        videoElement.removeEventListener('error', () => {});
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
          muted
          playsInline
          autoPlay
          loop
        >
          <source src="/hero-background.mp4" type="video/mp4" />
          Ihr Browser unterstützt keine Videos.
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white">
              POPP<span className="text-secondary">*</span>IN
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 italic">
              Exklusive Momente, unvergessliche Begegnungen
            </p>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Die führende Plattform für erstklassige Begleitservices in Deutschland
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {!user ? (
              <>
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 group"
                  onClick={() => navigate("/register")}
                >
                  <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t("register")}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10 group"
                  onClick={() => navigate("/login")}
                >
                  <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t("login")}
                </Button>
              </>
            ) : (
              <Button 
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90"
                onClick={() => navigate("/profile")}
              >
                {t("profile")}
              </Button>
            )}
          </div>

          <Button 
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10"
            onClick={() => {
              const element = document.getElementById('features');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown className="mr-2" />
            Entdecken Sie mehr
          </Button>
        </div>
      </div>
    </div>
  );
};