import Image from "next/image";
import localFont from "next/font/local";
import Input from "@/component/Input";
import axios from "axios"
import { useEffect } from "react";
import Weather from "@/component/Weather";
import { useState } from 'react';
import { useRouter } from 'next/router';


export async function getServerSideProps(context) {
  const searchQuery = context.query.search || 'Moscow';
  
  const options = {
    method: 'GET',
    url: `https://api.weatherstack.com/current`,
    params: {
      access_key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      query: searchQuery,
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
          weather_icons: response.data.current.weather_icons,
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
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${query}`, undefined, { shallow: true });
    }
  };

  return (
    <div className="xs:bg-bg-main xs:h-[100vh] flex items-center justify-between flex-col w-full px-[50px] p-[20px]">

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white label h-[57px] flex justify-center items-center w-[100%] px-[50px]">
        <div className="flex items-center bg-white rounded-full justify-between px-4 py-2 w-full max-w-sm search-input">
          <button type="submit" className="focus:outline-none">
            <img src="/icons/arrow.svg" alt="arrow" />
          </button>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow ml-2 text-gray-500 placeholder-gray-400 focus:outline-none text-[18px]"
            placeholder="Search here"
          />
          <button type="submit" className="focus:outline-none">
            <img src="/icons/micro.svg" alt="micro" />
          </button>
        </div>
      </form>

      {/* Weather Icon */}
      {weatherData && (
        <Image
          src={weatherData.weather_icons} 
          alt="Weather Icon" 
          width={100} 
          height={100} 
        />
      )}

      {/* Weather Data */}
      <div className="w-[100%] ">
        <div className="mid bg-[#30d2fb] w-[100%] h-[335px] border-[2px] rounded-[20px] p-[20px]">
          {weatherData ? (
            <Weather 
              temperature={weatherData.temperature} 
              windSpeed={weatherData.windSpeed} 
              humidity={weatherData.humidity} 
            />
          ) : (
            <div>Error loading weather data</div>
          )}
        </div>
      </div>
    </div>
  );
}
