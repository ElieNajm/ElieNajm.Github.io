
class CityExplorer {
  constructor() {
    this.apiKey = 'bTNjgNJLS/adqd7oQaLubA==6P6UxufiU1dTw7w5'; // my API key
    this.unsplashKey = 'KkEkZhaDLmBTjqcgaqG0hZIkqW8lY33ouz-X6S0gM0E'; // my Unsplash key
    this.apiUrl = 'https://api.api-ninjas.com/v1/city';
    this.cityInfoDiv = document.getElementById('cityInfo');
    this.spinner = document.getElementById('spinner');
    this.cityImageDiv = document.getElementById('cityImage');
    this.chartCanvas = document.getElementById('popChart');
    this.chart = null;
    this.init();
  }

  init() {
    document.getElementById('fetchCity').addEventListener('click', () => this.fetchCity());
    document.getElementById('searchCity').addEventListener('click', () => {
      const cityName = document.getElementById('cityInput').value.trim();
      if (cityName) this.fetchCity(cityName);
    });
  }

  async fetchCity(cityName = null) {
    this.showSpinner(true);

    if (this.chart){
        this.chart.destroy();
        this.chart = null;
    }
    this.chartCanvas.style.display = 'none';

    this.cityInfoDiv.innerHTML = '';
    this.cityImageDiv.innerHTML = '';

    const cities = [
  'beirut', 'paris', 'london', 'tokyo', 'sydney', 'cairo', 'dubai', 'rome', 'new york',
  'los angeles', 'berlin', 'madrid', 'moscow', 'toronto', 'singapore', 'amsterdam',
  'stockholm', 'vienna', 'athens', 'bangkok', 'istanbul', 'chicago', 'cape town', 'jakarta',
  'sao paulo', 'mexico city', 'hanoi', 'seoul', 'washington', 'san francisco', 'lisbon',
  'prague', 'buenos aires', 'auckland', 'nairobi', 'kuala lumpur', 'helsinki', 'oslo',
  'warsaw', 'manila', 'doha', 'riyadh', 'baghdad', 'karachi', 'tehran', 'casablanca',
  'lagos', 'accra', 'bucharest', 'delhi', 'lima', 'houston', 'miami', 'boston', 'montreal', 'vancouver', 'venice',
  'florence', 'edinburgh', 'glasgow', 'brussels', 'zurich', 'geneva', 'copenhagen',
  'munich', 'hamburg', 'barcelona', 'valencia', 'sevilla', 'porto', 'krakow', 'budapest',
  'sofia', 'tbilisi', 'yerevan', 'dover', 'kyiv', 'vilnius', 'riga', 'tallinn', 'reykjavik',
  'beijing', 'shanghai', 'guangzhou', 'shenzhen', 'hong kong', 'taipei', 'bangalore',
  'chennai', 'lahore', 'colombo', 'kathmandu', 'jerusalem', 'amman', 'algiers', 'tunis',
  'addis ababa', 'harare'];

    const query = cityName || cities[Math.floor(Math.random() * cities.length)];

    try {
      const response = await fetch(`${this.apiUrl}?name=${query}`, {
        headers: { 'X-Api-Key': this.apiKey }
      });

      if (!response.ok) throw new Error('Failed to fetch city.');

      const data = await response.json();
      if (data.length === 0) throw new Error('City not found.');
      const city = data[0];

      this.cityInfoDiv.innerHTML = `
        <h3>${city.name}, ${city.country}</h3>
        <p><strong>Population:</strong> ${city.population}</p>
        <p><strong>Latitude:</strong> ${city.latitude}</p>
        <p><strong>Longitude:</strong> ${city.longitude}</p>
      `;

      await this.loadCityImage(city.name);
      this.renderPopulationChart(city);
      this.chartCanvas.style.display = 'block';

    } catch (error) {
      this.cityInfoDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    } finally {
      this.showSpinner(false);
    }
  }

  async fetchCityByCountry(country) {
    this.showSpinner(true);
    this.cityInfoDiv.innerHTML = '';
    this.cityImageDiv.innerHTML = '';
    if (this.chart) this.chart.destroy();

    try {
      const response = await fetch(`${this.apiUrl}?country=${country}&limit=1`, {
        headers: { 'X-Api-Key': this.apiKey }
      });

      if (!response.ok) throw new Error('Failed to fetch city.');
      const data = await response.json();
      if (data.length === 0) throw new Error('No cities found in this country.');

      const city = data[0];

      this.cityInfoDiv.innerHTML = `
        <h3>${city.name}, ${city.country}</h3>
        <p><strong>Population:</strong> ${city.population}</p>
        <p><strong>Latitude:</strong> ${city.latitude}</p>
        <p><strong>Longitude:</strong> ${city.longitude}</p>
      `;

      await this.loadCityImage(city.name);
      this.renderPopulationChart(city);
    } catch (error) {
      this.cityInfoDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    } finally {
      this.showSpinner(false);
    }
  }

  async loadCityImage(cityName) {


    try {
      const imgResponse = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&orientation=landscape&client_id=${this.unsplashKey}`);
      const imgData = await imgResponse.json();

      const imgUrl = imgData.results.length > 0
        ? imgData.results[0].urls.regular
        : 'https://via.placeholder.com/600x400?text=No+Image+Found';

      this.cityImageDiv.innerHTML = `<img src="${imgUrl}" alt="${cityName}" class="img-fluid rounded shadow">`;
    } catch (error) {
      this.cityImageDiv.innerHTML = `<p class="text-danger">Image not available.</p>`;
    } 
  }

  renderPopulationChart(city) {
    this.chart = new Chart(this.chartCanvas, {
      type: 'bar',
      data: {
        labels: [city.name],
        datasets: [{
          label: 'Population',
          data: [city.population],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  showSpinner(show) {
    this.spinner.classList.toggle('d-none', !show);
  }
}

document.addEventListener('DOMContentLoaded', () => new CityExplorer());
