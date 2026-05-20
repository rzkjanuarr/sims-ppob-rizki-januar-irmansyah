export const Service = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={icon}
          alt={label}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-xs text-gray-700 text-center leading-tight max-w-[70px]">
        {label}
      </span>
    </button>
  );
};
