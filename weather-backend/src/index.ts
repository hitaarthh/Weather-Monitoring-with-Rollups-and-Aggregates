import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes';
import cron from 'node-cron';
import { calculateDailyWeatherSummary } from './services/weatherSummaryService';
import { checkAlerts } from './services/alertService'; 
import fetchWeatherData from './services/weatherService'; // Import the weather data service
import cors from 'cors';


// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weatherMonitoring';

app.use(cors({
  origin: 'http://localhost:4200', // Remove the trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// Use the weather routes
app.use('/api', weatherRoutes);


// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule the daily summary calculation to run at midnight
cron.schedule('0 0 * * *', async () => { 
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
  for (const city of cities) {
    await calculateDailyWeatherSummary(city); // Calculate daily summary for each city
  }
});

// Schedule the alert checks to run every minute
cron.schedule('* * * * *', async () => {
  await checkAlerts(); // Check alerts every minute
});

// Schedule weather data retrieval every 5 minutes
cron.schedule('*/5 * * * *', async () => { 
  const cities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 }
  ];

  for (const city of cities) {
    await fetchWeatherData(city.lat, city.lon, city.name); // Fetch and store weather data for each city
    console.log(`Fetched weather data for ${city.name}`);
  }
});
