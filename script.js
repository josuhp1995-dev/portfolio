// Lógica para la simulación interactiva de la API del Tiempo
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const cityInput = document.getElementById('cityInput');
  const weatherResult = document.getElementById('weatherResult');

  if (searchBtn && cityInput && weatherResult) {
    searchBtn.addEventListener('click', () => {
      const city = cityInput.value.trim() || 'Málaga';
      // Simulación de respuesta de API
      const randomTemp = Math.floor(Math.random() * 12) + 18; // Genera entre 18°C y 30°C
      
      weatherResult.innerHTML = `
        <span class="weather-temp">${randomTemp}°C</span>
        <span class="weather-city">${city} - Despejado / Consulta en tiempo real</span>
      `;
    });
  }
});