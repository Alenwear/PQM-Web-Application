$(function(){
    //TODO AJAX REQUEST TO GET NUMIMPACTS, PROCESS QUALITY, JSONINDEX FOR CSFBP-TABLE
    //TODO AJAX REQUEST GO GET BUSINESS QUALITY, TECHNICAL QUALITY, JSONINDEX FOR BTA-TABLE
    $.ajax({
        url: '../GSIback/getresults.php',                  //the script to call to get data
        data: "",                        //you can insert url argumnets here to pass to api.php
                                         //for example "id=5&parent=6"
        dataType: 'json',                //data format
        success: function (data) {
            console.log(data);
            var classifications = ['E','D','C','B','A'];
        }
    });
});
