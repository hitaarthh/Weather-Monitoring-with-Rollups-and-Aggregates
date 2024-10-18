# Weather Frontend Installation Guide

This guide will help you set up and run the Weather Frontend project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 14.x or later)
- npm (usually comes with Node.js)
- Git (for version control)

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-frontend.git
   cd weather-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (if necessary)**
   - Create a `.env` file in the root directory
   - Add any necessary environment variables, such as API endpoints

4. **Start the development server**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200/`

5. **Build for production**
   ```bash
   ng build --configuration production
   ```
   The build artifacts will be stored in the `dist/` directory.

## Additional Configuration

- **Proxy Configuration**: If you need to proxy API requests during development, create a `proxy.conf.json` file in the root directory and add your proxy configuration.

- **SSL Configuration**: To run the app with HTTPS locally, use the following command:
  ```bash
  ng serve --ssl true
  ```

## Troubleshooting

- If you encounter any dependency-related issues, try deleting the `node_modules` folder and running `npm install` again.
- Make sure you're using the correct version of Node.js as specified in the `package.json` file.

## Updating

To update the project dependencies to their latest versions:

1. Install the npm-check-updates package globally:
   ```bash
   npm install -g npm-check-updates
   ```

2. Run the update:
   ```bash
   ncu -u
   npm install
   ```
   
