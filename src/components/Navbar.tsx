import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./navbar/Logo";
import { NavLinks } from "./navbar/NavLinks";
import { NavbarLanguageSelector } from "./navbar/LanguageSelector";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          <div className="hidden md:flex">
            <NavLinks />
          </div>
          
          <div className="flex items-center space-x-4">
            <NavbarLanguageSelector />

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333]">
            <NavLinks onItemClick={handleMenuClose} />
          </div>
        )}
      </div>
    </nav>
  );
};