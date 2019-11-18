export class Buscaminas{
    constructor(rows, mines){
        this.bloqueado = false;
        this.acabado = false;
        this.tabla = null;
        this.filas = rows;
        this.nMinas = mines;
        this.matriz = new Array(this.filas);
        this.matrizVista = new Array(this.filas);
        for(let i = 0; i < this.matriz.length; i++){
            this.matriz[i] = new Array(this.filas);
            this.matrizVista[i] = new Array(this.filas);
        }
        this.creaTabla();
        this.colocaMinas();
        this.colocarNumeros();
    }
    rellenarVista(){
        for (let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.filas; j++){
                    this.matriz[i][j] = "-";
            }
        }
    }
    juegoAcabado(){
        return this.bloqueado;
    }
    bloquear(){
        this.bloqueado = true;
    }
    descubrir(fila,columna){
        if(!this.bloqueado){
            this.matrizVista[fila][columna] = this.matriz[fila][columna];
            console.log(this.matrizVista);
            return this.matriz[fila][columna];
        }
    }

    juegoGanado(){
        if(!this.bloqueado){
            let contador = 0;
            for (let i = 0; i < this.filas; i++){
                for(let j = 0; j < this.filas; j++){
                    if(this.matrizVista[i][j] == undefined){
                        contador++;
                    }
                }
            }
            console.log(contador);
            if(contador == this.nMinas){
                this.acabado = true;
                this.bloquear();
                return true;
            }
        }
        return false;
    }

    esMina(fila,columna){
        return this.matriz[fila][columna] == '*';
    }

    esBlanco(fila,columna){
        return this.matriz[fila][columna] == '0';
    }

    getMatrizVista(){
        return this.matrizVista;
    }
    colocaMinas(){
        for(let i = 0; i < this.nMinas; i++){
            let filaAleatoria = parseInt(Math.random()*this.filas);
            let columnaAleatoria = parseInt(Math.random()*this.filas);
            this.matriz[filaAleatoria][columnaAleatoria] == '*' ? i-- : this.matriz[filaAleatoria][columnaAleatoria] = '*';
        }
    }
    descubrirMinas(){
        for (let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.filas; j++){
                if(this.matriz[i][j] == "*"){
                    this.matrizVista[i][j] = this.matriz[i][j];
                    let celda = this.tabla.children[0].children[i].children[j];
                    celda.innerHTML = this.matriz[i][j];
                    celda.style.backgroundColor = "red";
                    celda.style.color = "black";
                }
            }
        }
    }
    getTabla(){
        return this.tabla;
    }
    creaTabla(){
        let tabla = document.createElement("table");
        tabla.id = "juego";
        let tbody = document.createElement("tbody");
        for(let i = 0; i < this.filas; i++){
            let fila = document.createElement("tr");
            for(let j = 0; j < this.filas; j++){
                let celda = document.createElement("td");
                celda.style.backgroundColor = "#949494";
                celda.className = "celda";
                fila.appendChild(celda);
            }
            tbody.appendChild(fila);
        }
        tabla.appendChild(tbody);
        this.tabla = tabla;
    }

    obtenerColindantes(fila,columna){
        let colindantes = new Array();
        colindantes.push(new Array(fila,columna-1));
        colindantes.push(new Array(fila-1,columna-1));
        colindantes.push(new Array(fila-1,columna));
        colindantes.push(new Array(fila-1,columna+1));
        colindantes.push(new Array(fila,columna+1));
        colindantes.push(new Array(fila+1,columna+1));
        colindantes.push(new Array(fila+1,columna));
        colindantes.push(new Array(fila+1,columna-1));
        return colindantes;
    }

    colocarNumeros(){
        for (let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.filas; j++){
                let colindantes = this.obtenerColindantes(i,j);
                let minas = 0;
                let errores = 0;
                for(let k = 0;k<colindantes.length;k++){
                    let fila = colindantes[k][0];
                    let columna = colindantes[k][1];
                    fila<0 || columna<0 || fila>this.filas-1 || columna > this.filas-1 ? errores++ : this.matriz[fila][columna]=="*" ? minas++ : minas=minas;
                }
                if(this.matriz[i][j]!='*'){
                    this.matriz[i][j] = minas;
                }
            }
        }
    }
    
}