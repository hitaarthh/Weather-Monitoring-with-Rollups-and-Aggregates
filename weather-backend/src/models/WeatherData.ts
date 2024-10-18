import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Weather Data Document
export interface IWeatherData extends Document {
  city: string;
  temperature: number;
  feels_like: number;
  humidity?: number; // Mark humidity as optional
  wind_speed?: number; // Mark wind speed as optional
  main: string;
  timestamp: Date;
}

// Define the schema for Weather Data
const WeatherDataSchema: Schema = new Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  humidity: { type: Number, required: false, default: null }, // Optional field with default null
  wind_speed: { type: Number, required: false, default: null }, // Optional field with default null
  main: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Export the model for the Weather Data
const WeatherData = mongoose.model<IWeatherData>('WeatherData', WeatherDataSchema);
export default WeatherData;
