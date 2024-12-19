import { ReactNode } from "react";
import { ProfileBanner } from "@/components/profile/sections/ProfileBanner";
import { DashboardHeader } from "../DashboardHeader";
import { Navbar } from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  userId: string;
  bannerUrl?: string | null;
}

export const DashboardLayout = ({ children, userId, bannerUrl }: DashboardLayoutProps) => {
  console.log("DashboardLayout rendering with userId:", userId);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black text-white">
      <Navbar />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: '#9b87f5',
              opacity: Math.random() * 0.5 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <ProfileBanner 
        profileId={userId} 
        bannerUrl={bannerUrl} 
        isEditable={true} 
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            POPP<span className="text-secondary">*</span>IN
          </h1>
        </div>

        <DashboardHeader />
        
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};