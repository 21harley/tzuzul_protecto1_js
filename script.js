/**
 *    Programador:John Llanes, Fecha de creacion:10-02-2022
 */
    let numL=Number(prompt("Ingrese el numero de L de la matriz:"));
    let numA=Number(prompt("Ingrese el numero de A de la matriz:"));
    let tablaH=document.querySelector("#matriz");
    let mensaje=``;


    let botonRercaga=document.querySelector("#recargar");
    botonRercaga.addEventListener("click",()=>{
        location.reload();
    })

    let botonInfo=document.querySelector("#info");
    botonInfo.addEventListener("click",()=>{
        let divInf=document.querySelector("#mostrarInfo");

        if(divInf.innerHTML.length==0){
            botonInfo.innerHTML="Ocultar Solucion";
            divInf.innerHTML=`<img src="solucion.svg" alt="solucion matriz circular">`;
        }else{
            botonInfo.innerHTML="Mostrar Solucion";
            divInf.innerHTML=``;
        }
        
    })

    if(//validar si son datos correctos
      numL!=undefined && (!Number.isNaN(numL))
      &&
      numA!=undefined && (!Number.isNaN(numA))
     ){
        if(numL > 0 && numA > 0){
            //Crear y cargar matriz
            let matriz=[];
            for(let i=0;i<numA;i++){
                matriz[i]=[];
                for(let j=0;j<numL;j++){
                   matriz[i][j]=0;
                }
            }
            //inicio variables
            let casillas=numA*numL,//cantidad de casillas totales a cargar
                iterador=0,        //iterador 
                cambio=1,          //bandera de orden de cada mini ciclo
                ban1=0,            //contador en cada bloque de ciclo
                ban2=false,        //bandera para saber si es sumar o restar
                i=0,j=-1;          //posiciones i y j

            //nota inicia j=-1 porque inicia de iz->der por eso cambio=1
            //cargo matriz    
            do{
              if(cambio==0){
                if(0>numA-ban1) break; 
                for(let c=0;c<numA-ban1;c++){
                    i+=(ban2)?1:(-1);
                    matriz[i][j]=iterador+1;
                    iterador++;
                }
                cambio++;
              } 
              ban2=!ban2;
              if(cambio==1){
                if(0>numL-ban1) break; 
                for(let c=0;c<numL-ban1;c++){
                    j+=(ban2)?1:(-1);
                    matriz[i][j]=iterador+1;
                    iterador++;
                }
                cambio=0;                  
              }
              ban1++;
            }while(iterador<casillas)

            console.log(matriz);
            for( i=0;i<matriz.length;i++){
                mensaje+=`<tr>`;
                for( j=0;j<matriz[i].length;j++){
                    mensaje+=`<th>${matriz[i][j]}</th>`;
                }
                mensaje+=`</tr>`;
            }
        }else{
            console.log("No se puede generar la matriz con un 0");
            mensaje=`<tr>
            <th>No se puede generar la matriz con un 0</th>
            </tr>`;
        } 
    }else{
        console.log("Ingreso mal los datos");
        mensaje=`<tr>
         <th>Ingreso mal los datos</th>
        </tr>`;
    }
    tablaH.innerHTML=mensaje;
