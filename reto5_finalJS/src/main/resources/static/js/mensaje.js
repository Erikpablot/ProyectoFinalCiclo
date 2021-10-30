var urlBaseMensaje = "http://150.136.49.14:8080/api/Message";
var urlBaseComputador = "http://150.136.49.14:8080/api/Computer";
var urlBaseCliente = "http://150.136.49.14:8080/api/Client";

var consultarComputadores = function (idcategoria) {
    $.ajax({
        url: urlBaseComputador + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select1 = `<select class="form-select" id="idCompu">`;
            for (var i = 0; i < respuesta.length; i++) {
                select1 += `<option value="${respuesta[i].id}">${respuesta[i].name}</option>`;
                
            }
            select1 += `</select>`;
            $("#computador-select").html(select1);
            
            if (idcategoria!=='undefined' && idcategoria!=null){
                $("#idCompu").val(idcategoria);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var consultarClientes = function (idcategoria) {
    $.ajax({
        url: urlBaseCliente + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="idCliente">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].idClient}">${respuesta[i].name}</option>`;
                
            }
            select += `</select>`;
            $("#cliente-select").html(select);
            
            if (idcategoria!=='undefined' && idcategoria!=null){
                $("#idCliente").val(idcategoria);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var consultar = function(){
    $.ajax({
        url: urlBaseMensaje + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTabla(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var actualizarTabla = function (items) { //lo que signifia el table striped es par aque la tabal aparezca una linea blanca y otra negra
    var tabla = `<table class="table table-dark table-striped"> 
                  <tr>
                    <th>CODIGO</th>
                    <th>MENSAJE</th>
                    <th>COMPUTADOR</th>
                    <th>CLIENTE</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idMessage}</td>
                   <td>${items[i].messageText}</td>
                   <td>${items[i].computer.name}</td>
                   <td>${items[i].client.name}</td>
                   <td>
                    <button type="button" class="btn btn-xs btn-primary" onclick="editar(${items[i].idMessage}, '${items[i].messageText}','${items[i].computer.id}','${items[i].client.idClient}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-xs btn-danger" onclick="eliminar(${items[i].idMessage})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

$(document).ready(function () {
    console.log("document ready"); //esto se ejecutara automaticamnete cuando el html este activo.
    consultar();
    
});
                            //despues le digo a #modalCategoria que se muestre
var nuevo = function () { //sirve para mostrar y oraganizar(le mando nueva categoria a el #tituloModalCategoria q esta en el html)
    consultarComputadores(null);
    consultarClientes(null);
    $("#tituloModalCategoria").html('Nuevo Mensaje');
    $("#idMessage").val('');
    $("#messageText").val('');
    $('#modalProducto').modal('show');
}

var cerrarModal = function () { //aqui le manda a el modal el hide que es cerrar
    $('#modalProducto').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function(){
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {
    var payload;
    var method;
    var idMessage = $("#idMessage").val();
    var msg;
    var ruta;
    if (idMessage !== 'undefined' && idMessage !== null && idMessage.length > 0) {//
        ruta = urlBaseMensaje + "/update";
        payload = {
            idMessage: +$("#idMessage").val(),
            messageText: $("#messageText").val(),
            computer: {
                id: +$("#idCompu").val()
            },
            client: {
                idClient: +$("#idCliente").val()
            }
            
        };
        method = "PUT";
        msg = "se ha actualizado la categoria";
    } else {
        ruta = urlBaseMensaje + "/save";
        payload = {
            messageText: $("#messageText").val(),
            computer: {
                id: +$("#idCompu").val()
            },
            client: {
                idClient: +$("#idCliente").val()
            }
        };
        method = "POST";
        msg = "se ha creado la categoria";
    }

    console.log("guardando ", payload)
    console.log("ruta ", ruta)
    console.log("method ", method)

    $.ajax({
        url: ruta,
        type: method,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                mostrarMensaje(msg);
                cerrarModal();
                consultar();
            }
        },
    });
}

var editar = function (id, nombre,idCompu,idCliente) {
    console.log(id,nombre,idCompu,idCliente);
    consultarComputadores(idCompu);
    consultarClientes(idCliente);
    $("#tituloModalCategoria").html('Actualizar Categoria');
    $("#idMessage").val(id);
    $("#messageText").val(nombre);
    $('#modalProducto').modal('show');
}

var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseMensaje + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado la categoria');
                cerrarModal();
                consultar();
            }
        },
    });
}



