import mongoose, { Schema, Document } from 'mongoose';

export interface IForecast extends Document {
    city: string;
    date: string; // Store the date
    temperature: number;
    humidity ?: number;
    wind_speed ?: number;
    condition: string;
}

const ForecastSchema: Schema = new Schema({
    city: { type: String, required: true },
    date: { type: String, required: true }, // Store the date
    temperature: { type: Number, required: true },
    humidity: { type: Number },
    wind_speed: { type: Number },
    condition: { type: String },
});

const Forecast = mongoose.model<IForecast>('Forecast', ForecastSchema);
export default Forecast;
