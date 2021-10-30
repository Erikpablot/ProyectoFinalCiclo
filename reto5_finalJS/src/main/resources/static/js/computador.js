var urlBaseComputador = "http://150.136.49.14:8080/api/Computer";
var urlBaseCategoria = "http://150.136.49.14:8080/api/Category";

var consultarCategorias = function (idcategoria) {
    $.ajax({
        url: urlBaseCategoria + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="categoria">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#categoria-select").html(select);
            
            if (idcategoria!=='undefined' && idcategoria!=null){
                $("#categoria").val(idcategoria);
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
        url: urlBaseComputador + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta, 'Aqui estan todos los items consultados');
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
                    <th>NOMBRE</th>
                    <th>MARCA</th>
                    <th>AÑOS</th>
                    <th>DESCRIPCION</th>
                    <th>CATEGORIA</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].brand}</td>
                   <td>${items[i].year}</td>
                   <td>${items[i].description}</td>
                   <td>${items[i].category.name}</td>
                   <td style="margin:0">
                    <button type="button" class="btn btn-sm btn-primary" onclick="editar(${items[i].id}, '${items[i].name}', '${items[i].brand}', '${items[i].year}','${items[i].description}', '${items[i].category.id}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="eliminar(${items[i].id})">
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
    consultarCategorias(null);
    $("#tituloModalProducto").html('Nuevo Producto');
    $("#id").val('');
    $("#name").val('');
    $("#brand").val('');
    $("#year").val('');
    $("#description").val('');
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
    var id = $("#id").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseComputador + "/update";
        payload = {
            id: +$("#id").val(),
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: +$("#year").val(),
            description: $("#description").val(),
            categoria: {
                id: +$("#categoria").val()
            }
        };
        method = "PUT";
        msg = "se ha actualizado el computador";
    } else {
        ruta = urlBaseComputador + "/save";
        payload = {
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: +$("#year").val(),
            description: $("#description").val(),
            category: {
                id: +$("#categoria").val()
            }
        };
        method = "POST";
        msg = "se ha creado el computador";
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

var editar = function (id, nombre, precio, inventario,description, idcategoria) {
    console.log(nombre, precio, inventario,description, idcategoria);
    consultarCategorias(idcategoria);
    $("#tituloModalProducto").html('Actualizar Producto');
    $("#id").val(id);
    $("#name").val(nombre);
    $("#brand").val(precio);
    $("#year").val(inventario);
    $("#description").val(description);
    
    $('#modalProducto').modal('show');
}


var eliminar = function (id) {
    console.log("eliminando id: " + id)
    $.ajax({
        url: urlBaseComputador + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }, 
        statusCode: {
            204: function () {
                mostrarMensaje('Se ha eliminado el computador');
                cerrarModal();
                consultar();
            }
        },
    });
}



