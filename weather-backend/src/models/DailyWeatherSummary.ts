import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Daily Weather Summary Document
export interface IDailyWeatherSummary extends Document {
  city: string;
  date: string; // Date in ISO format (YYYY-MM-DD)
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantCondition: string;
  avgHumidity ?: number;
  maxWindSpeed ?: number;
}

// Define the schema for Daily Weather Summary
const DailyWeatherSummarySchema: Schema = new Schema({
  city: { type: String, required: true },
  date: { type: String, required: true },
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  avgHumidity: { type: Number, required: true },
  maxWindSpeed: { type: Number, required: true },
});

// Export the model for Daily Weather Summary
const DailyWeatherSummary = mongoose.models.DailyWeatherSummary || mongoose.model<IDailyWeatherSummary>('DailyWeatherSummary', DailyWeatherSummarySchema);
export default DailyWeatherSummary;
