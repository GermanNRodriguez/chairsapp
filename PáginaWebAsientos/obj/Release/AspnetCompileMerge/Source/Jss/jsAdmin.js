$(function () {
    $('#btnConfirm').click(function () {
        loginUsuario();
    });
    $('#btnMain').click(function () {
        redirectMain();
    });
});

function loginUsuario() {
    if (($("#nombreAdmin").val() == "") && ($("#contraAdmin").val() == "")) {
        var Auten = $('#Auten');
        Auten.html("");
        Auten.append("Debe escribir su usuario y contraseña");
    }
    else if ($("#nombreAdmin").val() == "") {
        var Auten = $('#Auten');
        Auten.html("");
        Auten.append("Debe escribir su usuario");
    } else if ($("#contraAdmin").val() == "") {
        var Auten = $('#Auten');
        Auten.html("");
        Auten.append("Debe escribir su contraseña");
    } else {
        ajaxPostAdmin();
    }
    limpiarTxt();
}

function ajaxPostAdmin() {
    var result;
    var datos = obtainTxt();
    $.ajax({
        url: 'https://localhost:44395/api/Admin',
        type: 'POST',
        async: false,
        data: { "NombreC": datos.usuario, "Contraseña": datos.clave }
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    var Auten = $('#Auten');
    Auten.html("");
    Auten.append(result);
    if (result == 'Usuario autenticado') {
        loadOrganizerAdmin()
    }
    
}

function obtainTxt() {
    var datos = {};
    var usuario = $("#nombreAdmin").val();
    sessionStorage.setItem("adminN", usuario);
    var clave = $("#contraAdmin").val();
    datos.usuario = usuario;
    datos.clave = clave;
    return datos;
}

function loadOrganizerAdmin() {
    var titulo = $("#titulo");
    titulo.append('<h3>Bienvenido ' + sessionStorage.getItem("adminN"));
    var previsualizar = $('#text1'); 
    var organizar = $('#text2');
    var borrar = $('#button');
    borrar.html("");
    previsualizar.html("");
    organizar.html("");
    previsualizar.append('<input type="button" id="btnnPre" onclick="aviso()" value="Reservas" class="escribir"/>');
    organizar.append('<input type="button" id="btnCulto" onclick="redirectCreator()" value="Organizar culto" class="escribir"//>');
    
}

function redirectCreator() {
    location.href = "HtmlCreator.html";

}

function ajaxDeleteAdmin() {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/Asiento',
        type: 'DELETE',
        async: false,
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
}

function limpiarTxt() {
    $('#nombreAdmin').val("");
    $('#contraAdmin').val("");
}

function aviso() {
    alert("Próximamente");
}

function redirectMain() {
    location.href = "HtmlMain.html"
}