# Explore the World 🌍

**Elie Najm** (Najm Georges Elie ) — Lebanese University, Faculty of Engineering – Branch II

## 🔧 APIs Used:
- [API Ninjas - Cities API](https://api-ninjas.com/api/city): for city data (population, country, etc.)
- [Unsplash API](https://unsplash.com/developers): for fetching city images
- [Chart.js](https://www.chartjs.org/): Used to display city population in a bar chart

## 📜 Description:
**Explore the World** is an interactive, responsive web app that lets users explore global cities. It allows:
- 🔁 Random city discovery
- 🔍 Manual city search
- 🖼️ Real-time image loading from Unsplash
- 🌐 An interactive 3D rotating globe on the homepage
- 📊 Population chart using Chart.js
 
All functionality is built with semantic HTML5, Bootstrap 5, CSS3, and modern JavaScript (ES6 classes). The app integrates real APIs and features a visual **loading spinner** during calls — a requirement tied to my personal assignment.

## 🧩 Custom UI Requirement:
As per my assigned task, I have implemented a **loading spinner** that appears during API calls (explore page). It disappears once the data is fully fetched and displayed.
I have also added a **rotating 3D globe** on the homepage, displaying Earth in the void of space with atmospheric effects.

## 🧩 Features
- 🎲 **Random City Generator**
  - Displays city name, country, latitude/longitude, population
  - Dynamic population bar chart using Chart.js
  - Live city images from Unsplash
- 🔍 **City Search** by name
- 🌐 **3D Globe Visualization**
- 🧭 Responsive layout using Bootstrap 5
- ✨ Smooth **loading spinner** animations on all fetches
- 📱 Mobile-friendly clean UI design

## 🚀 How to Run:
1. Clone the repo or download the project folder
2. Open it in **VS Code** or your preferred editor
3. Insert your own API keys (VERY IMPORTANT) in `explore.js`:
   - `API_NINJAS_KEY` for Cities API
   - `UNSPLASH_KEY` for Unsplash API
4. Open `index.html` in a browser to see the homepage with the rotating globe and start exploring cities.