$(function() {

    // handle registration
    $('#create').submit(function (event) {
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
                window.location.href = "newproject.html";
            }
            else if (data == 1){
                alert("Project created");
                window.location.href = "pqmmatrix.html";
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
        url: '../GSIback/newproject.php',                  //the script to call to get data
        data: "",                        //you can insert url argumnets here to pass to api.php
                                         //for example "id=5&parent=6"
        dataType: 'json',                //data format
        success: function (data) {
            $('#output').text('Welcome back, ' + data);
        }
    });
});
