var chart;
function getChart(load) {

    var startDate = $('#range').val().slice(0, 10) + 'T' + $('#range').val().slice(11, 16) + ':00+00:00';
    var endDate = $('#range').val().slice(19, 29) + 'T' + $('#range').val().slice(30, 38) + ':00+00:00';
    var appName = $('select[name=applicationSelect]').val();
    var envName = $('select[name=environmentSelect]').val();
    var throughputName;
    var minName;
    var maxName;
    var meanName;
    var totalName;
    var extrapName;
    var extrapName2;
    var radios = document.getElementsByName('optradio');
    var grade;
    var go = false;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            if (radios[i].value == "4") {
                grade = 4;
                document.getElementById("checkbox-h-2g").checked = true;
            } else if (radios[i].value == "3") {
                grade = 3;
                document.getElementById("checkbox-h-2g").checked = true;
            } else {
                grade = 2;
                document.getElementById("checkbox-h-2g").checked = true;
            }
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    if ($('[name=checkbox-h-2a]').is(':checked')) {
        throughputName = "throughput";
        go = true;
    }
    if ($('[name=checkbox-h-2b]').is(':checked')) {
        meanName = "mean";
        go = true;
    }
    if ($('[name=checkbox-h-2c]').is(':checked')) {
        maxName = "max";
        go = true;
    }
    if ($('[name=checkbox-h-2d]').is(':checked')) {
        extrapName = "extrap";
        go = true;
    }
    if ($('[name=checkbox-h-2e]').is(':checked')) {
        totalName = "total";
        go = true;
    }
    if ($('[name=checkbox-h-2f]').is(':checked')) {
        minName = "min";
        go = true;
    }
    if ($('[name=checkbox-h-2g]').is(':checked')) {
        extrapName2 = "extrap2";
        go = true;
    }

    if (load == 0) {
        if (go == false) {
            alert("You must pick a calculation");
        }
        if (startDate == endDate) {
            alert("You must pick a date range");
        }
        if (appName == null) {
            alert("You must pick at least 1 Appliaction");
        }
        if (envName == null) {
            alert("You must pick at least 1 Environment");
        }
    }

    console.log(go);
    console.log(grade);
    console.log(appName);
    console.log(envName);
    console.log(startDate);
    console.log(endDate);
    Highcharts.setOptions({
        global: {
            useUTC: false,
        }
    });
    var options = {

        chart: {
            renderTo: 'chart',
            width: null,
            height: 500,
            zoomType: 'x'
        },

        title: {
            text: 'Application Throughput'
        },

        xAxis: {
            type: 'datetime', dateTimeLabelFormats: { hour: '%H:%M:%S', day: '<b>%e\/%b\/%y</>' }, title: { text: 'Date' }
        },

        yAxis: {
            title: { text: 'Value' }, min: 0
        },

        tooltip: { headerFormat: '<b>{series.name}</b><br>', pointFormat: 'Date: {point.x:%e\/%b\/%y %H:%M:%S}<br>Value: {point.y}' },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 50,
            enabled: true
        },

        series: []
    }

    // Load chart
    ajaxLoadChart(startDate, endDate, appName, envName);

    // Function for loading data via AJAX and showing it on the chart
    function ajaxLoadChart(startDate, endDate, appName, envName) {
        // If no data is passed (the chart was cleared)
        if (load == 0) {
            if (!startDate || !endDate || !go) {
                return;
            }
        }
         //Otherwise, issue an AJAX request
        var data = [];
        for (var i = 0; i < 100000; i++) {
            var tmp = [];
            for (var i = 0; i < 100000; i++) {
                tmp[i] = 'hue';
            }
            data[i] = tmp;
        };
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        console.log(percentComplete);
                        $('.progress').css({
                            width: percentComplete * 100 + '%'
                        });
                        if (percentComplete === 1) {
                            $('.progress').addClass('hide');
                        }
                    }
                }, false);
                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        console.log(percentComplete);
                        $('.progress').css({
                            width: percentComplete * 100 + '%'
                        });
                    }
                }, false);
                return xhr;
            },
            
            //url: 'http://localhost:8080/operations.PreProcessor',
            url: 'http://johnkiernan.ie:8083/IBMServlet_war/operations.PreProcessor',
            crossDomain: true,
            async: true,
            type: "GET",
            dataType: "json",
            data: {
                start: startDate,
                end: endDate,
                env: JSON.stringify(envName),
                app: JSON.stringify(appName),
                throughput: JSON.stringify(throughputName),
                min: JSON.stringify(minName),
                max: JSON.stringify(maxName),
                mean: JSON.stringify(meanName),
                total: JSON.stringify(totalName),
                extrap: JSON.stringify(extrapName),
                extrap2: JSON.stringify(extrapName2),
                grade: JSON.stringify(grade),
                arg: "chart"
            },
            success: function (json) {
                console.log(json);
                for (var i = 0; i < json.length; i++) {
                    options.series[i] = json[i];

                }
                chart = new Highcharts.Chart(options);
            },
            error: function (xhr, status, error) {
                alert(status + " " + error);
                console.log(xhr);
            }
        })
    }
};

function showAll() {
    for (var i = 0, len = chart.series.length; i < len; i++) {
        chart.series[i].setVisible(true, false);
    }
    chart.redraw();
}
function hideAll() {
    for (var i = 0, len = chart.series.length; i < len; i++) {
        chart.series[i].setVisible(false, false);
    }
    chart.redraw();
}
