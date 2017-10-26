/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
// playVideoOnScroll();

function mostrarTodos(){
    $.getJSON("data-1.json", function(data){
        var htmlTodos= '';
        $(data).each(function(index, val){
            htmlTodos+= '<table style="margin-top:10px"><tr>';
                htmlTodos+= '<td style="width: 230px;"><img src="img/home.jpg" height="140"></td>';
                htmlTodos+= '<td>Dirección:'+val.Direccion+
                '<br>Ciudad:'+val.Ciudad+
                '<br>Telefono:'+val.Telefono+
                '<br>Codigo_Postal:'+val.Codigo_Postal+
                '<br>Tipo:'+val.Tipo+
                '<br>Precio:'+val.Precio+
                '</td>';
            htmlTodos+= '</tr></table>';
        });

        $('#verTodos').html(htmlTodos);
    });     
}

function ciudadTipo(){
    $('#formulario select').each(function(){
        $(this).show();
    })

    $.getJSON("data-1.json", function(data){   
        var ciudades = [];
        var tipos = [];     

        $(data).each(function(index, val){
            if (ciudades.includes(val.Ciudad) === false){
                ciudades.push(val.Ciudad) 
            }

            if (tipos.includes(val.Tipo) === false)
                tipos.push(val.Tipo) 
        })

        for (var i = 0; i < ciudades.length; i++) {
            $('#selectCiudad').append('<option value="'+ciudades[i]+'">'+ciudades[i]+'</option>')
        }

        for (var i = 0; i < tipos.length; i++) {
            $('#selectTipo').append('<option value="'+tipos[i]+'">'+tipos[i]+'</option>')
        }        
    });
}

function buscar(){
    $('#formulario').submit(function(){
        $.ajax({
            url: 'buscador.php',
            dataType: 'json',
            type: 'post',
            data: {
                ciudad: $('#selectCiudad').val(),
                tipo: $('#selectTipo').val(),
                rango: $('#rangoPrecio').val()
            }
        }).done(function(data){
            var htmlDatos = '';

            $(data).each(function(key, val){
                htmlDatos+= '<table style="margin-top:10px"><tr>';
                    htmlDatos+= '<td style="width: 230px;"><img src="img/home.jpg" height="140"></td>';
                    htmlDatos+= '<td>Dirección:'+val.dir+
                    '<br>Ciudad:'+val.ciudad+
                    '<br>Telefono:'+val.tel+
                    '<br>Codigo_Postal:'+val.cod_postal+
                    '<br>Tipo:'+val.tipo+
                    '<br>Precio:'+val.precio+
                    '</td>';
                htmlDatos+= '</tr></table>';                
            });

            $('#verTodos').html(htmlDatos)
        });

        return false;
    })
}

// EJECUCUCION DE LAS FUNCIONES
$(function(){
    $('#mostrarTodos').click(function(){        
       mostrarTodos();
    });

    ciudadTipo();
    buscar()
})
