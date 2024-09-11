import Image from "next/image";
import localFont from "next/font/local";
import Input from "@/component/Input";
import axios from "axios"
import { useEffect } from "react";
import Weather from "@/component/Weather";

export async function getServerSideProps() {
  const options = {
    method: 'GET',
    url: `https://api.weatherstack.com/current`,
    params: {
      access_key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      query: 'London',
    },
  };

  try {
    const response = await axios.request(options);
    return {
      props: {
        weatherData: {
          temperature: response.data.current.temperature,
          windSpeed: response.data.current.wind_speed,
          humidity: response.data.current.humidity,
          weather_icons: response.data.current.weather_icons
        },
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      props: {
        weatherData: null,
      },
    };
  }
}

export default function Home({ weatherData }) {
  console.log(weatherData);
  

  if (!weatherData) {
    return <div>Error loading weather data.</div>;
  }

  return (
    <div className="xs:bg-bg-main xs:h-[100vh] flex items-center justify-between flex-col w-full px-[50px] p-[20px]">
      <Input />

      <Image
          src={weatherData.weather_icons} 
          alt="Weather Icon" 
          width={100} 
          height={100} 
      />

      <div className="w-[100%] ">
          <div className="mid bg-[#30d2fb] w-[100%] h-[335px] border-[2px] rounded-[20px] p-[20px]">
          <Weather 
            temperature={weatherData.temperature} 
            windSpeed={weatherData.windSpeed} 
            humidity={weatherData.humidity} 
          />
          </div>
        </div>

    </div>
    
  );
}