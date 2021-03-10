$(document).ready(function () {
    var listado = [];
    var storageList = localStorage.getItem('lista_productos');
    if (JSON.stringify(storageList) != 'null') {
        if (JSON.parse(storageList).length == 0) {
            return;
        }
        listado = JSON.parse(storageList);
        var template = '';
        var index = -1;
        var total = 0;
        listado.forEach(listado => {
            total = parseFloat(total) + parseFloat(listado.total);
            index += 1;
            template += `
            <tr>
                <td>${listado.cantidad}</td>
                <td>${listado.nombre}</td>
                <td>${listado.total}</td>
            </tr>
                `;
            $("#tabla").html(template);
            document.getElementById('totalidad').value = total;
            document.getElementById('total').innerHTML = `Total: Q.${total}`;
        });
    }
});