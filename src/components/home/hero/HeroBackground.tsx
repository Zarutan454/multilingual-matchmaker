interface HeroBackgroundProps {
  side: 'left' | 'right';
  imagePath: string;
  altText: string;
}

export const HeroBackground = ({ side, imagePath, altText }: HeroBackgroundProps) => {
  return (
    <div className="relative w-1/2 h-full overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-${side === 'left' ? 'r' : 'l'} from-[#1A1F2C] via-[#1A1F2C]/70 to-transparent`} />
      <img 
        src={imagePath}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover object-top opacity-90 transition-opacity duration-300 hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-dark" />
    </div>
  );
};