var urlBaseReseravciones = "http://150.136.49.14:8080/api/Reservation"; /////api/Reservationreport-clients
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


var consultar = function () {
    $.ajax({
        url: urlBaseReseravciones + "/all",
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

var actualizarTabla = function (items) {
    var tabla = `<table class="table table-dark table-striped">
                  <tr>
                    <th>ID</th>
                    <th>FECHA DE INCIO</th>
                    <th>FECHA DE DEVOLUCION</th>
                    <th>ESTADO</th>
                    <th>COMPUTADOR</th>
                    <th>CLIENTE</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idReservation}</td>
                   <td>${items[i].startDate}</td>
                   <td>${items[i].devolutionDate}</td>
                   <td>${items[i].status}</td>
                   <td>${items[i].computer.name}</td>
                   <td>${items[i].client.name}</td>
                   
                   
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].idReservation}, '${items[i].startDate}', '${items[i].devolutionDate}', '${items[i].status}','${items[i].computer.id}','${items[i].client.idClient}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].idReservation})">
                        Eliminar
                    </button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}


$(document).ready(function () {
    console.log("document ready")
    consultar();
});

var nuevo = function () {
    consultarComputadores(null);
    consultarClientes(null);
    $("#tituloModalProducto").html('Nueva reservacion');
    $("#idReservation").val('');
    $("#startDate").val('');
    $("#devolutionDate").val('');
    $("#status").val('');
    $('#modalProducto').modal('show');
}

var cerrarModal = function () {
    $('#modalProducto').modal('hide');
}

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
}

var cerrarModalMensaje = function () {
    $('#modalMensaje').modal('hide');
}

var guardarCambios = function () {
    var payload;
    var method;
    var idReservation = $("#idReservation").val();
    var msg;
    var ruta;
    if (idReservation !== 'undefined' && idReservation !== null && idReservation.length > 0) {
        ruta = urlBaseReseravciones + "/update";
        payload = {
            idReservation: +$("#idReservation").val(),
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            computer: {
                id: +$("#idCompu").val()
            },
            client: {
                idClient: +$("#idCliente").val()
            }
            
        };
        method = "PUT";
        msg = "se ha actualizado el cliente";
    } else {
        ruta = urlBaseReseravciones + "/save";
        payload = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            computer: {
                id: +$("#idCompu").val()
            },
            client: {
                idClient: +$("#idCliente").val()
            }
        };
        method = "POST";
        msg = "se ha creado el cliente";
    }

    console.log("guardando ", payload)
    console.log("metodo ", method, "a", ruta)

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

var editar = function (idClient, email, password, name,idCompu,idCliente ) {
    console.log(idClient, email, password, name);
    consultarComputadores(idCompu);
    consultarClientes(idCliente);
    $("#tituloModalProducto").html('Actualizar Producto');
    $("#idReservation").val(idClient);
    $("#startDate").val(email);
    $("#devolutionDate").val(password);
    $("#status").val(name);
    
    
    $('#modalProducto').modal('show');
}


var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseReseravciones + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el cliente');
                cerrarModal();
                consultar();
            }
        },
    });
}



