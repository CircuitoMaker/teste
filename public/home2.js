 
 var musica0 ={
   artista:"OneRepublic",
   musica: "Counting Stars",
   album:"Native",
   imagem:"https://i1.sndcdn.com/artworks-000040814493-eu3kr3-t500x500.jpg",
   genero:"Rock",
   endereco:"end",
   preco:"2,99",
   relevancia:0
};

var musica1 ={
   artista:"Seether",
   musica: "Hang On",
   album:"Disclaimer ll",
   imagem:"https://i.ytimg.com/vi/DhCHniOZC6s/0.jpg",
   genero:"Rock",
   endereco:"end",
   preco:"2,99",
   relevancia:0
};

var musica2 ={
   artista:"Rammstein",
   musica: "Rosenrot",
   album:"Rosenrot",
   imagem:"https://m.media-amazon.com/images/I/41-ADvqGMFL._AC_.jpg",
   genero:"Metal",
   endereco:"end",
   preco:"2,99",
   relevancia:0
};


var musica3 ={
   artista:"Charlie Brown Jr",
   musica: "Confisco",
   album:"Acústico MTV",
   imagem:"https://i.ytimg.com/vi/26n5o0QJILQ/mqdefault.jpg",
   genero:"Rock",
   endereco:"end",
   preco:"2,99",
   relevancia:0
};

var musica4 ={
   artista:"Detonautas",
   musica: "Melhor plantar o bem",
   album:"Melhor plantar o bem",
   imagem:"https://i.ytimg.com/vi/vzvMKWS2rf4/maxresdefault.jpg",
   genero:"Rock",
   endereco:"end",
   preco:"2,99",
   relevancia:0
};


var musicas = [musica0,musica1,musica2,musica3,musica4]
   



   let contPlayPause = false;
function playPause(){
     let labelPlayPause = document.getElementById('playPauseBtn')
     //let playPause =document.getElementById('playPause')

     if(contPlayPause == false){
        document.getElementById('player').play()
        labelPlayPause.innerHTML="Pause";
     //playPause.src"/img/player-img/play2.png"
      }
    else{
        document.getElementById('player').pause()
        labelPlayPause.innerHTML="Play";
     }
     contPlayPause =! contPlayPause;  
}


function move(valor){
   var elem = document.getElementById("myBar");
   var width = valor;
   elem.style.width = width + "%";

}


setInterval(function() { 

   var duracaoMusica = document.getElementById('player').duration;
   var tempoAtual = document.getElementById('player').currentTime;
   var tempoTotalLabel = "00:00"; 
   var tempoDecorridoLabel = "00:00"

// Converte o tempo total da musica "de segundos" para "minutos e segundos"   
var minT = parseInt(duracaoMusica /60)
var segT = parseInt(duracaoMusica %60)
var minTStr = "00" 
var segTStr = "00"

if(minT <= 9){
   minTStr = "0" + minT
}else{
   minTStr = minT
}

if(segT <= 9){
segTStr = "0" + segT
}else{
segTStr = segT
}



tempoTotalLabel = minTStr + ":" + segTStr 
if(tempoTotalLabel == "NaN:NaN"){tempoTotalLabel = "00:00"}

// Converte o tempo DECORRIDO da musica "de segundos" para "minutos e segundos" 
var minD = parseInt(tempoAtual /60)
var segD = parseInt(tempoAtual %60)
var minDStr = "00" 
var segDStr = "00"

if(minD <= 9){
   minDStr = "0" + minD
}else{
   minDStr=minD;
}

if(segD <= 9){
segDStr = "0" + segD;
}else{
segDStr=segD
}

 tempoDecorridoLabel = minDStr + ":" + segDStr 

    document.getElementById('timer').innerHTML = tempoDecorridoLabel + " / " + tempoTotalLabel
 


    if(tempoAtual >= duracaoMusica){
        // chama a proxima musica
        window.location.href = "/incrementa"; 
 }

 // Movimenta a progressBar
var tempoAtualBar = parseInt(document.getElementById('player').currentTime); 
var aux =  100/duracaoMusica ;
var porcentagem =  tempoAtualBar * aux;
move(porcentagem);

}, 1000);



// controlar o volume com as teclas up e down
document.addEventListener("keydown", function(apertar){
if(apertar.key === "a"){
   window.alert("vc pressionou" + apertar.key)
}

if(apertar.key === "ArrowUp"){
   document.getElementById('player').volume+=0.1
}
if(apertar.key === "ArrowDown"){
   document.getElementById('player').volume-=0.1
}

if(apertar.key === "Enter"){
   playPause()
}

if(apertar.key === "ArrowRight"){
   window.location.href = "/incrementa";
}

if(apertar.key === "ArrowLeft"){
   window.location.href = "/decrementa";
}


//window.alert("vc pressionou = " + apertar.key)

})




// hamburger

const btnMobile = document.getElementById("btn-mobile")

function toggleMenu(event){
    if(event.type==="touchstart"){
      event.preventDefault()
   }
    const nav = document.getElementById("nav")
    nav.classList.toggle("active")
    const active=nav.classList.contains('active')
    event.currentTarget.setAttribute('aria-expanded',active)
   
    if(active){ 
      event.currentTarget.setAttribute('aria-label','Fechar Menu')
   }else{
      event.currentTarget.setAttribute('aria-label','Abrir Menu')
   }
}

btnMobile.addEventListener("click", toggleMenu)
btnMobile.addEventListener("touchstart", toggleMenu)