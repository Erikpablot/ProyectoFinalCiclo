var urlBaseCliente = "http://150.136.49.14:8080/api/Client";





var consultar = function () {
    $.ajax({
        url: urlBaseCliente + "/all",
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
                    <th>CORREO</th>
                    <th>CONTRASEÑA</th>
                    <th>NOMBRE</th>
                    <th>AGE</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idClient}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].password}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].age}</td>
                   
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].idClient}, '${items[i].email}', '${items[i].password}', '${items[i].name}','${items[i].age}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].idClient})">
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
    
    $("#tituloModalProducto").html('Nuevo Cliente');
    $("#idCliente").val('');
    $("#email").val('');
    $("#password").val('');
    $("#name").val('');
    $("#age").val('');
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
    var idClient = $("#idClient").val();
    var msg;
    var ruta;
    if (idClient !== 'undefined' && idClient !== null && idClient.length > 0) {
        ruta = urlBaseCliente + "/update";
        payload = {
            idClient: +$("#idClient").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: +$("#age").val()
            
        };
        method = "PUT";
        msg = "se ha actualizado el cliente";
    } else {
        ruta = urlBaseCliente + "/save";
        payload = {
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            age: +$("#age").val(),
            
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

var editar = function (idClient, email, password, name,age ) {
    console.log(idClient, email, password, name,age);
    
    $("#tituloModalProducto").html('Actualizar Producto');
    $("#idClient").val(idClient);
    $("#email").val(email);
    $("#password").val(password);
    $("#name").val(name);
    $("#age").val(age);
    
    $('#modalProducto').modal('show');
}


var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseCliente + "/" + id,
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



