Square = {
	row: 0,
	column: 0,
	state: "closed", //Pode ser: closed, opened, flagged
	hasMine: false,
	nearMines: 0, //Número de minas em volta
}
 
function retornaMatriz(numLinhas, numColunas){
    let matSquares = [];

    for(let i = 0; i < numLinhas; i++){
        matSquares[i] = [];
        for(let j = 0; j < numColunas; j++){
            matSquares[i][j] = {
                ...Square,
                row : i,
                column : j,
                };
        }
    }
    return matSquares;
}

function sorteiaMinas(matriz, quantMinas){
    let quantAtualMinas = 0;
    while(quantAtualMinas < quantMinas){
        
        let linhaSorteada = parseInt(Math.random() * matriz.length);
        let colunaSorteada = parseInt(Math.random() * matriz[0].length);
        if(!matriz[linhaSorteada][colunaSorteada].hasMine){
            matriz[linhaSorteada][colunaSorteada].hasMine = true;
            quantAtualMinas++;
        }

    }
    
}

function minasAdjacentes(matriz, nLinha, nColuna){
    let cont = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
           
         const vizinhoLinha = nLinha + i;
            const vizinhoColuna = nColuna + j;

            if (vizinhoLinha >= 0 && vizinhoLinha < matriz.length && vizinhoColuna >= 0 && vizinhoColuna < matriz[0].length) {
                if (matriz[vizinhoLinha][vizinhoColuna].hasMine) {
                    cont++;

                }
            }
        }
    matriz[nLinha][nColuna].nearMines = cont;
       
    }
   
    }

    function contarBombas(matriz){
        for(let i = 0; i < matriz.length; i++){
            for(let j = 0; j < matriz[0].length; j++){
                minasAdjacentes(matriz, i, j);
            }
        }
    }

    function imprimirMatriz(matriz){ // resolver: console pula linha
        
        for(let i = 0; i < matriz.length; i++){
            let textoLinha = " ";
            for(let j = 0; j < matriz[0].length; j++){
                if(matriz[i][j].hasMine){
                    textoLinha += " [*] ";
                    //console.log(" [*] ");
                }
                else{
                    textoLinha += " [";
                    textoLinha += matriz[i][j].nearMines;
                    textoLinha += "] "
                }
            }
            console.log(textoLinha);

        }
        console.log();
    }


    const campoMinado = retornaMatriz(3,3);

    const gabaritoCampoMinado = JSON.parse(JSON.stringify(campoMinado));


    sorteiaMinas(gabaritoCampoMinado, 4);
    contarBombas(gabaritoCampoMinado);

    imprimirMatriz(campoMinado);
    imprimirMatriz(gabaritoCampoMinado);

    