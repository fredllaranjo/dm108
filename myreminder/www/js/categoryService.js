var CategoryService = {
    getColor: function () {

        var colorCall = $.ajax({
            type: "GET",
            url: "http://www.colr.org/json/color/random"
        });

        return colorCall;

    }
}