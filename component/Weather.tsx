export default function Weather({ temperature, windSpeed, humidity }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <h2 className="text">
        Today is <span>{currentDate}</span>
      </h2>

      <h1 className="txt">{temperature}°</h1>

      <h3 className="text p-[20px]">
        Wind: <span>{windSpeed} km/h</span>
      </h3>

      <h3 className="text">
        Humidity: <span>{humidity}%</span>
      </h3>
    </>
  );
}
