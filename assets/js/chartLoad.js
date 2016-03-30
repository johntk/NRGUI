var chart;
function getChart() {
    
    var startDate = $('#range').val().slice(0, 10) + 'T' + $('#range').val().slice(11, 16) + ':00+00:00';
    var endDate = $('#range').val().slice(19, 29) + 'T' + $('#range').val().slice(30, 38) + ':00+00:00';
    var appName = $('select[name=applicationSelect]').val();
    var envName = $('select[name=environmentSelect]').val();

    //var chartType = $('input[name=chart]:checked').val();
    
    console.log(appName);
    console.log(envName);
    console.log(startDate);
    console.log(endDate);
    //console.log(chartType);

    var options = {
       
        chart: {
            renderTo: 'chart',
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
                arg: "chart"
            },
            success: function (json) {
                console.log(json);
                //console.log(json.length);
                for (var i = 0; i < json.length; i++) {
                    options.series[i] = json[i];
                  
                }
                //options.series[0] = json[0];
                //options.series[1] = json[1];
                //options.series[2] = json[2];
                //options.series[3] = json[3];
                //options.series[4] = json[4];
                chart = new Highcharts.Chart(options); 
            },
            error: function (xhr, status, error) {
                alert(status + " " + error);
                console.log(xhr);
            }
        })
    }
};
function showMin(i) {

    chart.series[i].setVisible(true, false);
    chart.redraw();
}

function hideMin(i) {

    chart.series[i].setVisible(false, false);
    chart.redraw();
}
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
