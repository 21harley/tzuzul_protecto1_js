/**
 *    Programador:John Llanes, Fecha de inicio:10-02-2022, Fecha de ultima modificacion:22-02-2022
 */
    import {cargarMatriz} from "./visual.js"    

    let botonRercaga=document.querySelector("#recargar");
    botonRercaga.onclick = ()=>{
        cargarMatriz();
    }

    let botonInfo=document.querySelector("#info");
    botonInfo.onclick = ()=>{
        let divInf=document.querySelector("#mostrarInfo");

        if(divInf.innerHTML.length==0){
            botonInfo.innerHTML="Ocultar Solucion";
            divInf.innerHTML=`<img src="svg/solucion.svg" alt="solucion matriz circular">`;
        }else{
            botonInfo.innerHTML="Mostrar Solucion";
            divInf.innerHTML=``;
        }   
    }
    