export const Banner = ({ image, alt }) => {
  return (
    <div className="flex-shrink-0 w-[280px] h-[140px] rounded-lg overflow-hidden cursor-pointer">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
