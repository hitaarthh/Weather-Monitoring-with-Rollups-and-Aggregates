import express, { Request, Response, NextFunction } from 'express';
import fetchWeatherData from '../services/weatherService';
import WeatherData from '../models/WeatherData';
import { calculateDailyWeatherSummary } from '../services/weatherSummaryService';
import DailyWeatherSummary from '../models/DailyWeatherSummary';
import { checkAlerts } from '../services/alertService';
import Forecast from '../models/Forecast';

const router = express.Router();

// Define cities with latitude and longitude
const cities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 }
];

// Define a type for the route handler
type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Wrap the async route handler to catch errors
const asyncHandler = (fn: RouteHandler): express.RequestHandler =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

router.get('/weather', asyncHandler(async (req, res) => {
    // Fetch weather data for all cities
    const weatherDataPromises = cities.map(city => fetchWeatherData(city.lat, city.lon, city.name));
    const weatherDataArray = await Promise.all(weatherDataPromises);

    // Iterate over weather data and save/update in MongoDB
    for (let i = 0; i < weatherDataArray.length; i++) {
        const weather = weatherDataArray[i];
        const cityName = cities[i].name;
        
        // Save current weather data
        await WeatherData.findOneAndUpdate(
            { city: cityName },
            {
                temperature: weather.current.temp,
                feels_like: weather.current.feels_like,
                main: weather.current.weather[0]?.main || 'Unknown',
                timestamp: Date.now(),
            },
            { upsert: true, new: true }
        );

        // Save forecast data
        for (const dailyForecast of weather.daily) {
            const date = new Date(dailyForecast.dt * 1000).toISOString().split('T')[0];

            const forecastData = new Forecast({
                city: cityName,
                date: date,
                temperature: dailyForecast.temp.day,
                humidity: dailyForecast.humidity,
                wind_speed: dailyForecast.wind_speed,
                condition: dailyForecast.weather[0]?.main || 'Unknown',
            });

            await forecastData.save();
        }
    }
    
    // Call checkAlerts after storing the weather data
    await checkAlerts();
    
    res.status(200).json({ message: 'Weather data fetched and stored successfully' });
}));

router.get('/trigger-summary', asyncHandler(async (req, res) => {
    const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];

    for (const city of cities) {
        await calculateDailyWeatherSummary(city);
    }

    res.status(200).json({ message: 'Daily summaries calculated successfully' });
}));

router.get('/daily-summaries', asyncHandler(async (req, res) => {
    const dailySummaries = await DailyWeatherSummary.find().lean();
    res.status(200).json({ message: 'Daily summaries retrieved successfully', data: dailySummaries });
}));

router.get('/historical-weather', asyncHandler(async (req, res) => {
    const { city, days } = req.query;

    if (!city || !days) {
        res.status(400).json({ error: 'City and days parameters are required' });
        return;
    }

    const daysInt = parseInt(days as string, 10);

    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysInt);

    const historicalData = await DailyWeatherSummary.find({
        city: city,
        date: { $gte: pastDate.toISOString().split('T')[0], $lte: today.toISOString().split('T')[0] }
    }).sort({ date: 1 });

    if (historicalData.length === 0) {
        res.status(404).json({ message: 'No historical data found for the specified city and date range' });
        return;
    }

    res.status(200).json({
        message: `Historical weather data for ${city} for the past ${days} days`,
        data: historicalData
    });
}));

router.get('/historical-weather-range', asyncHandler(async (req, res) => {
    const { city, startDate, endDate } = req.query;

    if (!city || !startDate || !endDate) {
        res.status(400).json({ error: 'City, startDate, and endDate parameters are required' });
        return;
    }

    const historicalData = await DailyWeatherSummary.find({
        city: city,
        date: { $gte: new Date(startDate as string).toISOString().split('T')[0], $lte: new Date(endDate as string).toISOString().split('T')[0] }
    }).sort({ date: 1 });

    if (historicalData.length === 0) {
        res.status(404).json({ message: 'No historical data found for the specified city and date range' });
        return;
    }

    res.status(200).json({
        message: `Historical weather data for ${city} from ${startDate} to ${endDate}`,
        data: historicalData
    });
}));

export default router;