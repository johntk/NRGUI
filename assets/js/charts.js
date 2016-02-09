function defaultChart(data) {
    if ((data.indexOf("No record found") > -1)
                     || (data.indexOf("Date must be selected.") > -1)) {
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
                type: 'datetime'
            },

            yAxis: {
                title: {
                    text: 'Request per minute in K'
                }
            },

            tooltip: {
                crosshairs: false,
                shared: true,

            },

            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                name: 'RPM',
                data: data
            }]
        });
    }
}