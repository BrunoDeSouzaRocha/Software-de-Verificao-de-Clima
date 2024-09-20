let apiKey = "b67ce459b64ffeed00b9123a00175cbe";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";


const pesquisa= document.querySelector("#pesquisa");
const horario = document.querySelectorAll('#horario');

const simboloTempo= document.querySelector("#simboloTempoPrincipal");
const cidadeEscolhida= document.querySelector("#cidadeEscolhida");
const chuva= document.querySelector("#chuva");
const vento= document.querySelector("#vento");
const Umidade= document.querySelector("#Umidade");

const rio= document.querySelector("#rio");
const Sp= document.querySelector("#Sp");
const st= document.querySelector("#st");

const AlertarImg= document.querySelector("#AlertarImg");
const alertaTexto= document.querySelector("#alertaTexto");

const dataAtual= document.querySelector("#dataAtual");

const grausPrincipal= document.querySelector("#grausPrincipal");
const grausMaxima= document.querySelector("#grausMaxima");
const grausMinima= document.querySelector("#grausMinima");
const infoClima= document.querySelector("#infoClima");

const graus9H= document.querySelector("#graus9H");
const simboloTempo9H= document.querySelector("#simboloTempo9H");

const graus12H= document.querySelector("#graus12H");
const simboloTempo12H= document.querySelector("#simboloTempo12H");

const graus15H= document.querySelector("#graus15H");
const simboloTempo15H= document.querySelector("#simboloTempo15H");

const graus18H= document.querySelector("#graus18H");
const simboloTempo18H= document.querySelector("#simboloTempo18H");








//função q  exibe e pega o horario atual
function mostrarHorarioAtual() {
  const agora = new Date();
  const horas = agora.getHours();
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();
  //caso tenha mais de algum h1... com o msm id tem q usar o forEach
  horario.forEach(horario => {
    horario.innerText = `Horário: ${horas}:${minutos}:${segundos}`;
  })
}
//faz com q o tempo sempre atualize 
setInterval(mostrarHorarioAtual, 1000);










//faz com que tranforma a cidade escolhida vire um json
const pegarTempo = async (city) => {
  //maneira usar a api
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  //tranforma o json em algo para o js ler
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};



const pegarTempoFuturo = async(city)=>{
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  const responseForecast = await fetch(urlForecast);
  const forecastData = await responseForecast.json();
  return forecastData;

}






const exibirErro = () => {
  alert("Esse Lugar nao existe");
};






//alterar TempoPrincipal
const AlterarTempo = async (city) => {


  const data = await pegarTempo(city);

  const forecastData = await pegarTempoFuturo(city)

    

  if (data.cod === "404") {
    exibirErro();
    return;
  }

  console.log(`Condição atual: ${data.weather[0].description}`);
  console.log(`Temperatura atual: ${data.main.temp}°C`);
  console.log(`Temperatura máxima: ${data.main.temp_max}°C`);
  console.log(`Temperatura mínima: ${data.main.temp_min}°C`);


  cidadeEscolhida.innerText =( `Nome Da Cidade: ${data.name}`);
  simboloTempoPrincipal.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  Umidade.innerText = `${data.rain}%`;
  vento.innerText = `${data.wind.speed}%`;
  Umidade.innerText = `${data.main.humidity}%`;



/*O método find() percorre o array do primeiro ao último elemento.
Para cada elemento, ele executa a função de teste (callback).
Assim que a função de teste retornar true, o find() para e retorna esse elemento.
Se nenhum elemento passar no teste, o find() retorna undefined.


Estamos usando o find() para procurar a primeira previsão (dentro de forecastData.list) que tenha uma hora específica (9h, 12h, 15h ou 18h).
A função de teste converte o timestamp item.dt para uma data legível usando new Date(item.dt * 1000), e então verifica se a hora (getHours()) é igual à hora que estamos procurando.
Se encontrar uma previsão com essa hora, o find() retorna esse elemento, permitindo que a previsão seja exibida.*/

  const forecastTimes = [9, 12, 15, 18];

  //forEach faz com que percorra todos os elementos do arrew 
forecastTimes.forEach(hour => {
    const forecast = forecastData.list.find(item => {
        const forecastDate = new Date(item.dt * 1000);
        return forecastDate.getHours() === hour;
    });

    if (forecast) {
        if (hour === 9) {
            graus9H.innerText = `Previsão para 9h: ${forecast.main.temp}°C`;
            simboloTempo9H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 12) {
            graus12H.innerText = `Previsão para 12h: ${forecast.main.temp}°C`;
            simboloTempo12H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 15) {
            graus15H.innerText = `Previsão para 15h: ${forecast.main.temp}°C`;
            simboloTempo15H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 18) {
            graus18H.innerText = `Previsão para 18h: ${forecast.main.temp}°C`;
            simboloTempo18H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        }
    }
});
  
  /*
  http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png

  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  simboloTempo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
*/
};



//sempre q o enter for apertado ele vai executar a função e fazer toda a alteração
pesquisa.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {

    const city = e.target.value;

    
    AlterarTempo(city);
  }
});





//js do switch 
document.querySelector('toggle').addEventListener('change', function() {
    if (this.checked) {
      console.log('Fahrenheit selected');
    } else {
      console.log('Celsius selected');
    }
  });

