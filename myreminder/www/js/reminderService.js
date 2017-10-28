var ReminderService = {
    getImage: function () {

        var imageCall = $.ajax({
            type: "GET",
            url: "https://source.unsplash.com/32x32/?color"
        });

        return imageCall;

    }
}