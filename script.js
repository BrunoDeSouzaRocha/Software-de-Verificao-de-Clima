


let apiKey = "b67ce459b64ffeed00b9123a00175cbe";


const pesquisa= document.querySelector("#pesquisa-child");
const horario = document.querySelector('#horarioatual1');

const simboloTempo= document.querySelector("#iconeclimaprincipal");
const cidadeEscolhida= document.querySelector("#titulocidade");
const chuva= document.querySelector("#mmh");
const vento= document.querySelector("#kmh");
const Umidade= document.querySelector("#porcentagemumidade");

const rio= document.querySelector("#grausrj");
const sp= document.querySelector("#graussp");
const df= document.querySelector("#grausdf");

const alertarImg= document.querySelector("#iconealarme");
const alertaTexto= document.querySelector("#textoalarme");

const diaAtual= document.querySelector("#diaatual");
const mesAtual= document.querySelector("#mesatual");


const simboloTempoPrincipal= document.querySelector("#iconeclimasegundario");
const grausPrincipal= document.querySelector("#temperaturaprincipal");
const grausMaxima= document.querySelector("#temperaturamaxima");
const grausMinima= document.querySelector("#temperaturamin");
const infoClima= document.querySelector("#condicaoatual1");

const graus9H= document.querySelector("#graus1");
const simboloTempo9H= document.querySelector("#iconeclima1");

const graus12H= document.querySelector("#graus2");
const simboloTempo12H= document.querySelector("#iconeclima2");

const graus15H= document.querySelector("#graus3");
const simboloTempo15H= document.querySelector("#iconeclima3");

const graus18H= document.querySelector("#graus4");
const simboloTempo18H= document.querySelector("#iconeclima4");

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
    horario.innerText = ` ${horas}:${minutos}:${segundos}`;
}
//faz com q o tempo sempre atualize 
setInterval(mostrarHorarioAtual, 1000);



const exibirErro = () => {
  alert("Esse Lugar nao existe");
};



