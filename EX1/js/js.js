
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$("#escribe_reseña").click(function() {
  if($("#seccion_comentario").hasClass("hidden")){
    $("#seccion_comentario").removeClass("hidden");
  } else {
    $("#seccion_comentario").addClass("hidden");
  }
})

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$.ajax({
  url: "https://tc2026daw.github.io/instrucciones/misc/comentarios.xml",
  type: "GET",
  dataType: "xml",
  success: function(data) {

    let newHtml = '';
    
    $(data).find("comment").each(function(event) {
      newHtml += `
        <div class="review">
          <h2>${$(this).find("name").text()}</h2>
          ${getStarsSpans($(this).find("stars").text())}
          <p>${$(this).find("text").text()}</p>
        </div>
      `;
    });
    $("#seccion_reviews").append(newHtml);
}})

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$("#btn-publicar").click(function() {
  if($("#nombre").val() && $("#comentario").text()){
    $("#seccion_reviews").append('<div class="review">');
    $("#seccion_reviews").append(`<h2>${$("#nombre").val()}</h2>`)
    $("#seccion_reviews").append(`${getStarsSpans($("input[name='rating']:checked").val())}`);
    $("#seccion_reviews").append(`<p>${$("#comentario").text()}</p>`)
    $("#seccion_reviews").append('</div>');
  
    $("#nombre").val("");
    $("#comentario").text("");
    $("#error_comment").addClass("hidden");
  } else {
    $("#error_comment").removeClass("hidden");
  }
})


/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$("#btn-limpiar").click(function() {
  $("#nombre").val("");
  $("#comentario").text("");
})


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
