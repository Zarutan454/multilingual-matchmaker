import { FC } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages, Language } from "@/config/languages";

export const NavbarLanguageSelector: FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="bg-transparent text-white border border-[#333] rounded-none px-2 py-1"
    >
      {Object.entries(languages).map(([code, lang]) => (
        <option key={code} value={code} className="bg-black">
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
};