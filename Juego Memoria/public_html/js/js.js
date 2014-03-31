/* 
 * Sergio Waldemar Rodriguez Vasquez
 * Juego de Memoria
 * 03/02/2014
 */
////Se declaran las imagenes
var autos = ["Imagenes/Blanco.jpg", "Imagenes/FuegoAzul.jpg", "Imagenes/Gris.jpg.jpg", "Imagenes/Naranja.jpg.jpg", "Imagenes/Negro.jpg", "Imagenes/Negro.gif.gif"];
///Se declara el Array memory
var memory = new Array();
////Se declaran las variables 
var count = 0;
var found = 0;
var timerId = 0;
////Funcion para iniciar el programa
function initialize() {
    llenarArray();
    contadorTiempo();
}
/////Funcion para Agregar las imagenes
function llenarArray() {
    for (var i = 0; i < autos.length; i++) {
        var Images = new Object();
        Images.src = autos[i];
        Images.position = i;
        memory.push(Images);
    }
    console.log(memory);
    llenarArrayRandom();
}
////Declaracion de los Arreglos para los random
var ArrayControlRandom = new Array();
var ArrayControlRandom2 = new Array();
var boolLLamarCiclo = true;
////Cambio de imagenes de la tabla
function llenarArrayRandom() {
    var intRandom = Math.floor((Math.random() * autos.length) + 0);
    var intRandom2 = Math.floor((Math.random() * autos.length) + 0);
    if (ArrayControlRandom.length === 0) {
        ArrayControlRandom.push(intRandom);
    }
    if (ArrayControlRandom2.length === 0) {
        ArrayControlRandom2.push(intRandom2);
    }
    if (contains(ArrayControlRandom, intRandom) === false && ArrayControlRandom.length < autos.length) {
        ArrayControlRandom.push(intRandom);
    }
    if (contains(ArrayControlRandom2, intRandom2) === false && ArrayControlRandom2.length < autos.length) {
        ArrayControlRandom2.push(intRandom2);
    }
    if (ArrayControlRandom.length === autos.length && ArrayControlRandom2.length === autos.length) {
        boolLLamarCiclo = false;
////Dibujando la tabla
        var content = document.getElementById("content");
        var strHtml = '<table border="5" cellpadding="5" style="position: absolute; top: 15%; left: 2%;"><tr>';
        for (var i = 0; i < ArrayControlRandom.length; i++) {
            console.log("imagen" + i + " contracara" + i);
            strHtml += '<td><img id="imagen' + i + '" height="200" width="200" src="' + memory[ArrayControlRandom[i]].src + '" style="display:none"/>\n\
                                        <img onclick="clickImagen(\'contracara' + i + '\',\'imagen' + i + '\',\'' + memory[ArrayControlRandom[i]].src + '\');" id="contracara' + i + '" heigth="200" width="200" src="Imagenes/cars.png" style="display:  ; height: 35%"  /></td>';
        }
        strHtml += "</tr><tr>";
        var countId = 0;
        for (var i = 0; i < ArrayControlRandom2.length; i++) {
            countId = i + 6;
            strHtml += '<td ><img id="imagen' + countId + '" height="200" width="200" src="' + memory[ArrayControlRandom2[i]].src + '" style="display:none"/>\n\
                                    <img onclick="clickImagen(\'contracara' + countId + '\',\'imagen' + countId + '\',\'' + memory[ArrayControlRandom2[i]].src + '\');" id="contracara' + countId + '" heigth="200" width="200" src="Imagenes/cars.png" style="display: ; height: 35% "  /></td>';
        }
        strHtml += '</tr></table>';
        content.innerHTML = strHtml;
    }
    console.log(ArrayControlRandom);
    if (boolLLamarCiclo === true) {
        setTimeout(llenarArrayRandom, 1);
    }
}
var arrayValidaMemoria = new Array();
var arrayEncontrados = new Array();
var boolValidaPush = true;
function clickImagen(idContracara, idImagen, src) {
    console.log(idContracara + idImagen + src);
    var objArray = new Object();
    objArray.idContracara = idContracara;
    objArray.idImagen = idImagen;
    objArray.src = src;
    if (boolValidaPush === true) {
        arrayValidaMemoria.push(objArray);
        console.log(arrayValidaMemoria);
    }
    if (arrayValidaMemoria.length === 2) {
        boolValidaPush = false;
        if (arrayValidaMemoria[0].src !== arrayValidaMemoria[1].src) {
            $("#" + idContracara + "").css("display", "none");
            $("#" + idImagen + "").css("display", "-webkit-box");
            //Ocultar las imagenes
            setTimeout(function ocultarTarjetas() {
                $("#" + arrayValidaMemoria[0].idContracara + "").css("display", "-webkit-box");
                $("#" + arrayValidaMemoria[0].idImagen + "").css("display", "none");
                $("#" + arrayValidaMemoria[1].idContracara + "").css("display", "-webkit-box");
                $("#" + arrayValidaMemoria[1].idImagen + "").css("display", "none");
                arrayValidaMemoria = new Array();
                boolValidaPush = true;
            }, 200);
            $("#contador").html("" + count);
        } else {
            $("#" + idContracara + "").css("display", "none");
            $("#" + idImagen + "").css("display", "-webkit-box");
            arrayEncontrados.push(arrayValidaMemoria);
            dibujarEncontradas();
            arrayValidaMemoria = new Array();
            console.log(arrayEncontrados);
            boolValidaPush = true;
            $("#contador").html("" + count++);
        }
    } else {
        $("#" + idContracara + "").css("display", "none");
        $("#" + idImagen + "").css("display", "-webkit-box");
        count++;
        $("#contador").html("" + count++);
        fin();
    }
}
function dibujarEncontradas() {
    for (var i = 0; i < arrayEncontrados.length; i++) {
        console.log("dibuja si entra");
        $("#" + arrayEncontrados[0].idContracara + "").css("display", "none");
        $("#" + arrayEncontrados[0].idImagen + "").css("display", "-webkit-box");
    }
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
$(document).ready(function() {
    llenarArrayRandom();
});
function contadorTiempo()
{
    var timer = $("#timer").html();
    timer++;
    $("#timer").html("" + timer);
    if (found < 6)
    {
        timerId = setTimeout('contadorTiempo()', 1000);
    }
}
////Funcion al finalizar el juego y mostrar los resultados
function fin() {
    console.log(arrayEncontrados.lenght === 6);
    if (arrayEncontrados.lenght === 6) {
        alert("si entra");
        msg = '<span id="msg1">Has finalizado el juego en </span>';
        $("#msgContador").prepend(msg);
        msg = '<span id="msg2">Has finalizado el juego en </span>';
        $("#msgTimer").prepend(msg);
    } else {
    }
}
