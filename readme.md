# Weather Monitoring System 🌦️

## Overview

The **Weather Monitoring System** is a robust, real-time weather dashboard that monitors weather conditions across major metros in India. It continuously fetches data from the OpenWeatherMap API, aggregates it, and provides insights on average, maximum, and minimum temperatures, humidity, and wind speed. The system also allows users to set alert thresholds for specific weather conditions and displays notifications when those thresholds are breached.

<img width="1440" alt="Screenshot 2024-10-17 at 6 28 31 PM" src="https://github.com/user-attachments/assets/7ac41926-5469-4c1d-b8c1-cc5c2cb0f103">

## Features 🚀

### 1. Real-Time Weather Data
- **Automatic Data Fetching**: Weather data for cities like Delhi, Mumbai, Bangalore, Chennai, and Kolkata is fetched every 5 minutes.
- **Weather Summary**: The system provides details for:
  - **Average Temperature**
  - **Maximum Temperature**
  - **Minimum Temperature**
  - **Dominant Weather Condition**
  - **Average Humidity**
  - **Maximum Wind Speed**

### 2. Temperature Unit Toggle 🌡️
- **Switch Between Celsius and Kelvin**: Users can toggle between Celsius and Kelvin as per their preference, with instant recalculations of the displayed temperatures.

### 3. Date Range Filtering 📅
- **Filter by Date**: Users can filter weather data by selecting a specific date range. The table updates dynamically to reflect weather data for the selected period.

<img width="1160" alt="Screenshot 2024-10-17 at 6 28 52 PM" src="https://github.com/user-attachments/assets/dff43943-c5b3-4301-aed3-3ab94059331d">

### 4. Weather Visualization 📊
- **Interactive Charts**: The dashboard includes visual charts representing temperature trends and other weather parameters across different cities. The charts update based on the selected date range, making it easy to analyze historical weather patterns.
  
<img width="1160" alt="Screenshot 2024-10-17 at 6 29 10 PM" src="https://github.com/user-attachments/assets/e243fd6c-c90d-45fb-9113-ccc04baea9ab">

### 5. Alert Notifications ⚠️
- **Configurable Alerts**: Users can define alert thresholds for weather conditions such as temperature exceeding 35°C. The system monitors the weather data in real time, and when the threshold is exceeded for two consecutive updates, a notification is triggered.
- **Real-Time Alerts**: Once a threshold is breached, the system displays notifications directly on the dashboard, helping users stay updated on critical weather changes.

### 6. Historical Weather Summaries 📅
- **Daily Summaries**: The system stores and displays daily weather summaries, aggregating data such as average, maximum, and minimum temperatures, humidity, and dominant weather conditions.
- **View Historical Data**: Users can retrieve weather summaries from any past period using the date range filter, enabling detailed weather analysis.

## Application Structure 📂

The system is divided into two main parts:

### 1. Backend (Node.js + Express)
- **Data Fetching**: The backend fetches real-time weather data from the OpenWeatherMap API and stores it in MongoDB.
- **Daily Summary Calculation**: Aggregates daily data (average, max, min temperatures, etc.) for each city and stores the summary.
- **Alert System**: Monitors weather conditions against user-defined thresholds and triggers alerts when those conditions are breached.
- **Automated Scheduler**: Cron jobs are used to automate the fetching of weather data and calculation of daily summaries at regular intervals.

### 2. Frontend (Angular + Bootstrap)
- **Weather Dashboard**: The frontend provides an intuitive interface for viewing real-time weather data, toggling temperature units, and filtering data by date.
- **Charts and Graphs**: Visual representations of weather data, including temperature trends and summaries.
- **Alerts**: Displays real-time notifications on the dashboard when weather thresholds are exceeded.

---

## Key Technologies 🛠️
- **Node.js**: For the backend server.
- **Express.js**: As the web framework.
- **MongoDB**: To store weather data and daily summaries.
- **Angular**: For building the frontend UI.
- **Bootstrap**: For responsive and modern styling.
- **OpenWeatherMap API**: For fetching real-time weather data.

---

For installation instructions and setup, refer to the following repositories:

- [Backend Installation Guide](https://github.com/hitaarthh/Weather-Monitoring-with-Rollups-and-Aggregates/tree/main/weather-backend)
- [Frontend Installation Guide](https://github.com/hitaarthh/Weather-Monitoring-with-Rollups-and-Aggregates/tree/main/weather-frontend)



