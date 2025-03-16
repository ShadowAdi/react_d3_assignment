# Interactive Bar Chart with D3.js & React

## Project Overview
This project is an interactive data visualization built using React and D3.js. It displays the number of race wins per driver over a selected time range. Users can specify a start and end year (e.g., 2013-2023) to filter the data dynamically. The chart is fully responsive and includes interactive features such as tooltips, axis transitions, and dynamic data updates.

## Features Implemented
1. **Dynamic Data Updates**: Users can input a start and end year, and the chart updates accordingly without requiring a page refresh.
2. **Responsive Design**: The chart adjusts dynamically to different screen sizes, ensuring usability across all devices.
3. **Animated Transitions**: Bars animate smoothly when the data updates, improving the user experience.
4. **Axis Transitions**: The x-axis adjusts dynamically when new data is loaded, maintaining clarity.
5. **Color-Coded Bars**: Each driver's team is represented by a unique color, making the visualization more informative.
6. **Filtered Data for Mobile**: To enhance readability on small screens, only the top 15 drivers are displayed when viewing on mobile devices.

## Technologies Used
- **React.js**: Frontend framework for building the UI.
- **D3.js**: Used for creating and manipulating SVG elements for the chart.
- **CSS**: Ensures a responsive and visually appealing design.

## How to Run the Project Locally
### Prerequisites
Ensure you have the following installed:
- Node.js (v14+ recommended)
- npm

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/ShadowAdi/react_d3_assignment.git
   cd react_d3
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open the browser and go to `http://localhost:3000/` to view the app.

## Folder Structure
```
root/
│── src/
│   ├── components/
        ├── InputYear.jsx
│   │   ├── Barchart.jsx   # Main D3.js chart component
│   ├── functions/
│   │   ├── Global.js    # Function to fetch race win data
│   ├── constants/
│   │   ├── Color_Constant.js  # Predefined team colors
│── public/
│── package.json
│── README.md
```

## Future Enhancements
- **Tooltip Implementation**: Show detailed data when hovering over bars.
- **Additional Chart Types**: Extend to pie charts, line graphs, etc.
- **Live API Integration**: Fetch real-time race data instead of static data.
- **Dark Mode**: Allow users to switch between light and dark themes.

## Author
- **Aditya Shukla**
- [GitHub](https://github.com/ShadowAdi)
- [LinkedIn](https://www.linkedin.com/in/aditya12153/)

