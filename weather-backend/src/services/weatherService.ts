import axios from 'axios';
import dotenv from 'dotenv';
import WeatherData from '../models/WeatherData'; // Assuming you have a WeatherData model

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("Missing OPENWEATHER_API_KEY in environment variables");
}

// Implement the interface for type-checking
interface WeatherResponse {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
    };
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
    }>;
  }>;
}

// Function to fetch and store weather data
const fetchWeatherData = async (lat: number, lon: number, cityName: string): Promise<WeatherResponse> => {
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    // Fetch weather data from OpenWeather API
    const response = await axios.get<WeatherResponse>(url);
    const weatherData = response.data.current;
    
    // Convert temperature to Celsius (since units=metric, this should be in Celsius)
    const tempInCelsius = weatherData.temp;
    const humidity = weatherData.humidity;
    const windSpeed = weatherData.wind_speed;
    const weatherCondition = weatherData.weather[0].main;
    
    // Save the fetched weather data to MongoDB with a timestamp
    const weather = new WeatherData({
      city: cityName,
      temperature: tempInCelsius,
      feels_like: weatherData.feels_like,
      humidity,
      wind_speed: windSpeed,
      main: weatherCondition,
      timestamp: new Date(), // Add a unique timestamp for each entry
    });
    
    await weather.save();

    // Log the saved weather data for debugging
    console.log(`Weather data saved for ${cityName}:`, {
      temperature: tempInCelsius,
      feels_like: weatherData.feels_like,
      humidity,
      wind_speed: windSpeed,
      main: weatherCondition,
      timestamp: new Date(),
    });

    // Return the weather response (original functionality preserved)
    return response.data;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching weather data:`, error.message);
    } else {
      console.error(`Unknown error fetching weather data`);
    }
    throw new Error('Failed to fetch weather data');
  }
};

export default fetchWeatherData;
