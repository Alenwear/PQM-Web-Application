$(function(){
    $.ajax({
        url: '../GSIback/getresults.php',
        data: "",
        dataType: 'json',
        success: function (data) {
            listProcesses(data);
            createCSFBPtable(data);
            createBTAtable(data);
            determineBPnoIT(data);
        }
    });

    $('#conclusion').submit(function (event) {
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
                window.location.href = "results.html";
            }
            else if (data == 1){
                alert("Conclusions successfully updated");
                window.location.href = "results.html";
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
});

function listProcesses(data){
    var list = document.getElementById("bpList");
    for (var i = 0; i<data.length-1; i++){
        list.innerHTML += "<strong>BP"+i.toString()+":</strong> "+data[i]['name'] + "<br/>"
    }
    var conclusions = document.getElementById("conclusions");
    conclusions.value = data[data.length-1]['conclusions'];
}

function determineBPnoIT(data){
    var list = document.getElementById("bpnoIT");
    for (var i = 0; i<data.length-1; i++){
        if (data[i]['businessQuality'] == 0 || data[i]['techQuality'] == 0){
            list.innerHTML += "<strong>BP"+i.toString()+":</strong> "+data[i]['name'] + "<br/>"
        }
    }
}

function createCSFBPtable(data){
    var classifications = ['E','D','C','B','A'];
    console.log(data);
    var maxImpacts = 0;
    for (var i = 0; i<data.length-1; i++){
        if (data[i]['impactTotal']>maxImpacts)
            maxImpacts = data[i]['impactTotal'];
    }
    if (maxImpacts < 7){
        maxImpacts = 7;
    }

    console.log(maxImpacts);
    var table = document.getElementById("csfbp-table");

    for (var i = 0; i<=maxImpacts;i++){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = (maxImpacts-i).toString();
        cell1.align = "center";
        for (var k = 0; k<5; k++){
            var cell = row.insertCell(k + 1);
            if (k==0){
                if (i<maxImpacts-2)
                    cell.className = "danger";
                else if (i > maxImpacts-1)
                    cell.className = "success";
                else
                    cell.className = "warning";
            }
            else if (k == 1){
                if (i < maxImpacts-maxImpacts+4)
                    cell.className = "danger";
                else if (i > maxImpacts-maxImpacts+5)
                    cell.className = "success";
                else
                    cell.className = "warning";
            }
            else if (k == 2){
                if (i < maxImpacts-maxImpacts+2)
                    cell.className = "danger";
                else if (i > maxImpacts-maxImpacts+4)
                    cell.className = "success";
                else
                    cell.className = "warning";
            }
            else if (k==3){
                if (i <maxImpacts-maxImpacts+4)
                    cell.className = "warning";
                else
                    cell.className = "success";
            }
            else if (k==4){
                cell.className ="success";
            }
            for (var j = 0; j <data.length-1; j++){
                if (data[j]['processQuality'] == k){
                    if (data[j]['impactTotal'] == maxImpacts-i){
                        if (data[j]['bigBurner'] == 1) {
                            cell.innerHTML += "<strong>" + "BP"+j.toString()+"\n</strong>";
                        }
                        else {
                            cell.innerHTML += "BP"+j.toString()+"\n";
                        }
                    }
                }
            }
        }
    }
    var tfoot = document.createElement('tfoot');
    tfoot.style.textAlign = "right";
    table.appendChild(tfoot);
    var tr = document.createElement('tr');
    tfoot.appendChild(tr);
    var th = document.createElement('th');
    th.innerHTML = " ";
    tr.appendChild(th);
    for (var i = 0; i < classifications.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = classifications[i];
        tr.appendChild(th);
    }
}

function createBTAtable(data){
    var classifications = ['D','C','B','A'];

    var table = document.getElementById("bta-table");

    for (var i = 0;i<classifications.length;i++){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = classifications[classifications.length-1-i];
        cell1.align = "center";
        for (var k = 0; k < classifications.length;k++){
            var cell = row.insertCell(k+1);
            if (i == 0 || i==1){
                if (k==0 || k==1){
                    cell.className = "danger";
                }
                else if( k==2 || k==3){
                    cell.className = "success";
                }
            }
            else{
                if (k==0||k==1){
                    cell.className = "warning";
                }
                else if( k==2 || k==3){
                    cell.className = "active";
                }
            }
            for (var j = 0; j <data.length-1; j++){
                if (data[j]['businessQuality'] == classifications.length-i){
                    if (data[j]['techQuality'] == k+1){
                        cell.innerHTML +="BP"+j.toString()+"\n";
                    }
                }
            }
        }
    }

    var tfoot = document.createElement('tfoot');
    table.appendChild(tfoot);
    var tr = document.createElement('tr');
    tfoot.appendChild(tr);
    var th = document.createElement('th');
    th.innerHTML = " ";
    tr.appendChild(th);
    for (var i = 0; i < classifications.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = classifications[i];
        tr.appendChild(th);
    }
}