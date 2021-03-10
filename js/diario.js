window.onload = inicio();
var fecha;
function inicio() {
    var f = new Date();
    fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    document.getElementById('nombre').value = fecha;
    document.getElementById('titulo').innerHTML = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
}

function empezar() {
    var encargado = document.getElementById("encargado").value;
    var cajero = document.getElementById("cajero").value;
    if (encargado == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "No ha ingresado a un encargado",
            icon: 'warning'
        });
    }
    if (cajero == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "No ha ingresado a un cajero",
            icon: 'warning'
        });
    }
    if (cajero != "" && encargado != "") {
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'POST',
            data: {
                quest: 'cerrar_otros'
            },
            success: function (res) {
                console.log(res);
            }
        });
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'GET',
            success: function (res) {
                if (res == "SI") {
                    Swal.fire({
                        title: '¡Espera!',
                        text: "Usted ya empezó un día laboral hoy",
                        icon: 'warning'
                    });
                } else {
                    $.ajax({
                        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                        type: 'POST',
                        data: {
                            quest: 'diario',
                            encargado,
                            cajero,
                            fecha
                        },
                        success: function (res) {
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
        });
    }
}