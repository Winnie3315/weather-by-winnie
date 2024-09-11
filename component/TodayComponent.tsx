import Image from "next/image";

export default function TodayComponent({ temperature, weather_icons }) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="w-[75px] today-component">
      <h3 className="text">{temperature}°</h3>
      <Image
        src={weather_icons} 
        alt="Weather Icon" 
        width={32} 
        height={32} 
      />
      <h3 className="text">
        {currentTime}
      </h3>
    </div>
  );
}
