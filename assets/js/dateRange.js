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
        //ranges: {
        //    'Today': [moment(), moment()],
        //    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        //    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        //    'This Month': [moment().startOf('month'), moment().endOf('month')],
        //    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        //}
    });
});