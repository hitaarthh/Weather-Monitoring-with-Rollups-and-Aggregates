### Weather-Monitoring-with-Rollups-and-Aggregates - Backend

Here’s a **backend installation guide** for the **Weather Monitoring System** project. It provides instructions on setting up the backend server, including all necessary steps to get the database and weather monitoring services running.

---

## Weather-Monitoring-with-Rollups-and-Aggregates - Backend

### Overview
The backend for the **Weather Monitoring System** is responsible for fetching real-time weather data from the OpenWeatherMap API, storing it in MongoDB, performing daily summaries, and setting up user-configurable alerts. The backend is built using **Node.js**, **Express.js**, and **MongoDB**, and it includes automated cron jobs to periodically fetch data and monitor weather conditions.

---

### Prerequisites

Ensure you have the following installed before proceeding:
- [Node.js](https://nodejs.org/en/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- OpenWeatherMap API Key (Sign up [here](https://openweathermap.org/api))

---

### Setup and Installation

#### Step 1: Clone the Repository

First, clone the **backend** repository to your local machine:

```bash
git clone https://github.com/hitaarthh/Weather-Monitoring-with-Rollups-and-Aggregates.git
cd weather-backend
```

#### Step 2: Install Dependencies

Install the required packages and dependencies by running the following command:

```bash
npm install
```

This will install:
- `express` - Web framework for Node.js.
- `mongoose` - MongoDB object modeling tool.
- `axios` - For making API requests to OpenWeatherMap.
- `dotenv` - To handle environment variables.
- `node-cron` - To schedule weather data fetch and alert jobs.

#### Step 3: Configure Environment Variables

You need to set up environment variables in a `.env` file. Create a `.env` file in the root of the project with the following content:

```bash
MONGODB_URI=mongodb://localhost:27017/weatherMonitoring
OPENWEATHER_API_KEY=your_openweather_api_key
```

Make sure to replace `your_openweather_api_key` with your actual API key from OpenWeatherMap.

#### Step 4: Set Up MongoDB

Ensure MongoDB is installed and running locally or remotely. You can use a local instance or a MongoDB Atlas cloud instance. By default, the app will connect to `mongodb://localhost:27017/weatherMonitoring`. If using MongoDB Atlas, update the `MONGODB_URI` in the `.env` file with your connection string.

#### Step 5: Run the Backend Server

Start the backend server by running the following command:

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

---

### Key Functionalities

1. **Real-Time Weather Data Fetching**
   - Weather data for cities like Delhi, Mumbai, Bangalore, Chennai, and Kolkata is fetched every 5 minutes from the OpenWeatherMap API using a cron job.

2. **Daily Weather Summaries**
   - For each city, the system calculates:
     - Average temperature
     - Maximum temperature
     - Minimum temperature
     - Dominant weather condition
     - Average humidity
     - Maximum wind speed

3. **Alerting System**
   - Users can configure thresholds (e.g., alert if the temperature exceeds 35°C).
   - When the threshold is breached for two consecutive updates, the system triggers an alert.
   - Alerts are handled in real-time and can be extended to include email notifications.

---

### Database Models

The system uses **MongoDB** to store weather data and summaries. The following are the key models:

<div align="center">
<img width="449" alt="Screenshot 2024-10-17 at 6 43 00 PM" src="https://github.com/user-attachments/assets/3eebe334-6ab1-40ad-bc0d-b0bccda7da8f">
</div>


---

### Services and Endpoints

1. **Weather Data Fetching**
   - **Endpoint**: `/api/weather`
   - Fetches real-time weather data from OpenWeatherMap API for each city and stores it in MongoDB.

2. **Trigger Daily Summary**
   - **Endpoint**: `/api/trigger-summary`
   - Triggers the calculation of daily summaries for each city.

3. **Get Daily Summaries**
   - **Endpoint**: `/api/daily-summaries`
   - Retrieves daily weather summaries stored in the database.

4. **Alerting System**
   - **Endpoint**: Integrated with weather data fetching.
   - Checks weather conditions and triggers alerts when thresholds are breached.

---

### Automated Cron Jobs

The system uses **node-cron** to schedule periodic tasks:
- **Fetch Weather Data**: Every 5 minutes, fetches weather data for all cities.
- **Calculate Daily Summary**: Runs at midnight to calculate daily weather summaries.
- **Alert Monitoring**: Runs every minute to check if any alert thresholds have been breached.

---

### Additional Features

- **Temperature Unit Conversion**: Backend handles temperature conversion (Kelvin to Celsius) based on user preferences.
- **Extensible**: The backend is designed to be extensible for future features like forecast tracking, humidity analysis, and more.

---

For further frontend and installation instructions, refer to the frontend installation guide:
- **Frontend Readme**: [Frontend Installation Guide](https://github.com/hitaarthh/Weather-Monitoring-with-Rollups-and-Aggregates/tree/main/weather-frontend)


