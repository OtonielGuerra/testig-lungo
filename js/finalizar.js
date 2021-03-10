function finalizar() {
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'POST',
        data: {
            quest: 'finalizar_dia'
        },
        success: function (res) {
            if (res == "Successfuly") {
                window.location.href = "../index.html";
            }else{
                Swal.fire({
                    title: ':(',
                    text: "Algo salió mal",
                    icon: 'error'
                });
            }
        }
    });
}