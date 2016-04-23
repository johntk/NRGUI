var chart;
function getChart() {
    
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
    
    if ($('[name=checkbox-h-2a]').is(':checked')) {
        throughputName = "throughput";
    }
    if ($('[name=checkbox-h-2b]').is(':checked')) {
        meanName = "mean";
    }
    if ($('[name=checkbox-h-2c]').is(':checked')) {
        maxName = "max";
    }
    if ($('[name=checkbox-h-2d]').is(':checked')) {
        extrapName = "extrap";
    }
    if ($('[name=checkbox-h-2e]').is(':checked')) {
        totalName = "total";
    }
    if ($('[name=checkbox-h-2f]').is(':checked')) {
        minName = "min";
    }
    if ($('[name=checkbox-h-2g]').is(':checked')) {
        extrapName2 = "extrap2";
    }

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
        if (!startDate || !endDate) {
            return;
        }
        // Otherwise, issue an AJAX request
        $.ajax({
            url: 'http://localhost:8080/operations.PreProcessor',
            //url: 'http://johnkiernan.ie:8083/IBMServlet_war/operations.PreProcessor',
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
