import { useLanguage } from "../contexts/LanguageContext";
import { languages, Language } from "../config/languages";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-black/80 backdrop-blur-sm border-none hover:bg-black/60 w-auto px-3"
          >
            <Globe className="h-4 w-4 text-white mr-2" />
            <span className="text-white">{languages[currentLanguage].flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-sm border-none min-w-[150px]">
          {Object.entries(languages).map(([code, lang]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code as Language)}
              className={`text-white hover:bg-white/10 cursor-pointer ${
                currentLanguage === code ? "bg-white/20" : ""
              }`}
            >
              <span className="mr-2 text-lg">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};