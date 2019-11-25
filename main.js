import {Buscaminas} from "./buscaminas.js";

var tiempoInicio, tiempoFin;
function descubrirColindantes(fila,columna){
    let colindantes = buscaminas.obtenerColindantes(fila,columna);
    colindantes.forEach((colindante)=>{
        let fila = colindante[0];
        let columna = colindante[1];
        let matriz = buscaminas.getMatrizVista();
        if (fila>=0 && columna>=0 && fila<=9 && columna<= 9 && matriz[fila][columna] == undefined){
            descubrirCelda(fila,columna);
        }
    });
}

function hayBandera(fila,columna){
    let tabla = buscaminas.getTabla();
    let celda = tabla.children[0].children[fila].children[columna];
    if(celda.innerHTML.includes("🚩")){
        return true;
    }
    else{
        return false;
    }
}
function colocarBandera(fila,columna){
    if(!buscaminas.juegoAcabado()){
        let tabla = buscaminas.getTabla();
        let celda = tabla.children[0].children[fila].children[columna];
        if(hayBandera(fila,columna)){
            celda.innerHTML = "";
        }
        else if(celda.innerHTML == "" && celda.style.backgroundColor != "lightgrey"){
            celda.innerHTML = "🚩";
        }
    }
}

function descubrirCelda(fila,columna){
    if(!buscaminas.juegoAcabado() && !hayBandera(fila,columna)){
        let queHay = buscaminas.descubrir(fila,columna);
        if(buscaminas.esBlanco(fila,columna)){
            descubrirColindantes(fila,columna);
        }       
        if(buscaminas.esMina(fila,columna)){
            buscaminas.descubrirMinas();
            buscaminas.bloquear();
            acabar();
        }
        let tabla = buscaminas.getTabla();
        let celda = tabla.children[0].children[fila].children[columna];
        celda.innerHTML = queHay;
        switch(queHay){
            case 0:
                celda.innerHTML = "";
                celda.style.backgroundColor = "lightgrey"; 
                break;
            case 1:
                celda.style.color = "blue";
                break;
            case 2:
                celda.style.color = "green";
                break;
            case 3:
                celda.style.color = "red";
                break;
            case 4:
                celda.style.color = "darkblue";
                break;
            case "*":
                celda.style.backgroundColor = "red";
                celda.style.color = "black";                   
        }
        if(buscaminas.juegoGanado()){
            juegoGanado();
        }
    }
}

function juegoGanado(){
    document.getElementById("menu-titulo").innerHTML = "<h3 id=\"menu-titulo\">Has ganado!</h3>";
    document.getElementById("fondomenu").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "visible";
    let boton = document.createElement('button');
    boton.id = "botonReiniciar";
    let texto = document.createTextNode("Jugar de nuevo");
    boton.appendChild(texto);
    boton.onclick = iniciarJuego;
    document.getElementById("menu").appendChild(boton);
}

function acabar(){
    document.getElementById("menu-titulo").innerHTML = "<h3 id=\"menu-titulo\">Has perdido...</h3>";
    document.getElementById("fondomenu").style.visibility = "visible";
    document.getElementById("menu").style.visibility = "visible";
    let boton = document.createElement('button');
    boton.id = "botonReiniciar";
    let texto = document.createTextNode("Jugar de nuevo");
    boton.appendChild(texto);
    boton.onclick = iniciarJuego;
    document.getElementById("menu").appendChild(boton);
}

function iniciarJuego(){
    document.getElementById("fondomenu").style.visibility = "hidden";
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("botonReiniciar").remove();
    buscaminas = new Buscaminas(10,10);
    document.getElementById("buscaminasVista").innerHTML = "";
    document.getElementById("buscaminasVista").appendChild(buscaminas.getTabla());
    var celdas = document.getElementsByClassName("celda");
    function click(event){
        tiempoInicio = new Date();
    }
    for(let i = 0; i< celdas.length; i++){
        //celdas[i].onclick = click;
        celdas[i].onmousedown = click;
        celdas[i].onmouseup = soltado;
        celdas[i].oncontextmenu = click;
    }

    function soltado(event){
        event.preventDefault();
        tiempoFin = new Date();
        let diferencia = tiempoFin - tiempoInicio;
        let tabla = event.parentElement;
        let fila = event.target.parentElement.rowIndex;
        let columna = event.target.cellIndex;
        if(diferencia >= 1000){
            colocarBandera(fila,columna);
        }else if(event.button == 2){
            colocarBandera(fila,columna);
        }
        else{
            descubrirCelda(fila,columna);
        }
    }
    document.getElementById("time").innerHTML = "0:0:0";
    function aumentarSegundos(){
        let tiempo = document.getElementById("time").innerHTML.split(":");
        let minutos = parseInt(tiempo[0]);
        let segundos = parseInt(tiempo[1]);
        let centesimas = parseInt(tiempo[2]);
        if(centesimas == 59){
            centesimas = 0;
            if(segundos == 59){
                segundos = 0;
                minutos++;
            }
            else{
                segundos++;
            }    
        }else{
            centesimas++;
        }
        minutos = minutos<=9 ? "0"+minutos : ""+minutos;
        segundos = segundos<=9 ? "0"+segundos : ""+segundos;
        centesimas = centesimas<=9 ? "0"+centesimas : ""+centesimas;
        if(!buscaminas.juegoAcabado()){
            document.getElementById("time").innerHTML = minutos+":"+segundos+":"+centesimas;
        }
        else{
            clearInterval(intervalo);
        }
    }
    var intervalo = setInterval(aumentarSegundos,10);
    }

var buscaminas;
iniciarJuego();

//document.getElementById("buscaminasVista").appendChild(buscaminas.getTabla());