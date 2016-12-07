$(function() {
    $('#matrix').submit(function (event) {
        event.preventDefault();
        // gather the form data
        var formName = $(this).attr('name');
        var formData = $(this).serialize();
        var formMethod = $(this).attr('method');
        var processingScript = $(this).attr('action');
        var critical = $('#critical').val().split(',');
        var business = $('#business').val().split(',');
        var data = "csflength"+"="+critical.length.toString()+"&";
        data += "bplength"+"="+business.length.toString()+"&";
        for (var i = 0; i<critical.length;i++){
            data += "csf"+i.toString()+"="+critical[i]+"&";
        }
        for (var i = 0; i<business.length;i++){
            data += "bp"+i.toString()+"="+business[i]+"&";
        }
        formData = data + formData;
        console.log(formData);

        // perform the AJAX request
        var request = $.ajax({
            url: processingScript,
            method: formMethod,
            data: formData
        });

        // handle the responses
        request.done(function (data) {
            //data: response from backend PHP
            if (data == -1) {
                alert("Something went wrong. Try again");
                window.location.href = "pqmmatrix.html";
            }
            else if (data == 1) {
                alert("Let's see the grids");
                window.location.href = "results.html";
            }
            else {
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
});

var uses = 0;
function generateTable() {
    if ($('#business').val() != "" && $('#critical').val() != "") {
        var always = ['Total impacts', 'Process Quality', 'Big Burner', 'Business Quality', 'Technical Quality'];
        var classifications = ['E','D','C','B','A'];
        var business = $('#business').val().split(',');
        var critical = $('#critical').val().split(',');
        var table = document.getElementById("projects-table");
        var tr = table.tHead.children[0];
        //TODO FIX BUG WHEN TABLE IS ALREADY CREATED
        if (uses == 0) {
            var th = document.createElement('th');
            th.innerHTML = " ";
            tr.appendChild(th);
            for (var i = 0; i < critical.length; i++) {
                var th = document.createElement('th');
                th.innerHTML = critical[i];
                th.name = "critical"+i.toString();
                th.value = critical[i];
                //th.className = "verticalTableHeader";
                tr.appendChild(th);
            }
            for (var i = 0; i < always.length; i++) {
                var th = document.createElement('th');
                th.innerHTML = always[i];
                //th.className = "verticalTableHeader";
                tr.appendChild(th);
            }
            uses++;
        }
        for (var i = 0; i < business.length; i++) {
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            cell1.name = "business"+i.toString();
            cell1.value = business[i];
            cell1.innerHTML = business[i];
            for (var j = 0; j < critical.length; j++) {
                var cell = row.insertCell(j + 1);
                var check = document.createElement("input");
                check.type = "checkbox";
                check.onclick = function(){
                    $('.table tr').each(function(){
                        var count = 0;
                        var hdn = $(this).find('input[name^="numImpacts"]');
                        count = $(this).find(':checkbox:checked').length;
                        hdn.val(count);
                    });
                };
                cell.appendChild(check);
            }
            cell = row.insertCell(j+1);
            var input = document.createElement("input");
            input.type = "text";
            input.name = "numImpacts"+i.toString();
            input.value = 0;
            cell.appendChild(input);
            cell = row.insertCell(j+2);
            var selectList = document.createElement("select");
            selectList.name = "processQuality"+i.toString();
            cell.appendChild(selectList);
            for (var k = 0; k < classifications.length; k++) {
                var option = document.createElement("option");
                option.value = k;
                option.text = classifications[k];
                selectList.appendChild(option);
            }
            cell = row.insertCell(j+3);
            var check = document.createElement("input");
            check.name = "bigBurner"+i.toString();
            check.type = "checkbox";
            cell.appendChild(check);
            cell = row.insertCell(j+4);
            var selectList = document.createElement("select");
            selectList.name = "businessQuality"+i.toString();
            cell.appendChild(selectList);
            for (var k = 0; k < classifications.length; k++) {
                var option = document.createElement("option");
                option.value = k;
                option.text = classifications[k];
                selectList.appendChild(option);
            }
            cell = row.insertCell(j+5);
            var selectList = document.createElement("select");
            selectList.name = "techQuality"+i.toString();
            cell.appendChild(selectList);
            for (var k = 0; k < classifications.length; k++) {
                var option = document.createElement("option");
                option.value = k;
                option.text = classifications[k];
                selectList.appendChild(option);
            }
        }
    }
    else{
        alert('Fill all the fields');
    }
}