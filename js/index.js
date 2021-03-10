$(document).ready(function(){
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'conectado'
        },
        success: function (res) {
            if (res == 'no hay') {
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: "No conectado por " + res,
                    icon: 'error'
                });
            }else{
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: "Conectado",
                    icon: 'success'
                });
            }
        }
    });
});