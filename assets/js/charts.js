function defaultChart(data) {
    console.log(data);
    if ((data.indexOf("No record found") > -1) || (data.indexOf("Date must be selected.") > -1)) {
        $('#msg').html('<span style="color:red;">' + data + '</span>');
    } else {
        $('#msg').empty();
        $('#chart').highcharts({
            chart: {
                zoomType: 'x'
            },

            title: {
                text: 'Application Throughput'
            },

            xAxis: {
                 type: 'datetime', dateTimeLabelFormats: { hour: '%H:%M:%S', day: '<b>%e\/%b\/%y</>' }, title: { text: 'Date' } 
            },

            yAxis: { title: { text: 'Value' }, min: 0 },

            tooltip: { headerFormat: '<b>{series.name}</b><br>', pointFormat: 'Date: {point.x:%e\/%b\/%y %H:%M:%S}<br>Value: {point.y}' },

            legend: {
                enabled: false
            },
           
            series: data
        });
    }
}