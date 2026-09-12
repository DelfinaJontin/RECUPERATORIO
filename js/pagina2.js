let obras = [];
let cantidadObras = 0;
let tiempoPorMB=0;
let costoPorMB =0;
//obras cargadas ya 
let obrasCargadas =0;

let divPaso1 = document.querySelector("paso1");
let divPaso2 = document.querySelector("paso2");
let divPaso3 = document.querySelector("paso3");

let inputCantidad = document.querySelector("#input-cantidad");
let inputTiempoMB = document.querySelector("input-costo-MB");
let btnConfirmarConfig = document.querySelector("#btn-confirmar-config");
let mensajeConfig = document.querySelector("#mensaje-config");

let mensajeProgreso = document.querySelector("#mensaje-progreso");
let inputNombreObra = document.querySelector("#input-nombre-obra");
let inputDuracionObra = document.querySelector("#input-duracion-obra")
let inputPesoObra = document.querySelector("#input-peso-obra");
let btnAgregarObra = document.querySelector("#btn-agregar-obra");
let mensajeObra = document.querySelector("#mensaje-obra");
let listaObras = document.querySelector("#lista-obras");

let btnCalcular = document.querySelector("#btn-calcular");
let divResultados = document.querySelector("#resultados");
let btnReiniciar = document.querySelector("#btn-reiniciar");

//paso1
btnConfirmarConfig.addEventListener("click", function () {
    let cantidadIngresada = Number(inputCantidad.value);
    let tiempoIngresado = Number(inputTiempoMB.value);
    let costoIngresado = Number(inputCostoMB.value);
    if (inputCantidad.value === "" || isNaN(cantidadIngresada) || cantidadIngresada <= 0) {
        mensajeConfig.innerText = "Ingresá una cantidad de obras válida (mayor a 0).";
    } else if (inputTiempoMB.value === "" || isNaN(tiempoIngresado) || tiempoIngresado <= 0) {
        mensajeConfig.innerText = "Ingresá un tiempo de transferencia por MB válido (mayor a 0).";
    } else if (inputCostoMB.value === "" || isNaN(costoIngresado) || costoIngresado < 0) {
        mensajeConfig.innerText = "Ingresá un costo de almacenamiento por MB válido.";
    } else {
        cantidadObras = cantidadIngresada;
        tiempoPorMB = tiempoIngresado;
        costoPorMB = costoIngresado;
        mensajeConfig.innerText = "";

        divPaso1.style.display = "none";
        divPaso2.style.display = "block";

        actualizarMensajeProgreso();
    }
});
//2
btnAgregarObra.addEventListener("click", function () {
    let nombreIngresado = inputNombreObra.value;
    let duracionIngresada = Number(inputDuracionObra.value);
    let pesoIngresado = Number(inputPesoObra.value);

    if (nombreIngresado === "") {
        mensajeObra.innerText = "Ingresá el nombre de la obra.";
    } else if (isNaN(duracionIngresada) || duracionIngresada <= 0) {
        mensajeObra.innerText = "Ingresá una duración válida (mayor a 0).";
    } else if (isNaN(pesoIngresado) || pesoIngresado <= 0) {
        mensajeObra.innerText = "Ingresá un peso de archivo válido (mayor a 0).";
    } else {
        let nuevaObra = {
            nombre: nombreIngresado,
            duracion: duracionIngresada,
            peso: pesoIngresado
        };
        obras.push(nuevaObra);
        obrasCargadas = obrasCargadas + 1;
        mensajeObra.innerText = "";

        actualizarListaObras();

        inputNombreObra.value = "";
        inputDuracionObra.value = "";
        inputPesoObra.value = "";

        actualizarMensajeProgreso();

        if (obrasCargadas === cantidadObras) {
            divPaso2.style.display = "none";
            divPaso3.style.display = "block";
        }
    }
});
//cuantas obras faltan cargar
function actualizarMensajeProgreso() {
    let faltantes = cantidadObras - obrasCargadas;
    mensajeProgreso.innerText = "Obras cargadas: " + obrasCargadas + " de " + cantidadObras + " (faltan " + faltantes + ")";
}
function actualizarListaObras() {
    let i;
    let htmlLista = "";

    for (i = 0; i < obras.length; i++) {
        htmlLista += "<li>" + obras[i].nombre + " - " + obras[i].duracion + " min - " + obras[i].peso + " MB</li>";
    }

    listaObras.innerHTML = htmlLista;
}
function redondear(numero) {
    return Math.round(numero * 100) / 100;
}
//3
btnCalcular.addEventListener("click", function () {
    let duracionTotal = 0;
    let pesoTotal = 0;
    let indiceMayorDuracion = 0;
    let i;

    for (i = 0; i < obras.length; i++) {
        duracionTotal = duracionTotal + obras[i].duracion;
        pesoTotal = pesoTotal + obras[i].peso;

        if (obras[i].duracion > obras[indiceMayorDuracion].duracion) {
            indiceMayorDuracion = i;
        }
    }
    let duracionPromedio = duracionTotal / obras.length;
    let obraMayorDuracion = obras[indiceMayorDuracion];
    let tiempoTransferenciaObraMayor = obraMayorDuracion.peso * tiempoPorMB;

    let costoMensual = pesoTotal * costoPorMB;
    let presupuestoAnual = costoMensual * 12;

    let htmlResultados = "";
    htmlResultados += "<p><span class='destacado'>Duración total:</span> " + redondear(duracionTotal) + " minutos</p>";
    htmlResultados += "<p><span class='destacado'>Duración promedio:</span> " + redondear(duracionPromedio) + " minutos</p>";
    htmlResultados += "<p><span class='destacado'>Obra de mayor duración:</span> " + obraMayorDuracion.nombre + " (" + obraMayorDuracion.duracion + " min)</p>";
    htmlResultados += "<p><span class='destacado'>Tiempo de transferencia de esa obra:</span> " + redondear(tiempoTransferenciaObraMayor) + " ms</p>";
    htmlResultados += "<p><span class='destacado'>Presupuesto necesario para 1 año:</span> $" + redondear(presupuestoAnual) + "</p>";

    divResultados.innerHTML = htmlResultados;

    btnCalcular.style.display = "none";
    btnReiniciar.style.display = "block";
});
//para einiciar
btnReiniciar.addEventListener("click", function () {
    obras = [];
    cantidadObras = 0;
    tiempoPorMB = 0;
    costoPorMB = 0;
    obrasCargadas = 0;

    inputCantidad.value = "";
    inputTiempoMB.value = "";
    inputCostoMB.value = "";
    inputNombreObra.value = "";
    inputDuracionObra.value = "";
    inputPesoObra.value = "";

    mensajeConfig.innerText = "";
    mensajeObra.innerText = "";
    mensajeProgreso.innerText = "";
    listaObras.innerHTML = "";
    divResultados.innerHTML = "";
     divPaso1.style.display = "block";
    divPaso2.style.display = "none";
    divPaso3.style.display = "none";

    btnCalcular.style.display = "block";
    btnReiniciar.style.display = "none";
});

