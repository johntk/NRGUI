$(function () {

    // Set the default dates
    var startDate = Date.create().addDays(-6), // 7 days ago
	endDate = Date.create(); // today

    var range = $('#range');

    // Show the dates in the range input
    range.val(startDate.format('{yyyy}-{MM}-{dd}') + ' - '
			+ endDate.format('{yyyy}-{MM}-{dd}'));

    // Load chart
    ajaxLoadChart(startDate, endDate);

    range.daterangepicker({
        startDate: startDate,
        endDate: endDate,
        ranges: {
            'Today': ['today', 'today'],
            'Yesterday': ['yesterday', 'yesterday'],
            'Last 7 Days': [Date.create().addDays(-6), 'today'],
            'Last 30 Days': [Date.create().addDays(-29), 'today']
        }
    }, function (start, end) {
        ajaxLoadChart(start, end);
    });

    // Function for loading data via AJAX and showing it on the chart
    function ajaxLoadChart(startDate, endDate) {
        // If no data is passed (the chart was cleared)
        if (!startDate || !endDate) {
            return;
        }
        // Otherwise, issue an AJAX request
        $.ajax({
            url: 'http://192.168.1.6:8083/IBMServlet_war/operations.PreProcessor',
            crossDomain: true,
            async: true,
            type: "POST",
            dataType: "json",
            data: { start: startDate.format('{yyyy}-{MM}-{dd}'), end: endDate.format('{yyyy}-{MM}-{dd}') },
            success: function (data) {
                defaultChart(data);
            }
        }).error(function(xhr, status, error) {
            alert(status + " " + error);
                console.log(xhr);
        });
    }
});


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
                crosshairs: true,
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

