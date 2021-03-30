$(function () {
    var localTime = new moment();
    $('#btnMas').click(function () {
        cargarReloj(localTime);
    });
    $('#btnVolver').click(function () {
        redirectToAdmin();
    });
});

function cargarReloj(localTime = moment()) {
    var nuevo = $('#tablaPrincipal');
    
    var fecha = $('.elData').text();
    var hora = localTime;

    if (fecha == "") {
        modal = $('#info');
        var modalh = $('.modal-header');
        modalh.html("");
        modalh.append('<h1>Debe elegir una fecha</h1>');
        modal.modal('show');//Muestra el modal de forma "remota" sin clickarlo
    } else {
        nuevo.html("");
        nuevo.append('<tr><td><p>¿A qué hora quiere EMPEZAR la reunión del día ' + fecha + '?</p></td></tr>' +
            '<tr class="ubicarReloj"><td>' +
            '<div class="reloj">' +
            '<button type="button" onclick="atrasar()" class="control control--prev">&lt;</button>' +
            '<div id="clock">' + hora.format('hhA') + '</div>' +
            '<button type="button" onclick="adelantar()" class="control control--next">&gt;</button></div></td></tr>' +
            '<tr><td><p>¿Cuantas personas van a asistir al culto?</p></td></tr>' +
            '<tr><td><input type="number" id="numero" step="5" min="5" max="300" value="5"/></td></tr>' +
            '<tr><td><button id="btnAceptar" onclick="guardarFecha()"' +
            'class= "btn btn-dark" data-toggle="modal" href = "#info" > GUARDAR</button ></td></tr > ');
    }
    var clock = $('#clock');
    var fecha = $('#data').val();

    var diff = hora.diff(fecha, 'days');// Calcula la diferencia entre la fecha en dias y la fecha del reloj
    diff = diff * (-1);//Invierte los valores
    hora.add(diff, 'days');//Añade la cantidad de dias segun la diferencia
    if (!hora.isSame(fecha, 'days')) {//Si la cantidad esta mal por una diferencia de horarios (menos de 24hs)
        if (hora.isBefore(fecha, 'days')) {// lo corrije añadiendo o quitando un dia, segun sea necesario
            hora.add(1, 'days');
        } else {
            hora.subtract(1, 'days');
        }
    }
    clock.val(hora);
}// Carga el reloj

function guardarFecha() {
    var fechaActual = new moment();
    var fechaGuardar = $('#clock').val();
   
    var modalh = $('.modal-header');
    var boton = $('.modal-footer');
    var cant = $('#numero').val();

    fechaActual.add(2, 'days');
    if (!fechaGuardar.isAfter(fechaActual, 'hours')) {
        modalh.html("");                              
        modalh.append('<h2>Necesita al menos 48hs para organizar la siguiente reunión.</h2>');
    }// Se asegura de que la hora para guardar sea correcta. Osea, 48hs despues de la hora actual
    else {
        var fecha = fechaGuardar.format('LL');
        var hora = fechaGuardar.format('hhA');

        sessionStorage.setItem("fecha", fecha);
        sessionStorage.setItem("hora", hora);
        sessionStorage.setItem("cantidad", cant);

        var elegida = $('.grid_cell--selected');
        elegida.val(fechaGuardar);
        modalh.html("");
        boton.html("");
        modalh.append('<h3 class="modal-title" style="align-content:center" id="Auten">¿Seguro que quiere GUARDAR la reunión el día ' +
            fechaGuardar.format('LL') + ', a la hora ' + fechaGuardar.format('hhA') + ', con una cantidad máxima de asientos para ' + cant + ' personas?</h3>');
        boton.append('<button type="button" class="btn btn-danger" onclick="quitarButton()" data-dismiss="modal">Cerrar</button>');
        boton.append('<button type="button" class="btn btn-primary" onclick="ultimateSave()" data-dismiss="modal">Guardar</button>');
    }//Guarda los datos en sistema y modifica el Modal para que se muestre
     // otro mensaje cuando se le llama
}//Se asegura de que pueda guardar antes de ir a guardarlo

function ultimateSave() {
    var elegida = $('.grid_cell--selected');
    elegida.addClass('grid_cell--worship')
    var nuevo = $('#tablaPrincipal');
    nuevo.html("");

    var datos = {};
    var fecha = sessionStorage.getItem("fecha");
    var cantidad = sessionStorage.getItem("cantidad");
    var hora = sessionStorage.getItem("hora");
    datos.nroReunion = 1;
    datos.fecha = fecha;
    datos.hora = hora;
    datos.cantMax = cantidad;

    ajaxPostReunion(datos);
    

}//Guarda de forma definitiva en la BBDD

function adelantar() {
    var clock = $('#clock').val();
    clock.add(1, 'hours');
    cargarReloj(clock);
}//Adelanta una hora

function atrasar() {
    var clock = $('#clock').val();
    clock.subtract(1, 'hours');
    cargarReloj(clock);
}//Atrasa una hora 

function ajaxPostReunion(datos) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/Reunion',
        type: 'POST',
        async: false,
        data: {
            "nroReunion": datos.nroReunion, "fecha": datos.fecha,"hora": datos.hora, "cantMax": datos.cantMax }
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    location.reload();//Recarga la página
    return result;
}//Comunica y envia a la BBDD los datos y la recarga cada vez que se guarda

function redirectToAdmin(){
    location.href = "HtmlAdmin.html"
}
