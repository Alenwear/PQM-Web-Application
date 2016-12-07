function newProject() {
    window.location.href = "newproject.html";
}

function deleteProject(row){
    var table = document.getElementById("projects-table");
    var firstRow = table.rows[row+1].cells;
    var id = firstRow.item(0).innerHTML;
    $.ajax({
        url: '../GSIback/deleteproject.php',
        data: {arguments: id},
        method: 'post',
        dataType: 'json',
        success: function(data){
            if (data == -1){
                alert('A error ocurred');
            }
            else{
                alert('Project successfully deleted');
                window.location.href = "menu.html";
            }
        }
    })
}

$(function(){
        // perform the AJAX request
    $.ajax({
        url: '../GSIback/getprojects.php',
        data: "",
        dataType: 'json',
        success: function(data) {
            $('#output').text('Welcome back, '+data[0]['userFirstName']);
            $.each(data, function(i, item) {
                if(i==0)
                    return;
                var $tr = $('<tr>').append(
                    $('<td>').text(item.ID),
                    $('<td>').text(item.name),
                    $('<td>').text(item.dateCreated),
                    $('<td>').html($('<input></input>').attr({'type': 'button','class': 'btn btn-sm btn-danger', 'id': 'row', 'onclick' : 'deleteProject('+i+')'}).val("Delete"))
                ).appendTo('#projects-table');
            });
        }
    });

});