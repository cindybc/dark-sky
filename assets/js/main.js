$(document).ready(function(){
    //Al hacer click al boton  se generaran todos los datos.
    $('#btn-Prediccion').click(function(){
        //Hay que vaciar todos los id en donde genere info mas abajo
        $('#lugar').html(' ');
        $('#iconoClima').html(' ');
        $('#temperatura').html(' ');
        $('#clima').html(' ');
        $('#dia1').html(' ');
        $('#dia2').html(' ');
        $('#dia3').html(' ');
        $('#dia4').html(' ');
        $('#dia5').html(' ');

        //Tomo el valor de los input que ingresaron.
        var ciudad = $('#ciudad').val();
        var pais = $('#pais').val();
          
        //Tome la API de google Map Geocoding, la cual me ayuda a generar la latitud y longitud, dependiendo de lo que el ususario ingreso.
        $.ajax({
  	        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + ciudad + ',+'+ pais + '&key=AIzaSyBGdYsZ1oBPpOcVNqdzHtYeQrpQ0k37AQw',
  	        type: 'GET',
  	        dataType: 'json',
 
        })
        .done(function(res) {
  	    //console.log(res);
  	        //Tomo el recultado de lo que genero la API y recorro el Json para poder encontrar la latitud y longitud de lo que ingreso el usuario.	
  	        res.results.forEach(function(ele){
  		    //console.log(ele);
  		        var geo= ele.geometry;
  		        var localizacion= geo.location;
  		        var latitud = localizacion.lat;//Latitud del dato ingresado en input.
  		        //console.log(latitud);
  		        var longitud= localizacion.lng;//Longitud del dato ingresado en input.
  		        //console.log(longitud);	
  		        var lugar= ele.formatted_address;//Lugar que genero con los datos(Ciudad,Región,País).
  		        //console.log(lugar);
      
                //Tomo la API de Dark Sky ingresandole los datos generados mas arriba de latitud y longitud.
                $.ajax({
  	                url: 'https://api.darksky.net/forecast/02749d2413fe27d71ba6799186cbed93/' + latitud + ',' + longitud, 
  	                type: 'GET',
  	                dataType: 'jsonp',
 
                })
                .done(function(dark) {
  	               console.log(dark);
  	                //Tomo el resultado que me genero la API y recorro el Json para encontrar los valores del clima.
                    var el= dark.currently; //sub-dato.
                    //Tomo de Json el icono
                    var icon = el.icon;
                    //console.log(icon);

                    //Crear etiqueta img para incorporar iconos de carpeta iconos.
                    var parcialNubladoDia = $('<img/>', {'src' : 'iconos/sun_simple_cloudy.png'});
                    var parcialNubladoNoche = $('<img/>', {'src' : 'iconos/moon_cloudy.png'});
                    var nublado = $('<img/>', {'src' : 'iconos/cloud.png'});
                    var aguaNieve = $('<img/>', {'src' : 'iconos/cloud_snow.png'});
                    var nieve = $('<img/>', {'src' : 'iconos/snowflake.png'});
                    var lluvia = $('<img/>', {'src' : 'iconos/rain.png'});
                    var sol =  $('<img/>', {'src' : 'iconos/sun.png'});
                    var luna = $('<img/>', {'src' : 'iconos/moon.png'});


                    //Tome el valor que me dio el icono del Json y lo asocio a un icono de mi carpeta iconos, y los incorporo como una etiqueta de img creada mas arriba.
                    if(icon == 'partly-cloudy-day'){
        	            $('#temperatura').append(parcialNubladoDia);
                    }else if(icon == 'partly-cloudy-night'){
        	            $('#temperatura').append(parcialNubladoNoche);
                    }             else if(icon == 'cloudy'){
        	            $('#temperatura').append(nublado);
                    }else if(icon == 'sleet'){
        	            $('#temperatura').append(aguaNieve);
                    }else if(icon == 'snow'){
        	            $('#temperatura').append(nieve);
                    }else if(icon == 'rain'){
        	            $('#temperatura').append(lluvia);
                    }else if(icon == 'clear-night'){
        	            $('#temperatura').append(luna);
                    }else if(icon == 'clear-day'){
        	            $('#temperatura').append(sol);
                    }

                    //Tomo los valores que necesito del Json 
    	            var temperatura= Math.round((el.temperature - 32)/1.8);//Transforme de °F a °C.
    	            var imgTemperatura = $('<img/>', {'src': 'iconos/celsius.png'});
    	            var viento = $('<p/>' , {'text':' Viento'});
    	            var imgViento = $('<img/>', {'class': 'iconTiempo' ,'src': 'iconos/viento.png'});
    	            var spanViento= $('<span/>', {'text' : el.windSpeed + ' km/h'});
    	            var humedad = $('<p/>' , {'text': ' Humedad'});
    	            var imgHumedad = $('<img/>', {'class': 'iconTiempo' ,'src': 'iconos/gota.png'});
    	            var spanHumedad= $('<span/>', {'text' : (el.humidity * 100) + ' %'});
    	            var indiceUV = $('<p/>' , {'text': ' Indice UV'});
    	            var imgUV = $('<img/>', {'class': 'iconTiempo' ,'src': 'iconos/sol.png'});
    	            var spanUV= $('<span/>', {'text' : el.uvIndex});
    	            var presion = $('<p/>' , {'text': ' Presión'});
    	            var imgPresion = $('<img/>', {'class': 'iconTiempo' ,'src': 'iconos/presion.png'});
    	            var spanPresion= $('<span/>', {'text' : el.pressure + ' mb'});
    	            //console.log(temperatura);
        
        
                    viento.append(imgViento);
                    viento.append(spanViento);
                    humedad.append(imgHumedad);
                    humedad.append(spanHumedad);
                    indiceUV.append(imgUV);
                    indiceUV.append(spanUV);
                    presion.append(imgPresion);
                    presion.append(spanPresion);

                    //Incorporo cada etiqueta creada mas arriba con su valor tomado desde el Json a los Id creados en HTML.
    	            $('#lugar').append(lugar);
    	            $('#temperatura').append(temperatura);
    	            $('#temperatura').append(imgTemperatura);
    	            $('#clima').append(viento);
                    $('#clima').append(humedad);
                    $('#clima').append(indiceUV);
                    $('#clima').append(presion);


                    //Tomo la información para los proximos dias.
                    var dias = dark.daily.data;//sub-dato.
                    //console.log(dias);
                    var pDia1 = $('<p/>',{'text' : 'Lunes'});
                    var pDia2 = $('<p/>',{'text' : 'Martes'});
                    var pDia3 = $('<p/>',{'text' : 'Miercoles'});
                    var pDia4 = $('<p/>',{'text' : 'Jueves'});
                    var pDia5 = $('<p/>',{'text' : 'Viernes'});
        	
                    //Tomo la temperatura minima y la maxima de los proximos 5 dias y la convierto a °C.	
                    var spanDia1= $('<span/>', {'text' : Math.round((dias[1].temperatureMin - 32)/1.8)+ ' °C' + ' - ' + Math.round((dias[1].temperatureMax - 32)/1.8)+ ' °C'});
                    var spanDia2= $('<span/>', {'text' : Math.round((dias[2].temperatureMin - 32)/1.8)+ ' °C' + ' - ' + Math.round((dias[2].temperatureMax - 32)/1.8)+ ' °C'});
                    var spanDia3= $('<span/>', {'text' : Math.round((dias[3].temperatureMin - 32)/1.8)+ ' °C' + ' - ' + Math.round((dias[3].temperatureMax - 32)/1.8)+ ' °C'});
                    var spanDia4= $('<span/>', {'text' : Math.round((dias[4].temperatureMin - 32)/1.8)+ ' °C' + ' - ' + Math.round((dias[4].temperatureMax - 32)/1.8)+ ' °C'});
                    var spanDia5= $('<span/>', {'text' : Math.round((dias[5].temperatureMin - 32)/1.8)+ ' °C' + ' - ' + Math.round((dias[5].temperatureMax - 32)/1.8)+ ' °C'});
        
                    //Ingreso los datos a los Id creados en HTML.
                    $('#dia1').append(pDia1);
                    $('#dia1').append(spanDia1);
                    $('#dia2').append(pDia2);
                    $('#dia2').append(spanDia2);
                    $('#dia3').append(pDia3);
                    $('#dia3').append(spanDia3);
                    $('#dia4').append(pDia4);
                    $('#dia4').append(spanDia4);
                    $('#dia5').append(pDia5);
                    $('#dia5').append(spanDia5);

                    //Vacio los input.
                    $('#ciudad').val(' ');
                    $('#pais').val(' ');
	
                }) 
                .fail(function() {
  	              console.log("error");
                })
                .always(function() {
  	              console.log("complete");
                });
            })
        })
        .fail(function() {
  	      console.log("error");
        })
        .always(function() {
  	      console.log("complete");
        });
   });
    //Tomo la API de Flick para poder poner una foto como fondo(La obtengo segun los parametros ingresados al momento de solicitarla).
    $.ajax({
	    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1eabbbf9186679ef2e3ed62816de193d&user_id=26373045%40N07&text=paisaje&extras=url_o%2Curl_s&format=json&nojsoncallback=1&auth_token=72157684770486590-98569292cae0a6b7&api_sig=038a6ad7d10f3c376d0bd6f80604f74a',
	    type: 'GET',
	    dataType: 'json',
    })
    .done(function(foto) {
	//console.log(foto);
	    //Recorri el Json y tome la imagen numero 24 que me gusto :P.
	    var arrPhoto= foto.photos.photo[24];
        //tome su url
        var url = arrPhoto.url_o;
        //Le di al BODY una imagen de fondo a traves de la url obtenida mas arriba.
        $('body').css('background-image', 'url('+ url + ')');
	
    })
    .fail(function() {
	    console.log("error");
    })
    .always(function() {
	    console.log("complete");
    });
});

