function empezar() {
    var nombre_cliente = document.getElementById("nombre_cliente").value;
    if (nombre_cliente == "") {
        Swal.fire(
            '¡Espera!',
            'No puedes ingresar un pedido, si aún no has ingresado el nombre del cliente.',
            'error'
        )
    } else {
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'POST',
            data: {
                quest: 'set_cliente',
                nombre_cliente
            },
            success: function (res) {
                localStorage.setItem('id_pedido', res);
                window.location.href = "../diario/detalle_pedido.html";
            }
        });
    }
}