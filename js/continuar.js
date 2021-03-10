$(document).ready(function(){
    var lista = document.getElementById('listado');
    $.ajax({
        url: 'http://app-b16d3b86-3a9c-4717-83e5-f46e758ea338.cleverapps.io?id=1',
        type: 'GET',
        success: function(response){
            let list = JSON.parse(response);
            let template = '';
            list.forEach(list => {
                template += `
                <button type="submit" class="list-group-item list-group-item-action">${list.nombre}</button>
                <input type="hidden" class="form-control" id="id_diario" name="id_diario" value="${list.id}">
                `;
            });
            $("#listado").html(template);
        }
    });
});