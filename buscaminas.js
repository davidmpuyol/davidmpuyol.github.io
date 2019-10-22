class Buscaminas{
    constructor(rows, mines){
        this.filas = rows;
        this.nMinas = mines;
        this.matriz = new Array(this.filas);
        this.matrizVista = new Array(this.filas);
        for(let i = 0; i < this.matriz.length; i++){
            this.matriz[i] = new Array(this.filas);
            this.matrizVista[i] = new Array(this.filas);
        }
        this.colocaMinas();
        this.colocarNumeros();
    }
    rellenarVista(){
        for (let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.filas; j++){
                    this.matriz[i][j] = {valor: "-", descubierto:false};
                }
            }
        }
    descubrir(fila,columna){
        //console.log(fila,columna);
        this.matrizVista[fila][columna] = this.matriz[fila][columna];
        //this.actualizaVista();
        if(this.esBlanco(fila,columna)){
            this.descubrirColindantes(fila,columna);
        }
        this.actualizaVista();

    }

    esMina(fila,columna){
        if(this.matriz[fila][columna] == '*')
            return true;
        return false;
    }

    esBlanco(fila,columna){
        if(this.matriz[fila][columna] == '0')
            return true;
        return false;
    }

    descubrirColindantes(fila,columna){
        let colindantes = this.obtenerColindantes(fila,columna);
        colindantes.forEach((colindante)=>{
            let fila = colindante[0];
            let columna = colindante[1];
            if (fila>=0 && columna>=0 && fila<=9 && columna<= 9 && this.matrizVista[fila][columna] == undefined){
                this.descubrir(fila,columna);
            }
        });
    }

    colocaMinas(){
        for(let i = 0; i < this.nMinas; i++){
            let filaAleatoria = parseInt(Math.random()*this.filas);
            let columnaAleatoria = parseInt(Math.random()*this.filas);
            if(this.matriz[filaAleatoria][columnaAleatoria] == '*'){
                i--;
            }
            else{
                this.matriz[filaAleatoria][columnaAleatoria] = '*';
            }
        }
    }

    actualizaTabla(){
        let tabla = "<table>";
        for(let i = 0; i < this.filas; i++){
            tabla += "<tr>"
            for(let j = 0; j < this.filas; j++){
                tabla += (typeof this.matriz[i][j] == "undefined" ? "<td>0</td>" : "<td>"+this.matriz[i][j]+"</td>");
            }
            tabla += "</tr>"
        }
        tabla += "</table>"
        document.getElementById("buscaminas").innerHTML = tabla;
    }

    actualizaVista(){
        let tabla = "<table>";
        for(let i = 0; i < this.filas; i++){
            tabla += "<tr>"
            for(let j = 0; j < this.filas; j++){
                tabla += (typeof this.matrizVista[i][j] == "undefined" ? "<td>-</td>" : "<td>"+this.matrizVista[i][j]+"</td>");
            }
            tabla += "</tr>"
        }
        tabla += "</table>"
        document.getElementById("buscaminasVista").innerHTML = tabla;
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

var buscaminas = new Buscaminas(10,10);
buscaminas.actualizaVista();
//buscaminas.actualizaTabla();