//melhor do resto
const pegarTempo = async (city) => {
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


//Melhor para pegar de Horario
const pegarTempoFuturo = async(city)=>{
  modoTemperatura=localStorage.getItem('modoTemperatura')
  let urlForecast
  if (modoTemperatura=='true'){
    urlForecast= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  }else{
    urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial&lang=pt_br`;
  }
//o fetch faz uma requisião http para o urlForecast
  const responseForecast = await fetch(urlForecast);
  const forecastData = await responseForecast.json();
  return forecastData;
}






const AlterarTempo = async (city,temperatura) => {
  modoTemperatura=localStorage.getItem('modoTemperatura')
  const data = await pegarTempo(city);
  const forecastData = await pegarTempoFuturo(city)

  if (data.cod === "404") {
    exibirErro();
    return;
  }

  cidadeEscolhida.innerText =( data.name);

  if (window.location.pathname == '/index.html') {
    simboloTempo.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
  vento.innerText = `${data.wind.speed}m/s`;
  Umidade.innerText = `${data.main.humidity}%`;

  grausPrincipal.innerText = `${data.main.temp+temperatura}`;
  simboloTempoPrincipal.src= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  grausMaxima.innerText = `${data.main.temp_max+temperatura}`;
  grausMinima.innerText = `${data.main.temp_min+temperatura}`;
  infoClima.innerText = `${data.weather[0].description}`;

let temperaturaReal= data.main.temp

if (modoTemperatura=="true"){ 
    if (temperaturaReal>32) {

      alertarImg.src='img/IconeAlarme.png'
      alertaTexto.innerText="Ta quente pra caralho"
    }else{
      
        alertarImg.src='img/Sun.png'
      alertaTexto.innerText="Temperatura ta de boa"
    }
}else{
  if (temperaturaReal>92) {
    alertarImg.src='img/IconeAlarme.png'
    alertaTexto.innerText="Ta quente pra caralho"
  }else{
    
    alertarImg.src='img/Sun.png'
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


//Isso aqui é para pegar as horas e fazer com que a preciptação seja no horario q pessao esteja vendo
let agora = new Date();
let horasDeAgr = agora.getHours();


function AcharHorario(HoraAtual) {
  if (HoraAtual % 3 == 0) {

    return HoraAtual
    
  }else{
    while (HoraAtual % 3 !== 0) {

      HoraAtual++

      if (HoraAtual % 3 == 0) {
        return HoraAtual
      }
    }
  }
 
}

horasDeAgr = AcharHorario(horasDeAgr)


//forecastTimes: Um array com os horários específicos (9h, 12h, 15h e 18h) para os quais a previsão será exibida.
const forecastTimes = [horasDeAgr,9, 12, 15, 18];

//forEach faz com que percorra todos os elementos do arrew 
forecastTimes.forEach(hour => {
    //forecastData.list contém a lista de previsões de tempo
    //Findo compara o numero q ta saindo do retunr e procura para ver se tem na ForecastData
    const forecast = forecastData.list.find(item => {
        const forecastDate = new Date(item.dt * 1000);
        return forecastDate.getHours() === hour;
    });

      //Isso aqui é para pegar as horas e fazer com que a preciptação seja no horario q pessao esteja vendo
      let agora = new Date();
      let horas = agora.getHours();
      console.log(horas+hour);
      
    if (forecast) {
        if (hour==horas) {
          chuva.innerText=`${forecast.pop * 100}%`          
        }
        if (hour === 9) {
            graus9H.innerText = forecast.main.temp+temperatura;
            simboloTempo9H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 12) {
            graus12H.innerText = `${forecast.main.temp+temperatura}`;
            simboloTempo12H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 15) {
            graus15H.innerText = `${forecast.main.temp+temperatura}`;
            simboloTempo15H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        } else if (hour === 18) {
            graus18H.innerText = ` ${forecast.main.temp+temperatura}`;
            simboloTempo18H.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        }
    }
});

};



const AlterarTempoMetropolis = async(temperatura)=>{
  const dataRio = await pegarTempo("Rio de Janeiro");
  const dataSp = await pegarTempo("São Paulo");
  const dataDf = await pegarTempo("Brasília");
rio.innerText =dataRio.main.temp+temperatura;
sp.innerText =dataSp.main.temp+temperatura;
df.innerText =dataDf.main.temp+temperatura;
}








//js do switch 
//Ese DomContent Acontece sempre q a pagina é inciada
document.addEventListener('DOMContentLoaded', function() {






  AlterarTempo('salvador, br','°C')






  const toggle = document.querySelector('#toggle');

  // Verifica o estado inicial do checkbox ao carregar a página
  if (toggle.checked) {
    localStorage.setItem('modoTemperatura',false)
    AlterarTempoMetropolis('°F')
  } else {
    localStorage.setItem('modoTemperatura',true)
    AlterarTempoMetropolis('°C')

  }
  

  //Faz com que altere caso a pessoa clique para mudar
  toggle.addEventListener('change', function() {
    city=localStorage.getItem('city')

    if (this.checked) {
      localStorage.setItem('modoTemperatura',false)
      AlterarTempoMetropolis('°F')
      AlterarTempo(city,'°F')

    } else {
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



 function responsivo() {
  let larguraTela = window.innerWidth;
  
  if (larguraTela < 465) {
    // Redirecionar para a página para telas menores que 600px

    if (window.location.pathname== '/phone.html') {

    }else{
      
      window.location.href = "/phone.html";
    }
    
} else {
    if (window.location.pathname == '/index.html') {

    }else{
      console.log('isso aqui ta funcionando?');

      window.location.href = "/index.html";

    }

}  
}



window.addEventListener('resize',responsivo );

window.addEventListener('DOMContentLoaded',responsivo );
window.addEventListener('load',responsivo );
window.addEventListener('orientationchange',responsivo );