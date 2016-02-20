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


    $('[name=total]').change(function () {
        if ($(this).is(':checked')) {
            hideAll();
            showMin(1);
        }
        else {
            hideMin(1);
        }
    });

    $('[name=min]').change(function () {
        if ($(this).is(':checked')) {
            showMin(2);
        }
        else {
            hideMin(2);
        }
    });

    $('[name=max]').change(function () {
        if ($(this).is(':checked')) {
            showMin(3);
        }
        else {
            hideMin(3);
        }
    });

    $('[name=mean]').change(function () {
        if ($(this).is(':checked')) {
            showMin(4);
        }
        else {
            hideMin(4);
        }
    });

    $('[name=extrapo]').change(function () {
        if ($(this).is(':checked')) {
            showMin(0);
        }
        else {
            hideMin(0);
        }
    });

    $('[name=all]').change(function () {
        if ($(this).is(':checked')) {
            showMin(0);
        }
        else {
            hideMin(0);
        }
    });
});