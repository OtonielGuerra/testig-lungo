function login() {
    var usuario = document.getElementById('usuario').value;
    var contrasena = (document.getElementById('password').value);
    if (usuario == '' || contrasena == '') {
        Swal.fire({
            title: 'Credenciales Inválidas',
            text: "No ha ingresado su usuario o su contraseña",
            icon: 'error'
        });
    } else {
        $.ajax({
            // url: '../db/inicia_conexion.php/',
            url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
            type: 'GET',
            data: {
                quest: 'login',
                usuario,
                contrasena
            },
            success: function (res) {
                console.log(res);
                if (res != 'NO') {
                    sessionStorage.setItem('usuario', res);
                    window.location.href = "../diario/administrador.html";
                } else if (res == 'NO') {
                    Swal.fire({
                        title: 'Credenciales Inválidas',
                        text: "Usuario o contraseña incorrectas!",
                        icon: 'error'
                    });
                } else {

                }
            }
        });
    }
}