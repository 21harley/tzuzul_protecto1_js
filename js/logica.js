 export function logicaMatriz(numA,numL,inicioI,inicioJ,cam,ban,tip,dig,valor){
    //cargo matriz
    let matriz=[];
    for(let i=0;i<numA;i++){
        matriz[i]=[];
        for(let j=0;j<numL;j++){
           matriz[i][j]=0;
        }
    }
    //inicio variables
    let casillas=numA*numL,//cantidad de casillas totales a cargar
    iterador=0,            //iterador 
    cambio=cam,            //bandera de orden de cada mini ciclo 1 
    ban1=0,                //contador en cada bloque de ciclo
    ban2=ban,              //bandera para saber si es sumar o restar false 
    tipo=tip,              // 0 iz->der 1 iz->abaj 
    i=inicioI,j=inicioJ;   //posiciones i y j
    //dig= diganal normal o inversa
    //cargo matriz   
    do{
      if(cambio==0){
        if(0>numA-ban1) break; 
        for(let c=0;c<numA-ban1;c++){
            i+=(ban2)?1:(-1);
            matriz[i][j]=valor+1; valor++;
            iterador++;
        }
        cambio++;
      } 
      if(tipo!=1) ban2=!ban2;
      if(cambio==1){
        if(0>numL-ban1) break; 
        for(let c=0;c<numL-(ban1+((tipo==1&&dig==0 || dig==1 && cam==0)?1:0));c++){
            j+=(ban2)?1:(-1);
            matriz[i][j]=valor+1; valor++;
            iterador++;
        }
        cambio=0;                  
      }
      if(tipo==1) ban2=!ban2;
      ban1++;
    }while(iterador<casillas);

    return matriz;
}