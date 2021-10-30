var consultarComprasxCliente = function () {
    $.ajax({
        url: "http://150.136.49.14:8080/api/Reservation/report-clients",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxCliente(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var mostrarRespuestaxCliente = function (items) {
    var tabla = `<table class="table table-dark table-striped">
                  <tr>
                    <th>TOTAL</th>
                    <th>CLIENTES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].total}</td>
                   <td>${items[i].client.name}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}



var consultarComprasxFecha = function () {
    let fi = $("#fechainicial").val();
    let ff = $("#fechafinal").val();
    console.log(fi);
    console.log(ff);
    $.ajax({
        url: "http://150.136.49.14:8080/api/Reservation/report-dates/" + fi + "/" + ff,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxFecha(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var mostrarRespuestaxFecha = function (items) {
    var tabla = `<table class="table table-dark table-striped">
                  <tr>
                    <th>ID</th>
                    <th>FECHA</th>
                    <th>ESTADO</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].idReservation}</td>
                   <td>${items[i].startDate}</td>
                   <td>${items[i].status}</td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

var consultarEstado = function () {
    $.ajax({
        url: "http://150.136.49.14:8080/api/Reservation/report-status",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            mostrarRespuestaxEstados(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
}

var mostrarRespuestaxEstados = function (items) {
    var tabla = `<table class="table table-dark table-striped">
                  <tr>
                    <th>COMPLETADOS</th>
                    <th>CANCELADOS</th>
                  </tr>`;


    
        tabla += `<tr>
                   <td>${items.completed}</td>
                   <td>${items.cancelled}</td>
                </tr>`;
    
    tabla += `</table>`;

    $("#tabla").html(tabla);
}

