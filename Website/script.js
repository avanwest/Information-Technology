window.onload = function () {
    
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            var fileExtension = /text.*/;
            var fileTobeRead = fileSelected.files[0];
            
            if (fileTobeRead.type.match(fileExtension)) {
                var fileReader = new FileReader();

                fileReader.onload = function (e) {
                    var components = document.getElementById('components');
                    var dataArray = [];
                    var scheme = [];
                    var userInfo = [];
                    var authority = [];
                    var host = [];
                    var port = [];
                    var path = [];
                    var query = []; 
                    var fragment = [];
                    var tld = [];
                    var ip = [];

                    dataArray = fileReader.result.split('\n');
                    dataArray = dataArray.filter(function (e) { return e });

                    for (var i = 0; i < dataArray.length; i++) {
                        var urlObj = new URL(dataArray[i]);
                        host[i] = urlObj.hostname;
                        port[i] = urlObj.port;
                        path[i] = urlObj.pathname;
                        query[i] = urlObj.search;
                        fragment[i] = urlObj.hash;
                        scheme[i] = urlObj.protocol;
                        userInfo[i] = urlObj.username;

                        var u1 = userInfo[i].length > 0 ? userInfo[i] + "@" : "";
                        var p1 = port[i].length > 0 ? ":" + port[i] : "";
                        authority[i] = "//" + u1 + host[i] + p1;
                        tld[i] = host[i].split('.')[(host[i].split('.').length) - 1];
                        ip[i] = getIP(host[i]);

                        var div = document.createElement('div');
                        div.className = 'url';
                        div.innerHTML = "<br>URL: " + dataArray[i] +
                            "<br>Scheme: " + scheme[i] +
                            "<br>Authority: " + authority[i] +
                            "<br>User Info: " + userInfo[i] +
                            "<br>Host: " + host[i] +
                            "<br>Port: " + port[i] +
                            "<br>TLD: " + tld[i] +
                            "<br>Path: " + path[i] +
                            "<br>Query: " + query[i] +
                            "<br>Fragment: " + fragment[i] +
                            "<br>IP: " + ip[i];
                        components.appendChild(div);

                        var count_scheme = {};
                        for (var k = 0; k < scheme.length; k++) {
                            count_scheme[scheme[k]] = 1 + (count_scheme[scheme[k]] || 0);
                        }
                        var count_authority = {};
                        for (k = 0; k < authority.length; k++) {
                            count_authority[authority[k]] = 1 + (count_authority[authority[k]] || 0);

                        }
                        var count_userInfo = {};
                        for (k = 0; k < userInfo.length; k++) {
                            count_userInfo[userInfo[k]] = 1 + (count_userInfo[userInfo[k]] || 0);
                        }
                        var count_host = {};
                        for (k = 0; k < host.length; k++) {
                            count_host[host[k]] = 1 + (count_host[host[k]] || 0);
                        }
                        var count_port = {};
                        for (k = 0; k < port.length; k++) {
                            count_port[port[k]] = 1 + (count_port[port[k]] || 0);
                        }
                        var count_tld = {};
                        for (k = 0; k < tld.length; k++) {
                            count_tld[tld[k]] = 1 + (count_tld[tld[k]] || 0);
                        }
                        var count_path = {};
                        for (k = 0; k < path.length; k++) {
                            count_path[path[k]] = 1 + (count_path[path[k]] || 0);
                        }
                        var count_query = {};
                        for (k = 0; k < query.length; k++) {
                            count_query[query[k]] = 1 + (count_query[query[k]] || 0);
                        }
                        var count_fragment = {};
                        for (k = 0; k < fragment.length; k++) {
                            count_fragment[fragment[k]] = 1 + (count_fragment[fragment[k]] || 0);
                        }


                        // Load google charts
                        google.charts.load('current', { 'packages': ['corechart'] });
                        google.charts.setOnLoadCallback(drawChart);

                        // Draw the chart and set the chart values
                        function drawChart() {
                            drawPieChart(count_scheme, 'scheme');
                            drawPieChart(count_authority, 'authority');
                            drawPieChart(count_userInfo, 'userInfo');
                            drawPieChart(count_host, 'host');
                            drawPieChart(count_port, 'port');
                            drawPieChart(count_tld, 'tld');
                            drawPieChart(count_path, 'path');
                            drawPieChart(count_query, 'query');
                            drawPieChart(count_fragment, 'fragment');

                        }

                    }


                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Please select text file");
            }

        }, false);
    }
    else {
        alert("Files are not supported");
    }
}


function drawPieChart(countData, component) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'category');
    data.addColumn('number', 'count');
    var colData = [];
    for (var x = 0; x < Object.keys(countData).length; x++) {
        colData[x] = [];
        colData[x][0] = Object.keys(countData)[x];
        colData[x][1] = Object.values(countData)[x];
    }
    data.addRows(colData);



    //  add a title and set the width and height of the chart
    var options = { 'title': 'Occurences of ' + component, 'width': 550, 'height': 400 };

    // display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById(component));
    chart.draw(data, options);
}

function getIP(hostname) {
    if (hostname.length == 0) return "none";
    try {
        var responseText = httpGet("https://dns.google.com/resolve?name=" + hostname);
        var json = JSON.parse(responseText);
        return json.Answer[json.Answer.length - 1].data;
    }
    catch {
        return "none";
    }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}