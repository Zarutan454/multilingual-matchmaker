import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./navbar/NavLinks";
import { NavbarLanguageSelector } from "./navbar/LanguageSelector";
import { ThemeToggle } from "./theme/ThemeToggle";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-black/90 backdrop-blur-md' 
            : 'bg-white/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              POPP<span className="text-secondary">*</span>IN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <NavbarLanguageSelector />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hover:text-gray-300 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className={`md:hidden ${
          theme === 'dark' 
            ? 'bg-black/95 backdrop-blur-md' 
            : 'bg-white/95 backdrop-blur-md'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLinks
              className="flex flex-col items-center"
              onItemClick={() => setIsOpen(false)}
            />
            <div className="flex justify-center pt-4">
              <NavbarLanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};