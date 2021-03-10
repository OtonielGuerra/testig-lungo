$(document).ready(function(){
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io',
        type: 'GET',
        data: {
            quest: 'admin_productos'
        },
        success: function(response){
            console.log(response);
            let list = JSON.parse(response);
            let template = '';
            list.forEach(list => {
                template += `
                <button type="button" onclick=(editar(${list.id})) class="list-group-item list-group-item-action">${list.nombre}</button>
                `;
            });
            $("#listado").html(template);
        }
    });
});

function editar(id){
    sessionStorage.setItem('id_producto', id);
    window.location.href = "./esquema_producto.html"
}

function agregar_productos(){
    sessionStorage.removeItem('id_producto');
    window.location.href = "./esquema_producto.html"
}