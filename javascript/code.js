// Adiciona o evento submit no formulário com id 'search'
document.querySelector('#search').addEventListener('submit', async (event) => {

  // Impede o comportamento padrão do envio de formulário (recarregar a página)
  event.preventDefault();
  
  const cityName = document.querySelector('#city-name').value;

  if (!cityName){
    return showAlert('Você precisa digitar o nome da cidade.');
  } 

  const apiKey = 'fbceb709a5774570b1d181245242210'; 
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURI(cityName)}&days=1&lang=pt`; 

  const results = await fetch(apiUrl);
  const json = await results.json();
  console.log(json);
  
  if (json.error) {
    return showAlert('Cidade não encontrada. Por favor, verifique o nome digitado.');
  }

  if (json) {
      showInfo({
          city: json.location.name,
          country: json.location.country,
          temp: json.current.temp_c,
          tempMax: json.forecast.forecastday[0].day.maxtemp_c,
          tempMin: json.forecast.forecastday[0].day.mintemp_c, 
          description: json.current.condition.text,
          tempIcon: json.current.condition.icon,
          windSpeed: json.current.wind_kph,
          humidity: json.current.humidity,
      });
  }

});

function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show');
    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
    document.querySelector("#temp-value").innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}  <sup>°C</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', json.tempIcon);
    document.querySelector("#temp-max").innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')}  <sup>°C</sup>`;
    document.querySelector("#temp-min").innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}  <sup>°C</sup>`;
    document.querySelector("#humidity").innerHTML = `${json.humidity} %`;
    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1)} Km/h`;
}

function showAlert(msg) {
  document.querySelector('#alert').innerHTML = msg;
}
