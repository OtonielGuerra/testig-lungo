function declarar() {
    var descripcion = document.getElementById("descripcion").value;
    var gasto = document.getElementById("gasto").value;
    if (descripcion == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "No ha ingresado una descripcion",
            icon: 'warning'
        });
    }
    if (gasto == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "No ha ingresado a un gasto",
            icon: 'warning'
        });
    }
    if (gasto != "" && descripcion != "") {
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'POST',
            data: {
                quest: 'gasto',
                descripcion,
                gasto
            },
            success: function (res) {
                console.log(res);
                if (res == "Successfuly") {
                    window.location.href = "../diario/menu_pedidos.html"
                } else {
                    Swal.fire({
                        title: ':(',
                        text: "Algo salió mal",
                        icon: 'error'
                    });
                }
            }
        });
    }
}