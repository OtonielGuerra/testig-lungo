$(document).ready(function () {
    if ((sessionStorage.getItem('id_producto') != null)) {
        $.ajax({
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'GET',
            data: {
                quest: 'admin_productos_especifico',
                id_producto: sessionStorage.getItem('id_producto')
            },
            success: function (response) {
                console.log(response);
                let list = JSON.parse(response);
                list.forEach(list => {
                    document.getElementById('titulo').innerHTML = list.nombre;
                    document.getElementById('id').value = list.id;
                    document.getElementById('nombre').value = list.nombre;
                    document.getElementById('descripcion').value = list.descripcion;
                    document.getElementById('precio').value = list.precio;
                    document.getElementById('inversion').value = list.inversion;
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
        document.getElementById('titulo').innerHTML = 'Nuevo Producto';
        document.getElementById('boton').innerHTML = 'Guardar';
        console.log(document.getElementById('boton').innerHTML);
        var template_1 = "<option selected value=\"0\">De Alta</option> <option value=\"1\">De Baja</option>";
        $("#estado").html(template_1);
    }
});


function validar() {
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
    var precio = document.getElementById("precio").value;
    var inversion = document.getElementById("inversion").value;
    var estado = document.getElementById("estado").value;
    if (nombre == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "El titulo está vacío",
            icon: 'warning'
        });
    } else if (descripcion == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "La descripción está vacía",
            icon: 'warning'
        });
    } else if (precio == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "El precio está vacía",
            icon: 'warning'
        });
    } else if (inversion == "") {
        Swal.fire({
            title: '¡Espera!',
            text: "La inversión está vacía",
            icon: 'warning'
        });
    } else {
        if (document.getElementById("boton").innerHTML == 'Guardar') {
            $.ajax({
                url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                type: 'POST',
                data: {
                    quest: 'agregar_producto',
                    nombre,
                    descripcion,
                    precio,
                    inversion,
                    estado,
                    id_usuario: sessionStorage.getItem('usuario')
                },
                success: function (response) {
                    console.log(response);
                    if (response == 'Successfully') {
                        window.location.href = "../diario/admin_productos.html";
                    }
                }
            });
        }else{
            $.ajax({
                url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
                type: 'POST',
                data: {
                    quest: 'actualizar_producto',
                    id: document.getElementById('id').value,
                    nombre,
                    descripcion,
                    precio,
                    inversion,
                    estado,
                    id_usuario: sessionStorage.getItem('usuario')
                },
                success: function (response) {
                    console.log(response);
                    if (response == 'Successfully') {
                        window.location.href = "../diario/admin_productos.html";
                    }
                }
            });
        }
    }
};