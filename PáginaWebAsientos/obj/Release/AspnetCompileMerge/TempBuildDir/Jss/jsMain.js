$(function () {
    $('#btnAceptar').click(function () {
        comprobarVacios();
    });

    $('#btnAdmin').click(function () {
        redirectAdmin();
    });

    $('#nueva').click(function () {
        redirectRegistrarse();
    });
});

function comprobarVacios() {
    if (($('#Usuario').val() == "") && ($('#Contraseña').val() == "")) {
        alert("Debe escribir su Usuario y Contraseña");
    } else if ($('#Usuario').val() == "") {
        alert("Debe escribir su Usuario");
    } else if ($('#Contraseña').val() == "") {
        alert("Debe escribir su Contraseña");
    } else {
        comprobarUsuario();
    }
}

function comprobarUsuario() {
    var user = $('#Usuario').val();
    var contra = $('#Contraseña').val();
    datos = {};
    datos.nroGrupo = 0;
    datos.usuario = user;
    datos.contraseña = contra;
    datos.cantidad = 0;

    var mensaje = ajaxGetExistGrupo(datos);
    if (mensaje == "Ingresó mal el usuario o la contraseña") {
        alert(mensaje);
    } else {
        
        datos.nroGrupo = ajaxGetNumberGrupo(datos);
        datos = ajaxGetOneGrupo(datos.nroGrupo);
        alert(mensaje);
        sessionStorage.setItem("nroGrupo", datos[0].nroGrupo);
        sessionStorage.setItem("Usuario", user);
        sessionStorage.setItem("Cantidad", datos[0].Cantidad);
        redirectReservarAsientos();
    }
    
}// Envía los datos del usuario y contraseña para comprobar si existe

function ajaxGetExistGrupo(datos) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/GrupoN',
        type: 'POST',
        async: false,
        data: {
            "nroGrupo": datos.nroGrupo, "Usuario": datos.usuario, "Contraseña": datos.contraseña, "Cantidad": datos.cantidad
        }
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}//Revisa si el USUARIO y CONTRASEÑA son correctos

function ajaxGetNumberGrupo(datos) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/GrupoE',
        type: 'POST',
        async: false,
        data: {
            "nroGrupo": datos.nroGrupo, "Usuario": datos.usuario, "Contraseña": datos.contraseña, "Cantidad": datos.cantidad
        }
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}//Trae el número del grupo

function ajaxGetOneGrupo(id) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/GrupoN/' + id,
        type: 'GET',
        async: false
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}

function ajaxPostReserva(datos) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/Reserva',
        type: 'POST',
        async: false,
        data: {
            "idReserva": datos.nroReserva, "usuRes": datos.usuario, "Cantidad": datos.cantidad, "idReu": datos.nroReunion
        }
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}

function redirectRegistrarse() {
    location.href = "HtmlRegistrarse.html"
}// Redirige a la página de registros nuevos

function redirectAdmin() {
    location.href = "HtmlAdmin.html";
}// Redirige a la página de los admin

function redirectFelicitar() {
    location.href = "HtmlFelicitar.html";
}

function redirectReservarAsientos() {
    location.href = "HtmlReservarAsientos.html";
}// Redirige a la página de reserva de asientos

function pruebas() {
    $('#Cancel').click(function () {
        changeWhite();
    });

    var id = item.id;
    alert(id);

    sessionStorage.setItem("id", 0);
    var id = sessionStorage.getItem("id");
    alert(id);

    for (var i = 0; i < seat.fila; i++) {
        alert("HOLAAAAAAAAAAA");
        var row = $('<tr></tr>');
        for (var j = 0; j < seat.columna; j++) {
            alert("me pongo mal si no anda :(");
            if (seat[counter].ocupado == true) {
                row.append('<td class="jqClickeable" id="' + counter + '"><img src="../resource/Silla Azul PNG.png" Width="30" Height="30"/></td>');
            } else {
                row.append('<td class="jqClickeable" id="' + counter + '"><img src="../resource/Silla Blanca PNG.png" Width="30" Height="30"/></td>');
            }
            counter++;
            alert("XDDD");
        }
        tabla.append(row);
    }
}// Pruebas viejas de código obsoleto. Debo borrarlo antes de publicar

function guardarReserva(comp) {
    var id = comp.id;
    var nroReunion = $('#' + id).val();
    sessionStorage.setItem("nroReunion", nroReunion);
    var reu = $(".reu");
    reu.append('<p>¿Cuantas personas van a asistir a la reunión?</p>');
    reu.append('<input type="number" id="Cantidad" min="1" placeholder="Cantidad" />')
    reu.append('<button type="button" id="guardar" onclick="guardarDefinitivo()">Guardar</button >');
}

function guardarDefinitivo() {
    var cantidadGrupo = sessionStorage.getItem("Cantidad");
    var cantidadImpuesta = $("#Cantidad").val();
     if (cantidadImpuesta > cantidadGrupo) {
        alert("La cantidad solo puede ser IGUAL O MENOR a la cantidad de personas que integran el grupo");
    } else {
        var usuario = sessionStorage.getItem("Usuario");
        var nroReunion = sessionStorage.getItem("nroReunion");
        var datos = {};
        datos.nroReserva = 0;
        datos.usuario = usuario;
        datos.cantidad = cantidadImpuesta;
        datos.nroReunion = nroReunion;
        ajaxPostReserva(datos);
        redirectFelicitar();
    }
    
}

