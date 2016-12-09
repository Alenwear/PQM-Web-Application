$(function(){
    //TODO AJAX REQUEST TO GET NUMIMPACTS, PROCESS QUALITY, JSONINDEX FOR CSFBP-TABLE
    //TODO AJAX REQUEST GO GET BUSINESS QUALITY, TECHNICAL QUALITY, JSONINDEX FOR BTA-TABLE
    $.ajax({
        url: '../GSIback/getresults.php',                  //the script to call to get data
        data: "",                        //you can insert url argumnets here to pass to api.php
                                         //for example "id=5&parent=6"
        dataType: 'json',                //data format
        success: function (data) {
            createCSFBPtable(data);
            createBTAtable(data);
        }
    });
});

function createCSFBPtable(data){
    var classifications = ['E','D','C','B','A'];
    console.log(data);
    //console.log(data.length);
    var maxImpacts = 0;
    for (var i = 0; i<data.length; i++){
        if (data[i]['impactTotal']>maxImpacts)
            maxImpacts = data[i]['impactTotal'];
    }

    //console.log(maxImpacts);
    var table = document.getElementById("csfbp-table");

    for (var i = 0; i<=maxImpacts;i++){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = (maxImpacts-i).toString();
        for (var k = 0; k<5; k++){
            var cell = row.insertCell(k + 1);
            for (var j = 0; j <data.length; j++){
                if (data[j]['impactTotal'] == i){
                    if (data[j]['processQuality'] == k){
                        if (data[j]['bigBurner'] == 1) {
                            cell.innerHTML += "<strong>" + "BP"+j.toString() + "\n</strong>";
                        }
                        else {
                            cell.innerHTML += "BP" + j.toString() + "\n";
                        }
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

function createBTAtable(data){
    var classifications = ['D','C','B','A'];

    //console.log(maxImpacts);
    var table = document.getElementById("bta-table");

    for (var i = 0;i<classifications.length;i++){
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = classifications[classifications.length-1-i];
        cell1.align = "right";
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
            for (var j = 0; j <data.length; j++){
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