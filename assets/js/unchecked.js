function uncheck() {

    if ($('[name=max]').is(':checked')) {
        $('[name=max]').attr('checked', false);
    }

    if ($('[name=min]').is(':checked')) {
        $('[name=min]').attr('checked', false);
    }

    if ($('[name=total]').is(':checked')) {
        $('[name=total]').attr('checked', false);
    }

    if ($('[name=mean]').is(':checked')) {
        $('[name=mean]').attr('checked', false);
    }

    if ($('[name=all]').is(':checked')) {
        $('[name=all]').attr('checked', false);
    }

    if ($('[name=hide]').is(':checked')) {
        $('[name=hide]').attr('checked', false);
    }

    if ($('[name=extrapo]').is(':checked')) {
        $('[name=extrapo]').attr('checked', false);
    }
    hideAll()
};