let obras = [
{imagen:"../multimedia/bigsience.webp", nombre: "Big Science", anio:1982},
{imagen:"../multimedia/OSuperman.webp", nombre: "O Superman", anio:1981},
{imagen:"../multimedia/misterheartbreak.webp", nombre: "Mister Heartbreak", anio:1984},
{imagen:"./multimedia/HomeoftheBrave.webp", nombre: "Hom of the Brave", anio:1986},
{imagen:"../multimedia/strangeAngels.webp", nombre: "Strange Angels", anio:1989}
];
let contenedorGaleria = document.querySelector("#galeria");
//para saber si la galeria esta en diseño grande o no
let diseñoGrande = false;
function generarGaleria() {
    let i;
    let htmlGaleria = "";
    for (i = 0; i < obras.length; i++) {
        htmlGaleria +="<div class='obra'>";
        htmlGaleria +="img src='" + obras [i].imagen + "'alt ='" + obras[i].nombre + "'>";
        htmlGaleria += "<h4>" + obras[i].nombre + "<h4>";
        htmlGaleria +="<p>Año: "+obras[i].anio + "</p>";
        htmlGaleria += "</div>"
    }
    contenedorGaleria.innerHTML = htmlGaleria
}
//esto genera el HTML a partir del array de obras, revisar que este bien

generarGaleria();
//carga la galeria cuando carga la pagina
//cambia el color y diseño
let botonDiseño = document.querySelectorAll("#btn-cambiar-disenio");
botonDiseño.addEventListener("click", function() {
    let listaDivsObra = document.querySelectorAll(".obra");
    let j;
    if(disenioGrande === false) {
        //dis grande
        for(j = 0; j< listaDivsObra.length; j++) {
            listaDivsObra[j].style.maxWidth = "22rem";
            listaDivsObra[j].style.backgroundColor = "#2c2c54";
            listaDivsObra[j].style.color = "#ffffff";
        }
        disenioGrande = true;
    } else {
        //dis original
        for (j = 0; j < listaDivsObra.length; j++) {
            listaDivsObra[j].style.maxWidth ="15rem";
            listaDivsObra[j].style.backgroundColor= "#f5f6fa";
            listaDivsObra[j].style.color = "#000000";
        }
        disenioGrande= false
    }
});
