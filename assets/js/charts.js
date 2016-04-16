$("document").ready(function () {
    $('[name=hide]').change(function () {
        if ($(this).is(':checked')) {
            hideAll();
            $('#hide span').text('Show');
        }
        else {
            showAll();
            $('#hide span').text('Hide');
        }
    });
});