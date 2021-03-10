$(document).ready(function () {
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'producto',
            id_producto: obtenerValorParametro('id_producto')
        },
        success: function (response) {
            let list = JSON.parse(response);
            list.forEach(list => {
                document.getElementById('nombre_producto').innerHTML = list.nombre;
                document.getElementById('descripcion_producto').innerHTML = list.descripción;

                document.getElementById('id_producto').value = list.id;
                document.getElementById('name_producto').value = list.nombre;
                document.getElementById('description_producto').value = list.descripción;
                document.getElementById('precio').value = list.precio;
            });
        }
    });

    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'topping'
        },
        success: function (response) {
            console.log(response);
            let list = JSON.parse(response);
            let template = '';
            list.forEach(list => {
                template += `
                <button type="button" onclick="tops('${list.id}', '${list.nombre}')"  id="${list.id}" class="list-group-item list-group-item-action">${list.nombre}</button>
                <input type="hidden" class="form-control" id="id_diario" name="id_diario" value="${list.id}">
                `;
            });
            $("#listado").html(template);
        }
    });
});

function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
            return sParametro[1];
        }
    }
    return null;
}

function enviar() {
    var cantidad = document.getElementById('pedido').value;
    var extra = document.getElementById('extra').value;
    // var precio = document.getElementById('precio').value;
    var observaciones = document.getElementById('observaciones').value;
    var id_producto = document.getElementById('id_producto').value;
    if (cantidad <= 0) {
        Swal.fire(
            '¡Espera!',
            'No puedes ingresar este producto, Ingresaste 0 o un valor negativo en la cantidad',
            'error'
        )
    }
    else {

        var id_producto = document.getElementById('id_producto').value;
        var nombre_producto = document.getElementById('name_producto').value;
        var description_producto = document.getElementById('description_producto').value;
        var precio = document.getElementById('precio').value;
        var cantidad = document.getElementById('pedido').value;
        var extra = document.getElementById('extra').value;
        var observacion = document.getElementById('observaciones').value;
        var total = ((parseFloat(extra) * parseFloat(cantidad)) + (precio * cantidad));

        var listado = [];
        var storageList = localStorage.getItem('lista_productos');
        if (JSON.stringify(storageList) == 'null') {
            listado = [];
        } else {
            listado = JSON.parse(storageList);
        }

        var lista = {
            id: id_producto,
            nombre: nombre_producto,
            descripcion: description_producto,
            precio: precio,
            cantidad: cantidad,
            total: total,
            observacion: observacion
        };
        listado.push(lista);
        localStorage.setItem('lista_productos', JSON.stringify(listado));
        console.log(JSON.parse(localStorage.getItem('lista_productos')));
        window.location.href = "./detalle_pedido.html";

    }
}

var inicio = 0; //se inicializa una variable en 0

function aumentar() { // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar

    var cantidad = document.getElementById('pedido').value = ++inicio; //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
}

function disminuir() { // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id disminuir

    var cantidad = document.getElementById('pedido').value = --inicio; //se obtiene el valor del input, y se decrementa en 1 el valor que tenga.
}

var total = 0;
function tops(id, nombre) {
    var uniq = document.getElementById(id);
    console.log(uniq);
    if (uniq.className == "list-group-item list-group-item-action") {
        uniq.className = "btn btn-success btn-block";
        total = total + parseFloat(5);
        console.log(total);
        document.getElementById('extra').value = total;
        document.getElementById('observaciones').value += `extra: ${nombre}\n`;
    } else {
        uniq.className = "list-group-item list-group-item-action";
        total = total - parseFloat(5);
        document.getElementById('extra').value = total;
        document.getElementById('observaciones').value = (document.getElementById('observaciones').value).replace((`extra: ${nombre}\n`), '');
    }
}