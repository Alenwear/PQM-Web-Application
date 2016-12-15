$(function(){
        // handle registration
    $('#edit').submit(function (event) {
        event.preventDefault();
        // gather the form data
        var formName = $(this).attr('name');
        var formData = $(this).serialize();
        var formMethod = $(this).attr('method');
        var processingScript = $(this).attr('action');

        // perform the AJAX request
        var request = $.ajax({
            url: processingScript,
            method: formMethod,
            data: formData
        });

        // handle the responses
        request.done(function (data) {
            //data: response from backend PHP
            if (data == -1){
                alert("Something went wrong. Try again");
                window.location.href = "editproject.html";
            }
            else if (data == 1){
                alert("Project successfully edited");
                window.location.href = "menu.html";
            }
            else{
                alert(data);
            }
        })
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
        })
        request.always(function (data) {
            // clear the form
            $('form[name="' + formName + '"]').trigger('reset');
        });
    });

    $.ajax({
        url: '../GSIback/editproject.php',
        data: "",
        dataType: 'json',
        success: function (data) {
            fillFields(data);
        }
    });
});

function fillFields(data) {
    var name = document.getElementsByName("name")[0];
    name.value = data[0]['enterprise'];
    var enterprise = document.getElementsByName("enterprise")[0];
    enterprise.value = data[0]['enterprise'];
    var mission = document.getElementsByName("mission")[0];
    mission.value = data[0]['mission'];

    var upwards = document.getElementsByName("upwards")[0];
    var external = document.getElementsByName("external")[0];
    var functional = document.getElementsByName("functional")[0];
    var peer = document.getElementsByName("peer")[0];

    for (var i = 1; i < data.length; i++){
        switch (data[i]['type']){
            case 0:
                upwards.value += data[i]['name'] + ",";
                break;
            case 1:
                external.value += data[i]['name'] + ",";
                break;
            case 2:
                functional.value += data[i]['name'] + ",";
                break;
            case 3:
                peer.value += data[i]['name'] + ",";
                break;
        }
    }

    upwards.value = upwards.value.substring(0,upwards.value.length-1);
    external.value = external.value.substring(0,external.value.length-1);
    functional.value = functional.value.substring(0,functional.value.length-1);
    peer.value = peer.value.substring(0,peer.value.length-1);

}