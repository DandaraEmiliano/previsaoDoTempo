
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const mainContainer = document.getElementById('main-container');

    const API_KEY = '3d0e2040fa8b75b4fb5b4ff6db989c94';

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cityName = searchInput.value.trim();
        searchInput.value = '';
    
        const weatherData = await getWeatherData(cityName);
    
        if (!weatherData) {
        alert('Cidade não encontrada!');
        return;
        }
    
        const weatherCard = createWeatherCard(weatherData);
        mainContainer.innerHTML = '';
        mainContainer.appendChild(weatherCard);
    });
    
    async function getWeatherData(cityName) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=pt_br&units=metric`);
        if (!response.ok) {
        return null;
        }
        const data = await response.json();
        return {
        cityName: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        iconCode: data.weather[0].icon
        };
    }
    
    function createWeatherCard(weatherData) {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weather-card';
    
        const cityName = document.createElement('p');
        cityName.textContent = weatherData.cityName;
        cityName.classList.add('city-name');
    
        const temperature = document.createElement('p');
        temperature.textContent = `${weatherData.temperature.toFixed(1)}°C`;
        temperature.classList.add('temperature');
    
        const icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/w/${weatherData.iconCode}.png`;
        icon.alt = weatherData.description;
        icon.classList.add('icon');
    
        const description = document.createElement('p');
        description.textContent = weatherData.description;
        description.classList.add('description');
    
        weatherCard.appendChild(cityName);
        weatherCard.appendChild(temperature);
        weatherCard.appendChild(icon);
        weatherCard.appendChild(description);
    
        return weatherCard;
    }
    