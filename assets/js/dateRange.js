$(function getDate() {

    // Set the default dates
    var startDate = moment(), // 1 days ago
	endDate = moment(); // today

    var range = $('#range');

   
    // Show the dates in the range input
    //range.val(startDate.format('yyyy-dd-mm') + ' - '
	//		+ endDate.format('yyyy-dd-mm'));

    console.log("Start date " + startDate);

    range.daterangepicker({
        timePicker: true,
        timePicker24Hour: true,
        showDropdowns: true,
        linkedCalendars: false,
        startDate: startDate,
        sideBySide: true,
        endDate: endDate,
        locale: {
            format: 'YYYY-MM-DD HH:mm'
        },
        ranges: {
            'Today': [moment().startOf('day'), moment()],
            'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().startOf('day')],
            'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment()],
            'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
            'Last Week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week').endOf('day')],
            'Two Weeks ago': [moment().subtract(2, 'weeks').startOf('week'), moment().subtract(2, 'weeks').endOf('week').endOf('day')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month').endOf('day')],
            'One hour (extrap)': [moment().startOf('day'), moment().add(1, 'hour')],
            'Four hours (extrap)': [moment().startOf('day'), moment().add(4, 'hour')],
            'Tomorrow (extrap)': [moment().subtract(1, 'days'), moment().add(1, 'days')],
            'Next Week (extrap)': [moment().subtract(6, 'days').startOf('day'), moment().add(7, 'days')],
        }
    });
});