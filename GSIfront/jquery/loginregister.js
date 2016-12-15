$(function(){

    // handle registration
    $('#register').submit(function(event){
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
            data: formData,
            dataType: "html"
        });

        // handle the responses
        request.done(function(data) {
            //data: response from backend PHP
            alert(data);
        })
        request.fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        })
        request.always(function(data) {
            // clear the form
            $('form[name="' + formName + '"]').trigger('reset');
        });
    });

    $('#login').submit(function(event){
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
            data: formData,
            dataType: "json"
        });

        // handle the responses
        request.done(function(data) {
            // update the user
            //data: response from backend PHP
            if (data == -1) {
                alert('Someting went wrong');
            }
            else{
                window.location.href = "menu.html";
            }

        })
        request.fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        })
        request.always(function(data) {
            // clear the form
            $('form[name="' + formName + '"]').trigger('reset');
        });
    });

    $('#login-form-link').click(function(e) {
        $('#login').delay(100).fadeIn(100);
        $('#register').fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $('#register').delay(100).fadeIn(100);
        $('#login').fadeOut(100);
        $("#login-form-link").removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});