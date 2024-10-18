import WeatherData from '../models/WeatherData';
import Alert from '../models/AlertModel'; // Import your Alert model

// Define the interface for user-configurable thresholds
interface AlertThreshold {
  temperature?: number;
  humidity?: number;
  wind_speed?: number;
  condition?: string;
}

// Example user-defined thresholds
const userDefinedThresholds: AlertThreshold = {
  temperature: 35, // High Temperature
  humidity: 80,    // High Humidity
  wind_speed: 40   // High Wind Speed
};

// Function to check for alerts based on the thresholds
const checkAlerts = async () => {
  try {
    // Fetch the latest weather data from the database
    const weatherData = await WeatherData.find();

    // Iterate over each data entry and check for alerts
    for (const data of weatherData) {
      try {
        console.log(`Checking alert for ${data.city}: ${data.temperature}°C`);

        // Check for high temperature alert
        if (userDefinedThresholds.temperature && data.temperature > userDefinedThresholds.temperature) {
          const alertMessage = `High Temperature Alert for ${data.city}: ${data.temperature}°C`;
          await createAndSaveAlert(data.city, alertMessage);
        }

        // Check for high humidity alert (handle possible undefined)
        if (userDefinedThresholds.humidity && (data.humidity ?? 0) > userDefinedThresholds.humidity) {
          const alertMessage = `High Humidity Alert for ${data.city}: ${data.humidity ?? 0}%`;
          await createAndSaveAlert(data.city, alertMessage);
        }

        // Check for high wind speed alert (handle possible undefined)
        if (userDefinedThresholds.wind_speed && (data.wind_speed ?? 0) > userDefinedThresholds.wind_speed) {
          const alertMessage = `High Wind Speed Alert for ${data.city}: ${data.wind_speed ?? 0} km/h`;
          await createAndSaveAlert(data.city, alertMessage);
        }

        // If none of the thresholds are exceeded, log that the weather is normal
        if (!exceedsThreshold(data)) {
          console.log(`Weather for ${data.city} is normal.`);
        }

      } catch (error) {
        console.error(`Error processing alert for ${data.city}:`, error);
      }
    }
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};

// Helper function to check if data exceeds any thresholds
const exceedsThreshold = (data: any): boolean => {
  const tempExceeds = userDefinedThresholds.temperature !== undefined && data.temperature > userDefinedThresholds.temperature;
  const humidityExceeds = userDefinedThresholds.humidity !== undefined && (data.humidity ?? 0) > userDefinedThresholds.humidity;
  const windSpeedExceeds = userDefinedThresholds.wind_speed !== undefined && (data.wind_speed ?? 0) > userDefinedThresholds.wind_speed;

  return tempExceeds || humidityExceeds || windSpeedExceeds;
};


// Helper function to create and save alerts in the database
const createAndSaveAlert = async (city: string, message: string) => {
  try {
    const alert = new Alert({
      city,
      message,
    });
    await alert.save();
    console.log(`Alert saved for ${city}: ${message}`);
  } catch (error) {
    console.error(`Error saving alert for ${city}:`, error);
  }
};

export { checkAlerts };
