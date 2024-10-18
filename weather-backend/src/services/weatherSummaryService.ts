import WeatherData from '../models/WeatherData';
import mongoose from 'mongoose';

// Define the schema for Daily Summary if necessary
const DailyWeatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: String, required: true }, // ISO format
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  avgHumidity: { type: Number, required: true },  // New field for average humidity
  maxWindSpeed: { type: Number, required: true }, // New field for maximum wind speed
});


const DailyWeatherSummary = mongoose.model('DailyWeatherSummary', DailyWeatherSummarySchema);

// Function to calculate and store the daily summary
export const calculateDailyWeatherSummary = async (city: string) => {
  try {
    // Get all weather data for the current day
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const weatherData = await WeatherData.find({
      city,
      timestamp: { $gte: startOfDay, $lte: endOfDay },
    });

    console.log(`Fetched weather data for ${city}:`, weatherData); // Log fetched data
    console.log(`Number of data points for ${city}:`, weatherData.length);
    console.log(`Start of day: ${startOfDay}, End of day: ${endOfDay}`);

    if (weatherData.length === 0) {
      console.log(`No weather data found for ${city} on this date.`);
      return null;
    }

    // Initialize variables to calculate summary values
    let totalTemp = 0;
    let totalHumidity = 0;
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let maxWindSpeed = -Infinity;
    const conditionCount: { [key: string]: number } = {};

    // Iterate over the weather data to calculate aggregates
    weatherData.forEach((data) => {
      const humidity = data.humidity !== undefined ? data.humidity : 0; // Handle missing humidity
      const windSpeed = data.wind_speed !== undefined ? data.wind_speed : 0; // Handle missing wind speed
      
      totalTemp += data.temperature;
      totalHumidity += humidity;  // Accumulate humidity
      maxTemp = Math.max(maxTemp, data.temperature);
      minTemp = Math.min(minTemp, data.temperature);
      maxWindSpeed = Math.max(maxWindSpeed, windSpeed);  // Track max wind speed
    
      const condition = data.main;
      conditionCount[condition] = (conditionCount[condition] || 0) + 1;
    });
    

    const avgTemp = totalTemp / weatherData.length;
    const avgHumidity = totalHumidity / weatherData.length;  // Calculate avg humidity

    // Find the dominant condition
    const dominantCondition = Object.keys(conditionCount).reduce((a, b) =>
      conditionCount[a] > conditionCount[b] ? a : b
    );

    // Upsert the daily summary for the city
    await DailyWeatherSummary.findOneAndUpdate(
      { city, date: startOfDay.toISOString().split('T')[0] },
      {
        avgTemp,
        maxTemp,
        minTemp,
        dominantCondition,
        avgHumidity,  // Save average humidity
        maxWindSpeed, // Save maximum wind speed
      },
      { upsert: true, new: true }
    );

    console.log(`Daily summary for ${city} stored successfully:`, {
      avgTemp,
      maxTemp,
      minTemp,
      dominantCondition,
      avgHumidity,  // Log the avg humidity
      maxWindSpeed, // Log the max wind speed
    });
  } catch (error) {
    console.error('Error calculating daily weather summary:', error);
  }
};

