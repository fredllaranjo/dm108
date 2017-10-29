var categories = [];
var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        StatusBar.backgroundColorByHexString("#ff5722");

        //get the current token
        window.FirebasePlugin.getInstanceId(
            function (token) {
                console.log(token);
            }, function (error) {
                alert(error);
            });
        //subscribe to topic "myreminder"
        window.FirebasePlugin.subscribe("myreminder");
        window.FirebasePlugin.onNotificationOpen(
            function (notification) {
                alert(JSON.stringify(notification));
            }, function (error) {
                alert(error);
            });
        initializeDefaultStorage();
    }
};
app.initialize();
function initializeDefaultStorage() {
    NativeStorage.getItem("categories",
    function onSuccess(obj) {
        categories = obj;
        alert(categories);
    }, function onError(err) {
        console.log(err.code);
        var defaultCategories = ["Cordova Tips", "Sweden Tips"];
        NativeStorage.setItem("categories", defaultCategories,
            function onSuccess(obj) { alert("Categories successfully initialized!") },
            function onError(err) { console.log(err.code); });
    });
};

/*
FCM Message definition:
Request:
Method: POST
Endpoint: https://fcm.googleapis.com/fcm/send
Header: Authorization : key=AAAA81Q0Pps:APA91bHSei9B3_3jwYG4okFpctGiCB32lfxzbdpStfxQDRjhJUmd18d-VYaFP_ZvBEQwhfhce6vgx7aaFH79Z-aIPbuH2y2Gq2ZApPJc2ExRlewRQlQzoxFw1KHxlZ33JOOiQiCauDuw
Body:
{ "data": {
        "Reminder" : "Cordova",
        "Reminder" : "Sweden",
        "Reminder" : "Coffee"
    },
    "priority":"high",
    "notification" : {
        "body" : "This is a reminder to look at yours reminders",
        "title" : "Remind to MyReminder"
    },
    "to" : "/topics/myreminder"
}
 */