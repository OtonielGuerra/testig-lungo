$(document).ready(function () {
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'detalle_pedido',
            id_pedido: localStorage.getItem('id_pedido')
        },
        success: function (response) {
            document.getElementById('titulo').innerHTML = 'Pedido de ' + response;
        }
    });
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'productos'
        },
        success: function (res) {
            let list = JSON.parse(res);
            let template = '';
            list.forEach(list => {
                template += `
                    <form action="./producto.html?id_producto=${list.id}" method="POST">
                        <button class="list-group-item list-group-item-action">${list.nombre}</button>
                    </form>
                `;
                $("#listado").html(template);
            });
        }
    });
    listar();
});

function listar() {
    var listado = [];
    var storageList = localStorage.getItem('lista_productos');
    if (JSON.stringify(storageList) != 'null') {
        if (JSON.parse(storageList).length == 0) {
            $("#nueva_fila").html('');
            return;
        }
        listado = JSON.parse(storageList);
        var template = '';
        var index = -1;
        listado.forEach(listado => {
            index += 1;
            template += `
            <tr>
                <th scope="row" style="display: none;">${listado.id}</th>
                <th scope="row" style="display: none;">${listado.descripcion}</th>
                <td>${listado.cantidad}</td>
                <td>${listado.nombre}</td>
                <td>${listado.total}</td>
                <td><button onclick="borrar(${index})" class="btn btn-danger">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
                `;
            $("#nueva_fila").html(template);
        });
    }
}


function cancelar() {
    Swal.fire({
        title: '¡Espera!',
        text: "¿Estás segur@ de querer cancelar este pedido?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonText: 'NO, no quiero cancelar',
        confirmButtonText: 'Sí, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                type: 'POST',
                data: {
                    quest: 'cancelar_pedido',
                    id_pedido: localStorage.getItem('id_pedido')
                },
                success: function (response) {
                    console.log(response);
                }
            });
        }
    });
}

function confirmar() {
    Swal.fire({
        title: '¡Espera!',
        text: "Ya has terminado realmente?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'NO, aún no'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                type: 'POST',
                data: {
                    quest: 'confirmar_pedido',
                    id_pedido: localStorage.getItem('id_pedido'),
                    lista_productos: localStorage.getItem('lista_productos')
                },
                success: function (response) {
                    console.log(response);
                    window.location.href = "../diario/final_pedido.html";
                }
            });
        }
    });
}

function borrar(key) {
    Swal.fire({
        title: '¡Espera!',
        text: 'Estás completamente segur@ de querer borrarlo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: `Si`,
        cancelButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            console.log(key);
            var listado = [];
            var storageList = localStorage.getItem('lista_productos');
            if (storageList == null) {
                listado = [];
            } else {
                listado = JSON.parse(storageList);
            }

            listado.splice(key, 1);
            localStorage.setItem('lista_productos', JSON.stringify(listado));

            console.log(JSON.parse(localStorage.getItem('lista_productos')));

            listar();
            Swal.fire('Eliminado!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}


// function obtenerValorParametro(sParametroNombre) {
//     var sPaginaURL = window.location.search.substring(1);
//     var sURLVariables = sPaginaURL.split('&');
//     for (var i = 0; i < sURLVariables.length; i++) {
//         var sParametro = sURLVariables[i].split('=');
//         if (sParametro[0] == sParametroNombre) {
//             return sParametro[1];
//         }
//     }
//     return null;
// }