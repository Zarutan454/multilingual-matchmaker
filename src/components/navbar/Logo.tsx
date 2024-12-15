import { FC } from "react";

export const Logo: FC = () => (
  <div className="flex flex-col items-start">
    <a href="/" className="text-white font-bold text-xl">
      POPP<span className="text-secondary">*</span>IN
    </a>
    <span className="text-secondary text-sm italic font-light">
      Escort Made in Germany
    </span>
  </div>
);