// import Image from "next/image";
// import localFont from "next/font/local";
// import Input from "@/component/Input";
import axios from "axios"
// import { useEffect } from "react";
// import Weather from "@/component/Weather";
// import TodayComponent from "@/component/TodayComponent";

// export async function getServerSideProps() {
//   const options = {
//     method: 'GET',
//     url: `https://api.weatherstack.com/current`,
//     params: {
//       access_key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
//       query: 'London',
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     return {
//       props: {
//         weatherData: {
//           temperature: response.data.current.temperature,
//           windSpeed: response.data.current.wind_speed,
//           humidity: response.data.current.humidity,
//           weather_icons: response.data.current.weather_icons
//         },
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//     return {
//       props: {
//         weatherData: null,
//       },
//     };
//   }
// }

// export default function Today({ weatherData }) {
//     const currentDate = new Date().toLocaleDateString();
//     return(
//         <div className="xs:bg-bg-main xs:h-[100vh] flex items-center  flex-col w-full px-[50px] p-[20px]">
//             <div className="top flex items-start w-full">
//                 <button className="w-[32px] h-[32px] text-left">
//                     <img src="/icons/up.svg" alt="up" />
//                 </button>
//             </div>
//             <div className="today w-full">
//                 <div className="today-top flex justify-between w-full ">
//                     <h2 className="text">Today</h2> 
//                     <span className="text">{currentDate}</span>
//                 </div>
//                 <div className="today-body">
//                     <TodayComponent weather_icons={weatherData.weather_icons} temperature={weatherData.temperature}/>
//                 </div>
//             </div>
//         </div>
//     )
// }



import Image from "next/image";
import TodayComponent from "@/component/TodayComponent";

export async function getServerSideProps() {
    const options = {
      method: 'GET',
      url: `https://api.weatherstack.com/forecast`,
      params: {
        access_key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        query: 'London',
      },
    };
  
    try {
      const response = await axios.request(options);
      const forecast = response.data.forecast;
      const todayDate = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const hourlyData = forecast[todayDate]?.hourly || [];
  
      return {
        props: {
          hourlyData,
        },
      };
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      return {
        props: {
          hourlyData: [],
        },
      };
    }
  }
  

export default function Today({ hourlyData }) {
  const currentDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="xs:bg-bg-main xs:h-[100vh] flex items-center flex-col w-full px-[50px] p-[20px]">
      <div className="top flex items-start w-full">
        <button className="w-[32px] h-[32px] text-left">
          <img src="/icons/up.svg" alt="up" />
        </button>
      </div>
      <div className="today w-full">
        <div className="today-top flex justify-between w-full ">
          <h2 className="text">Today</h2>
          <span className="text">{currentDate}</span>
        </div>
        <div className="today-body">
          {hourlyData.length > 0 ? (
            <div className="flex flex-wrap">
              {hourlyData.map((hour, index) => (
                <TodayComponent
                  key={index}
                  temperature={hour.temperature}
                  weather_icons={hour.weather_icons} // Передаем первый элемент массива иконок
                />
              ))}
            </div>
          ) : (
            <p>No hourly data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

