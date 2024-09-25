let apiKey = "b67ce459b64ffeed00b9123a00175cbe"

//Tudo isso aqui q ta igual pega o id das div do html
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

const toggle = document.querySelector('#toggle');


let city = localStorage.getItem('city')
let modoTemperatura =localStorage.getItem('modoTemperatura')


//Isso aqui ta pegando a data atual e exibindo 
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
//faz com q o tempo sempre atualize, pq o site é estatico estão essa fução sempre fica sendo atualizada
setInterval(mostrarHorarioAtual, 1000);



//para caso alguem digite um lugar q nao existe
const exibirErro = () => {
  alert("Esse Lugar nao existe");
};


//Essa função ta fazendo uma requisição da api e transformando em um json para o js conseguir ler, e tbm passa em C° ou em F°
//Nela a gente so precisa passar a cidade/lugar q a gente quer pegar a informação a respeito do tempo
const pegarTempo = async (city) => {
  //Aqui a gente ta pegando qual temperatura esta sendo usada celsius ou fahrenheit
  modoTemperatura=localStorage.getItem('modoTemperatura')

  //ta criando uma variavel
  let apiWeatherURL

  //ta pergundando se a temperatura for "verdadeira" vai ser celsius se nao for vai ser fahrenheit
  if (modoTemperatura=='true'){

    // aqui ele ta requisitando a api e guardando toda a informação na variavel "apiWeatherURL" Nela a gente passa duas informações
    // a cidade (city) e a nossa chave da api (apiKey)
    apiWeatherURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  }else{

    //Mesma logica do de cima, so q em vez de passar as informações em celsius ta passando em fahrenheit
    apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}&lang=pt_br`;
  }

  //o fetch faz uma requisião http para o urlForecast
  const res = await fetch(apiWeatherURL);
  
  //e aqui o a gente ta passando a requisição pra .json q é uma maneira do javaScript conseguir ler as informações da api
  const data = await res.json();

  //e por fim ele retorna todo um conjunto de  informação a respeito de Tempo, e dps a gente vai pegar as informações
  // q a gente quer com um metodo q ta la em baixo do codigo 
  return data;
};


//


//Faz a msm coisa da fumção de cima so q ela é responsavel por pegar qualquer coisa relacionada a  previsões
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





//A função responsavel por atualizar os dados de temperatura de acordo com a cidade escolhida 
const AlterarTempo = async (city,temperatura) => {

  modoTemperatura=localStorage.getItem('modoTemperatura')

  const data = await pegarTempo(city);
  const forecastData = await pegarTempoFuturo(city)

  if (data.cod === "404") {
    exibirErro();
    return;
  }

  
  cidadeEscolhida.innerText =( data.name);

  if (window.location.pathname == '/index.html' || window.location.pathname == '/tablet.html' ) {
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
      if (temperaturaReal>35) {

        alertarImg.src='img/IconeAlarme.png'
        alertaTexto.innerText="calor extremo"
      }else{
        
          alertarImg.src='img/Sun.png'
        alertaTexto.innerText="Temperatura ta de boa"
      }
  }else{
    if (temperaturaReal>95) {
      alertarImg.src='img/IconeAlarme.png'
      alertaTexto.innerText="calor extremo"
    }else{
      
      alertarImg.src='img/Sun.png'
      alertaTexto.innerText="Temperatura ta de boa"
    }

  }




  //forecastTimes: Um array com os horários específicos (9h, 12h, 15h e 18h) para os quais a previsão será exibida.
  const forecastTimes = [horasDeAgr,9, 12, 15, 18];

  //forEach faz com que percorra todos os elementos do arrew 
  forecastTimes.forEach(hour => {
      //forecastData.list contém a lista de previsões de tempo
      //Find o compara o numero q ta saindo do retunr e procura para ver se tem na ForecastData
      //item vai ser um objeto do arrew de forecastData q é da api aonde em forecastData tem todas as previsões de 3 em 3 horas
      //.dt é aonde ta a previsão dentro do objeto item
      //em .dt tem informações em segundos tendo que multiplicador por 1000 para ter as informações em milissegundos
      const forecast = forecastData.list.find(item => {
          const forecastDate = new Date(item.dt * 1000);
          return forecastDate.getHours() === hour;});

           
      horasDeAgr = AcharHorario(horasDeAgr)
      
        
        if (forecast) {
          if (hour==horasDeAgr) {          
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

};//FInal da função principal



const AlterarTempoMetropolis = async(temperatura)=>{
  const dataRio = await pegarTempo("Rio de Janeiro");
  const dataSp = await pegarTempo("São Paulo");
  const dataDf = await pegarTempo("Brasília");
  rio.innerText =dataRio.main.temp+temperatura;
  sp.innerText =dataSp.main.temp+temperatura;
  df.innerText =dataDf.main.temp+temperatura;
}





//Ese DomContent Acontece sempre q a pagina é inciada
document.addEventListener('DOMContentLoaded', function() {




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
  
  //Sempre que troca de resolução reseta o dia escolhido, entao isso faz assegurar q nao vai ser trocado e tbm faz com que caso nao tenha nenhum pais escolhido o primeiro seja salvador
  if (localStorage.getItem('city')==null) {
    AlterarTempo('salvador,br', '°C')
  }else{
    city=localStorage.getItem('city')
    if (modoTemperatura=='true'){
      AlterarTempo(city,"°C");
    }else{
      AlterarTempo(city,"°F");

    }
  }

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



let agora = new Date();
let horasDeAgr = agora.getHours();

//Função para pegar a precitação de chuva pelas proximas no max 3H
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

//Essa função faz com que troque de Pagina dependendo da resolução da pagina e é chamada sempre q a resolução muda
 function responsivo() {
  let larguraTela = window.innerWidth;
  
  if (larguraTela < 465 ) {

    if (window.location.pathname== '/phone.html') {

    }else{
      
      window.location.href = "/phone.html";
    }

  }else if(larguraTela < 892 ){
    if (window.location.pathname == '/tablet.html') {

    }else{

      window.location.href = "/tablet.html";
    }

  }else {
    if (window.location.pathname == '/index.html') {

    }else{

      window.location.href = "/index.html";

    }

  }

}


window.addEventListener('DOMContentLoaded',responsivo );
window.addEventListener('resize',responsivo );
