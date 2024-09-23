function responsivo() {
  let larguraTela = window.innerWidth;
  console.log('aaa');
  
  if (larguraTela < 465) {
    // Redirecionar para a página para telas menores que 600px
    
    if (window.location.pathname== '/phone.html') {
      
    }else{
      window.location.href = "/phone.html";
    }
    
} else {
    if (window.location.pathname == '/index.html') {
        console.log("Ta Dizendo q ta certo");
        
    }else{
      window.location.href = "/index.html";
    }

}  
}


window.addEventListener('resize',responsivo );
window.addEventListener('DOMContentLoaded',responsivo );
window.addEventListener('load',responsivo );
window.addEventListener('orientationchange',responsivo );