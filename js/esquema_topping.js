$(document).ready(function () {
    if ((sessionStorage.getItem('id_topping') != null)) {
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'GET',
            data: {
                quest: 'admin_topping_especifico',
                id_topping: sessionStorage.getItem('id_topping')
            },
            success: function (response) {
                console.log(response);
                let list = JSON.parse(response);
                list.forEach(list => {
                    document.getElementById('titulo').innerHTML = list.nombre;
                    document.getElementById('id').value = list.id;
                    document.getElementById('nombre').value = list.nombre;
                    var template_1 = "<option selected value=\"0\">De Alta</option> <option value=\"1\">De Baja</option>";
                    var template_2 = "<option value=\"0\">De Alta</option> <option selected value=\"1\">De Baja</option>";
                    console.log(list.estado);
                    if (list.estado == 0) {
                        $("#estado").html(template_1);
                    } else {
                        $("#estado").html(template_2);
                    }
                });
            }
        });
    } else {
        document.getElementById('titulo').innerHTML = 'Nuevo Topping';
        document.getElementById('boton').innerHTML = 'Guardar';
        console.log(document.getElementById('boton').innerHTML);
        var template_1 = "<option selected value=\"0\">De Alta</option> <option value=\"1\">De Baja</option>";
        $("#estado").html(template_1);
    }
});

function validar() {
    var nombre = document.getElementById("nombre").value;
    if (nombre == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "El titulo está vacío",
            icon: 'warning'
        });
    } else {
        if (document.getElementById("boton").innerHTML == 'Guardar') {
            $.ajax({
                url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                type: 'POST',
                data: {
                    quest: 'agregar_topping',
                    nombre,
                    id_usuario: sessionStorage.getItem('usuario')
                },
                success: function (response) {
                    console.log(response);
                    if (response == 'Successfully') {
                        window.location.href = "../diario/toppings.html";
                    }
                }
            });
        }else{
            $.ajax({
                url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                type: 'POST',
                data: {
                    quest: 'actualizar_topping',
                    id: document.getElementById('id').value,
                    nombre,
                    id_usuario: sessionStorage.getItem('usuario')
                },
                success: function (response) {
                    console.log(response);
                    if (response == 'Successfully') {
                        window.location.href = "../diario/toppings.html";
                    }
                }
            });
        }
    }
};