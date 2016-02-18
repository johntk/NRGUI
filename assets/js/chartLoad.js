function getChart() {

    var startDate = $('#range').val().slice(0, 10) + 'T' + $('#range').val().slice(11, 16) + ':00+00:00';
    var endDate = $('#range').val().slice(19, 29) + 'T' + $('#range').val().slice(30, 38) + ':00+00:00';
    var appName = $('select[name=applicationSelect]').val();
    var envName = $('input[name=env]:checked').val();
    var chartType = $('input[name=chart]:checked').val();
    var chart;
    console.log(appName);
    console.log(envName);
    console.log(startDate);
    console.log(endDate);
    console.log(chartType);

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
            enabled: false
        },

        series: []
    }

    // Load chart
    ajaxLoadChart(startDate, endDate, appName, envName, chartType);

    // Function for loading data via AJAX and showing it on the chart
    function ajaxLoadChart(startDate, endDate, appName, envName, chartType) {
        // If no data is passed (the chart was cleared)
        if (!startDate || !endDate) {
            return;
        }
        // Otherwise, issue an AJAX request
        $.ajax({
            url: 'http://johnkiernan.ie:8083/IBMServlet_war/operations.PreProcessor',
            crossDomain: true,
            async: true,
            type: "GET",
            dataType: "json",
            data: {
                start: startDate,
                end: endDate,
                env: envName,
                app: appName,
                type: chartType
            },
            success: function (json) {
                console.log(json);
                options.series[0] = json[0];
                options.series[1] = json[1];
                console.log(options.series[0]);
                chart = new Highcharts.Chart(options);
            },
            error: function (xhr, status, error) {
                alert(status + " " + error);
                console.log(xhr);
            }
        })
    }
};




