/**
 *    Programador:John Llanes, Fecha de inicio:10-02-2022, Fecha de ultima modificacion:15-02-2022
 */

    let botonRercaga=document.querySelector("#recargar");
    botonRercaga.onclick = ()=>{
        cargarMatriz();
    }

    let botonInfo=document.querySelector("#info");
    botonInfo.onclick = ()=>{
        let divInf=document.querySelector("#mostrarInfo");

        if(divInf.innerHTML.length==0){
            botonInfo.innerHTML="Ocultar Solucion";
            divInf.innerHTML=`<img src="solucion.svg" alt="solucion matriz circular">`;
        }else{
            botonInfo.innerHTML="Mostrar Solucion";
            divInf.innerHTML=``;
        }   
    }
    
    function logicaMatriz(numA,numL,inicioI,inicioJ,cam,ban,tip,dig,valor){
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
    let numeroI=0;
    function cargarMatriz(){
        //validar si existe boton efecto
        let botonEfecto=document.querySelector("#efecto");
        if(botonEfecto){
            const padre=botonEfecto.parentNode;
            padre.removeChild(botonEfecto);
        };
        
        //cargo datos de matriz
        let numL=Number(prompt("Ingrese el numero de L de la matriz:"));
        let numA=Number(prompt("Ingrese el numero de A de la matriz:"));
        let tablaH=document.querySelector("#matriz");
        let mensaje=``;
        let estado=true;

        if(//validar si son datos correctos
          numL!=undefined && (!Number.isNaN(numL))
          &&
          numA!=undefined && (!Number.isNaN(numA))
         ){
            if(numL > 0 && numA > 0){
            let datos=document.querySelector(".form");
            let tipoGiro=[
              [
                [numA,numL,-1,0,0,true,1,0],[numA,numL,0,-1,1,false,0,0]
              ],
              [
                [numA,numL,numA,numL-1,0,false,1,0],[numA,numL,numA-1,numL,1,true,0,0]
              ],
              [
                [numA,numL,numA,0,0,false,0,1],[numA,numL,numA-1,-1,1,true,1,1]
              ],
              [
                [numA,numL,0,numL,1,false,1,1],[numA,numL,-1,numL-1,0,true,0,1]
              ]
            ];

            let giro   =Number(datos.giro.value),
                esquina=Number(datos.esquina.value),
                valorI =Number(datos.valorI.value);
            numeroI=valorI;

            let matriz=[];
            matriz=logicaMatriz(...tipoGiro[esquina-1][giro-1],valorI);
            
            //mostrar matriz en html
            for( i=0;i<matriz.length;i++){
                mensaje+=`<tr>`;
                for( j=0;j<matriz[i].length;j++){
                    mensaje+=`<th class="item-matriz">${(matriz[i][j]<10)?"0"+matriz[i][j]:matriz[i][j]}</th>`;
                }
                mensaje+=`</tr>`;
            }
            
            }else{
                console.log("No se puede generar la matriz con un 0");
                mensaje=`<tr>
                <th>No se puede generar la matriz con un 0</th>
                </tr>`;
                estado=false;
            } 
        }else{
            console.log("Ingreso mal los datos");
            mensaje=`<tr>
             <th>Ingreso mal los datos</th>
            </tr>`;
            estado=false;
        }
        tablaH.innerHTML=mensaje;
        if(estado) efectoMatriz();
         /*
        let tiempo=(100*numA*numL)+100;//calculo tiempo antes de aparecer boton
        let mostrarBoton=setInterval(()=>{
            //creo boton
            let boton=document.createElement("button");
            boton.classList.add("btn-efecto");
            boton.innerHTML="Ver efecto";
            boton.setAttribute('id','efecto');

            boton.onclick = () =>{
                boton.disabled=true;
                efectoMatriz();
            } 

            const padre=tablaH.parentNode;
            padre.insertBefore(boton,tablaH.nextSibling);
            clearInterval(mostrarBoton);   
        },tiempo);
        */
    }

    function efectoMatriz(){
        let contador=numeroI;
        let arg=document.querySelectorAll(".item-matriz");

        eliminarActive();

        if(arg.length>0){
            let lista=setInterval(()=>{
                if((arg.length+numeroI)==contador){
                    let boton=document.querySelector("#efecto");
                    if(boton) boton.disabled=false;
                    clearInterval(lista);
                }
                contador+=1;
                 for(let i=0;i<arg.length;i++){
                     if(contador==Number(arg[i].innerHTML)){
                         arg[i].classList.add("active");
                         break;
                     }
                 }
             },50);
        }
    }

    function eliminarActive(){
        let act=document.querySelectorAll(".active");
        act.forEach((el)=>{
          el.classList.remove("active");
        })
    }
