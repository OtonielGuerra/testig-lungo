$(document).ready(function () {
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'observacion'
        },
        success: function (res) {
            if (res) {
                document.getElementById('observaciones').innerHTML = res;
            } else {
                Swal.fire({
                    title: ':(',
                    text: "Algo salió mal",
                    icon: 'error'
                });
            }
        }
    });
});

function observaciones() {
    var observaciones = document.getElementById("observaciones").value;
    if (observaciones == "") {
        Swal.fire({
            title: 'Observacion',
            text: "No ha ingresado a un observaciones",
            icon: 'warning'
        });
    }
    if (observaciones != "") {
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'POST',
            data: {
                quest: 'set_observacion',
                observaciones
            },
            success: function (res) {
                window.location.href = "../diario/menu_pedidos.html";
            }
        });
    }
}