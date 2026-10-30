document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');
  const weatherResult = document.getElementById('weatherResult');

  // Coordenadas de referencia para permitir buscar varias ciudades (como en tu ETL)
  const cityCoordinates = {
    'málaga': { lat: 36.7213, lon: -4.4214, country: 'ES' },
    'madrid': { lat: 40.4168, lon: -3.7038, country: 'ES' },
    'barcelona': { lat: 41.3851, lon: 2.1734, country: 'ES' },
    'sevilla': { lat: 37.3891, lon: -5.9845, country: 'ES' },
    'valencia': { lat: 39.4699, lon: -0.3763, country: 'ES' }
  };

  async function fetchWeather(cityNameInput) {
    const cityNameLower = cityNameInput.toLowerCase().trim();
    // Si la ciudad escrita no está en la lista, por defecto usa Málaga
    const location = cityCoordinates[cityNameLower] || cityCoordinates['málaga']; 
    const displayCityName = cityNameInput.charAt(0).toUpperCase() + cityNameInput.slice(1);

    // Estado visual de carga
    weatherResult.innerHTML = `
      <span class="weather-temp">...</span>
      <span class="weather-city">Consultando API (Open-Meteo) para ${displayCityName}...</span>
    `;

    try {
      // Petición directa a la misma API que usa tu ETL de Python
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al conectar con la API meteorológica');
      }

      const data = await response.json();
      const current = data.current_weather;
      
      const temp = Math.round(current.temperature);
      const windspeed = current.windspeed;

      // Mostramos los datos en tu widget manteniendo las clases de tu CSS
      weatherResult.innerHTML = `
        <span class="weather-temp">${temp}°C</span>
        <span class="weather-city">${displayCityName}, ${location.country} - Viento: ${windspeed} km/h (ETL Data)</span>
      `;
    } catch (error) {
      weatherResult.innerHTML = `
        <span class="weather-temp" style="color: #ef4444; font-size: 1rem;">⚠️</span>
        <span class="weather-city" style="color: #ef4444;">${error.message}</span>
      `;
    }
  }

  // Carga automática inicial al abrir la página (Málaga por defecto)
  fetchWeather('Málaga');

  // Evento al hacer clic en el botón "Consultar Tiempo"
  if (searchBtn && cityInput && weatherResult) {
    searchBtn.addEventListener('click', () => {
      const city = cityInput.value.trim();
      fetchWeather(city || 'Málaga');
    });

    // Permitir la búsqueda pulsando la tecla "Enter" en el input
    cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        fetchWeather(city || 'Málaga');
      }
    });
  }
});