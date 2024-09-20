let apiKey = "b67ce459b64ffeed00b9123a00175cbe";


const pesquisa= document.querySelector("#pesquisa");
const horario = document.querySelectorAll('#horario');

const simboloTempo= document.querySelector("#simboloTempo");
const cidadeEscolhida= document.querySelector("#cidadeEscolhida");
const chuva= document.querySelector("#chuva");
const vento= document.querySelector("#vento");
const Umidade= document.querySelector("#Umidade");

const rio= document.querySelector("#rio");
const sp= document.querySelector("#sp");
const df= document.querySelector("#df");

const alertarImg= document.querySelector("#alertarImg");
const alertaTexto= document.querySelector("#alertaTexto");

const diaAtual= document.querySelector("#diaAtual");
const mesAtual= document.querySelector("#mesAtual");


const simboloTempoPrincipal= document.querySelector("#simboloTempoPrincipal");
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

let city = localStorage.getItem('city')
let modoTemperatura =localStorage.getItem('modoTemperatura')



const dataExata = new Date();
const dataDia = dataExata.toLocaleDateString('pt-BR', {
  day: '2-digit',
});
const dataMes = dataExata.toLocaleDateString('pt-BR', {
  month: 'long', // Exibe o mês por extenso
});

diaAtual.innerText = dataDia  ;
mesAtual.innerText =  dataMes ;






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



const exibirErro = () => {
  alert("Esse Lugar nao existe");
};




const pegarTempo = async (city) => {
  //maneira usar a api
  modoTemperatura=localStorage.getItem('modoTemperatura')
  let apiWeatherURL
  if (modoTemperatura=='true'){
    apiWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  }else{
    apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}&lang=pt_br`;
  }
  //tranforma o json em algo para o js ler
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  return data;
};


//faz com que tranforma a cidade escolhida vire um json

const pegarTempoFuturo = async(city)=>{
  modoTemperatura=localStorage.getItem('modoTemperatura')
  let urlForecast
  if (modoTemperatura=='true'){
    urlForecast= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  }else{
    urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial&lang=pt_br`;
  }
  const responseForecast = await fetch(urlForecast);
  const forecastData = await responseForecast.json();
  return forecastData;
}









//alterar TempoPrincipal
const AlterarTempo = async (city,temperatura) => {
  modoTemperatura=localStorage.getItem('modoTemperatura')
  const data = await pegarTempo(city);
  const forecastData = await pegarTempoFuturo(city)

  if (data.cod === "404") {
    exibirErro();
    return;
  }

  const precipitação = data.rain ? data.rain['24h'] : 0;


  cidadeEscolhida.innerText =( `Nome Da Cidade: ${data.name}`);
  simboloTempo.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  chuva.innerText =  `${precipitação} mm/h` ;
  vento.innerText = `${data.wind.speed}m/s`;
  Umidade.innerText = `${data.main.humidity}%`;
  cidadeEscolhida.innerText =( `Nome Da Cidade: ${data.name}`);
  
  grausPrincipal.innerText = `${data.main.temp+temperatura}`;
  simboloTempoPrincipal.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  grausMaxima.innerText = `${data.main.temp_max+temperatura}`;
  grausMinima.innerText = `${data.main.temp_min+temperatura}`;
  infoClima.innerText = `${data.weather[0].description}`;

let temperaturaReal= data.main.temp

if (modoTemperatura=="true"){ 
    if (temperaturaReal>32) {
      console.log('bbbbb');

      alertarImg.src='/img/alerta.png'
      alertaTexto.innerText="Ta quente pra caralho"
    }else{
      console.log('aaaa');
      
        alertarImg.src='./img/agradavel.png'
      alertaTexto.innerText="Temperatura ta de boa"
    }
}else{
  if (temperaturaReal>92) {
    console.log('bbbbb');
    alertarImg.src="/img/alerta.png"
    alertaTexto.innerText="Ta quente pra caralho"
  }else{
    console.log('aaaa');
    
      alertarImg.src='./img/agradavel.png'
    alertaTexto.innerText="Temperatura ta de boa"
  }

}


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
            graus9H.innerText = `Previsão para 9h: ${forecast.main.temp+temperatura}`;
            simboloTempo9H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 12) {
            graus12H.innerText = `Previsão para 12h: ${forecast.main.temp+temperatura}`;
            simboloTempo12H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 15) {
            graus15H.innerText = `Previsão para 15h: ${forecast.main.temp+temperatura}`;
            simboloTempo15H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 18) {
            graus18H.innerText = `Previsão para 18h: ${forecast.main.temp+temperatura}`;
            simboloTempo18H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        }
    }
});

};



const AlterarTempoMetropolis = async(temperatura)=>{
  const dataRio = await pegarTempo("Rio de Janeiro");
  const dataSp = await pegarTempo("São Paulo");
  const dataDf = await pegarTempo("Brasília");
rio.innerText =`Rio De Janeiro: ${dataRio.main.temp+temperatura}`;
sp.innerText =`São Paulo: ${dataSp.main.temp+temperatura}`;
df.innerText =`Brasília: ${dataDf.main.temp+temperatura}`;
}








//js do switch 
//Ese DomContent Acontece sempre q a pagina é inciada
document.addEventListener('DOMContentLoaded', function() {













  const toggle = document.querySelector('#toggle');

  // Verifica o estado inicial do checkbox ao carregar a página
  if (toggle.checked) {
    console.log('Fahrenheit selected');
    localStorage.setItem('modoTemperatura',false)
    AlterarTempoMetropolis('°F')
  } else {
    console.log('Celsius selected');
    localStorage.setItem('modoTemperatura',true)
    AlterarTempoMetropolis('°C')

  }
  

  //Faz com que altere caso a pessoa clique para mudar
  toggle.addEventListener('change', function() {
    city=localStorage.getItem('city')

    if (this.checked) {
      console.log('Fahrenheit selected');
      localStorage.setItem('modoTemperatura',false)
      AlterarTempoMetropolis('°F')
      AlterarTempo(city,'°F')

    } else {
      console.log('Celsius selected');
      localStorage.setItem('modoTemperatura',true)
      AlterarTempoMetropolis('°C')
      AlterarTempo(city,'°C')

    }
  });


});

pesquisa.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    modoTemperatura=localStorage.getItem('modoTemperatura')
    localStorage.setItem('city', e.target.value)
    city=localStorage.getItem('city')
    if (modoTemperatura=='true'){
      AlterarTempo(city,"°C");
    }else{
      AlterarTempo(city,"°F");

    }
  }
});