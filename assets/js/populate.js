function populate() {

    var app = false;
    var appSelect = $('#applicationSelect');
    var envSelect = $('#environmentSelect');
    // Issue an AJAX request
    $.ajax({
        
        //url: 'http://localhost:8080/operations.PreProcessor',
        url: 'http://johnkiernan.ie:8083/IBMServlet_war/operations.PreProcessor',
        crossDomain: true,
        async: true,
        type: "GET",
        traditional: true,
        dataType: "json",
        data: {
            arg: "list"
        },
        success: function (json) {
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];

                if (app == true) {
                    appSelect.append("<option value=" + obj + ">" + obj + "</option>");
                } else {
                    if(obj != "END")
                    envSelect.append("<option value=" + obj + ">" + obj + "</option>");
                }

                if (obj == "END") {
                    app = true;
                }
            }
            envSelect.multiselect();
            appSelect.multiselect();
        },
        error: function (xhr, status, error) {
            alert(status + " " + error);
            console.log(xhr);

        }
    })
}