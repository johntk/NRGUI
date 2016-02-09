$(function getDate() {

    // Set the default dates
    var startDate = Date.create(), // 1 days ago
	endDate = Date.create(); // today

    var range = $('#range');

    // Show the dates in the range input
    range.val(startDate.format('{yyyy}-{MM}-{dd}') + ' - '
			+ endDate.format('{yyyy}-{MM}-{dd}'));

    range.daterangepicker({
        startDate: startDate,
        endDate: endDate,
        ranges: {
            'Today': ['today', Date.create().addDays(1)],
            'Yesterday': ['yesterday', 'yesterday'],
            'Last 7 Days': [Date.create().addDays(-6), 'today'],
            'Last 30 Days': [Date.create().addDays(-29), 'today']
        }
    });
});