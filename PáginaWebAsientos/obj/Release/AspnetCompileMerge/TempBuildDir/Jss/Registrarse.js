$(function () {
    $('#btnAceptar').click(function () {
        guardPrinci();
    });
});

function guardPrinci() {
    var usuario = $('#Usuario').val();
    var contraseña = $('#Contraseña').val();
    var repetida = $('#Repetida').val();
    var cantidad = $('#Cantidad').val();

    var datos = {};

    var titulo = $('#title');
    var botonSec = $('#footer');
    titulo.html("");
    var contador = 0;
   
    if (usuario == "") {
        titulo.append("- No escribió un usuario<br>");
        contador = contador + 1;
        botonSec.html("");
        botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>');
    }
    if (contraseña == "") {
        titulo.append("- No escribió una contraseña<br>");
        contador = contador + 1;
        botonSec.html("");
        botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>');
    }
    if (repetida == "") {
        titulo.append("- No repitió la contraseña<br>");
        contador = contador + 1;
        botonSec.html("");
        botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>');
    }
    if (cantidad <= 0) {
        titulo.append("- Cantidad suministrada incorrecta<br>");
        contador = contador + 1;
        botonSec.html("");
        botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>');
    }
    if (repetida != contraseña) {
        titulo.append("- Las contraseñas no coinciden<br>");
        contador = contador + 1;
        botonSec.html("");
        botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>');
    }
    if (contador == 0) {
        var usuario = $('#Usuario').val();
        var contraseña = $('#Contraseña').val();
        var cantidad = Number($('#Cantidad').val());
        datos.usuario = usuario;
        datos.contraseña = contraseña;
        datos.cantidad = cantidad;
        
        var num = (ajaxPostGrupo(datos));
        if (num == 0) {
            titulo.append("El usuario ya existe");
            botonSec.html("");
            botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>');
        } else {
            sessionStorage.setItem("nroGrupo", num);
            sessionStorage.setItem("cantidad", cantidad);
            botonSec.html("");
            titulo.append("¿Desea agregar datos personales?");
            botonSec.append('<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="redirectMain()">Denegar</button>'
                + '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="abrir()">Aceptar</button >');
        }
        
    }
}

function abrir() {
    var cantidad = sessionStorage.getItem("cantidad");
    var primario = $('#divPrima').html("");
    primario.append('<div style="text-align:center" id="centro">');
    $('#centro').append('<div class="container" id="tabla2">');
    var tabla = $('#tabla2');
    tabla.append('<p class="titulo" >Datos de grupo familiar</p>');
    for (var i = 1; i <= cantidad; i++) {
        tabla.append('<div id="numero'+i+'" style="margin-top:17px"></div>');
        $('#numero' + i).append(' <input type="text" class="borde2" id="Nombre' + i +'" placeholder="Nombre"/>');
        $('#numero' + i).append(' <input type="text" class="borde2" id="Apellido' + i +'" placeholder="Apellido"/>');
        $('#numero' + i).append(' <input type="number" class="borde2" id="DNI' + i +'" placeholder="DNI"/>');
        $('#numero' + i).append(' <input type="text" class="borde2" id="Direccion'+i+'" placeholder="Dirección"/>');
    }
    $('#tabla2').append('<button id="btnAceptarGuardar" class="btn btn-success" onclick="datosP()">Aceptar</button>');
}

function datosP() {
    var cantidad = sessionStorage.getItem("cantidad");

    var arrayDatos = []
    var arrayFamilia = {};

    var Nombre = [];
    var Apellido = [];
    var DNI = [];
    var Direccion = [];

    for (var i = 1; i <= cantidad; i++) {
        Nombre[i-1] = $('#Nombre' + i).val();
        Apellido[i-1] = $('#Apellido' + i).val();
        DNI[i-1] = Number($('#DNI' + i).val());/*Tuve que usar el metodo Number() porque sino me lo transformaba a STRING con el .val()*/
        Direccion[i-1] = $('#Direccion' + i).val();
        var fallos = 0;
        var dni = 0;

        arrayFamilia.Nombre = Nombre[i - 1];
        arrayFamilia.Apellido = Apellido[i - 1];
        arrayFamilia.DNI = DNI[i - 1];
        arrayFamilia.Direccion=Direccion[i - 1];
        if (Nombre[i - 1] == "") {
            fallos = fallos + 1;
        } else if (Apellido[i - 1] == "") {
            fallos = fallos + 1;
        }else if ((DNI[i - 1] == "") || (Number.isInteger(DNI[i - 1]) != true)){
            dni = dni + 1;
        } else if (Direccion[i - 1] == "") {
            fallos = fallos + 1;
        }
        arrayDatos[i - 1] = arrayFamilia;
    }

    if (fallos > 0) {
        alert("Dejó espacios sin escribir");
    }

    if (dni > 0) {
        alert("Escribó mal algún espacio de DNI. Se recomienda escribir el número sin puntos.");
    }

    if ((dni == 0) && (fallos == 0)) {
        guardarPersona(Nombre, Apellido, DNI, Direccion, arrayFamilia);
        var info = $('#extra');
        var titulo = $('#title');
        var footer = $('#footer');
        footer.html("")
        footer.append('<button type="button" class="btn btn-primary" onclick="redirectMain()" data-dismiss="modal">Aceptar</button>');
        titulo.html("");
        titulo.append("Usuario ingresado correctamente");
        info.modal('show');
       
    }
}// Revisa todos los datos y si están ingresados correctamente, los guarda

function guardarPersona(Nombre, Apellido, DNI, Direccion) {
    
    var data = {};
    for (i = 0; i < Nombre.length; i++) {
        data.nroUsuario = 1;
        data.Nombre = Nombre[i];
        data.Apellido = Apellido[i];
        data.DNI = DNI[i];
        data.Direccion = Direccion[i];
        data.nroGrupo = sessionStorage.getItem("nroGrupo");
        ajaxPostPersona(data);
    }
}

function ajaxPostGrupo(datos) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/Grupo',
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
}//Comunica y envia a la BBDD los datos del grupo

function ajaxPostPersona(datos) {
    var result;
    $.ajax({
        url: 'https://localhost:44395/api/Persona',
        type: 'POST',
        async: false,
        data: {
            "nroUsuario": datos.nroUsuario, "Nombre": datos.Nombre, "Apellido": datos.Apellido, "DNI": datos.DNI,
            "Direccion": datos.Direccion, "Grupo": datos.nroGrupo
        }
    }).done(function (data) {
        result = data;
    }).error(function (xhr, status, error) {
        alert(error);
        var s = status;
        var e = error;
    });
    return result;
}// Comunica y envia a la BBDD los datos del grupo

function redirectMain() {
    location.href = "HtmlMain.html";
}// Direcciona a Main

function pruebasXD(){
    arrayFamilia[i].Familia = $('#Familia' + i).val();
    arrayFamilia[i].Nombre = $('#Nombre' + i).val();
    arrayFamilia[i].Apellido = $('#Apellido' + i).val();
    arrayFamilia[i].DNI = $('#DNI' + i).val();
    arrayFamilia[i].Direccion = $('#Direccion' + i).val();


    $('#numero' + i).append('<select name="Familia" id="Familia' + i + '" class="espacioDatos" ><option>Papá</option><option>Mamá'
        + '</option > <option>Hijo</option> <option>Hija</option></select > ');// Por si quería poner el parentesto familiar.

}
