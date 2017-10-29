var categories = [];
var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        $$(document).on("click", "#btnSaveAll", this.saveAll);
        $$(document).on("click", "#btnAddCategory", this.goToAdd);
        $$(document).on("click", "#save", CategoryController.save);
        $$(document).on("click", "#cancel", CategoryController.cancel);
    },
    goToAdd: function () {
        //Framework7 carregando a página addCategory
        var name = '';
        var lists = [];
        var promise = CategoryService.getColor();
        promise.done(function (data) {
            color = JSON.parse(data).colors[0].hex;
            mainView.router.loadPage("addCategory.html?name=" + name + "&color=" + color + "&lists=" + lists);
        }).fail(function (xhr) {
            console.log('error', xhr);
            mainView.router.loadPage("addCategory.html?name=" + name + "&color=FFFFFF&lists=" + lists);
        });
    },
    getCategories: function(){
        return categories;
    },
    setCategories: function(newCategories){
        categories = newCategories;
    },
    refreshCategoriesList: function(){
        var list = CategoryController.buildList();
        list.items = categories;
        list.update();
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
    },
    saveAll: function () {
        NativeStorage.setItem("categories", categories,
            function onSuccess(obj) {
                alert("All data saved!");
                var list = CategoryController.buildList();
                list.items = categories;
                list.update();
            },
            function onError(err) { console.log(err.code); });
    }
};
app.initialize();

function removeItem(name){
    CategoryController.remove(name);
};
function initializeDefaultStorage() {
    NativeStorage.getItem("categories",
        function onSuccess(obj) {
            categories = obj;
            var list = CategoryController.buildList();
            list.items = categories;
            list.update();
        }, function onError(err) {
            console.log(err.code);
            var defaultCategories = defaultStorage();
        });
};

function defaultStorage() {
    var defaultCategories = [];

    var promise = CategoryService.getColor();
    promise.done(function (data) {
        color = JSON.parse(data).colors[0].hex;
        defaultCategories.push(defaultStorageList1(color));
        var promise2 = CategoryService.getColor();
        promise2.done(function (data) {
            color = JSON.parse(data).colors[0].hex;
            defaultCategories.push(defaultStorageList2(color));
            finishCategoriesInitialization(defaultCategories);
        }).fail(function (xhr) {
            console.log('error', xhr);
            defaultCategories.push(defaultStorageList2(null));
            finishCategoriesInitialization(defaultCategories);
        });
    }).fail(function (xhr) {
        console.log('error', xhr);
        defaultCategories.push(defaultStorageList1(null));
        var promise2 = CategoryService.getColor();
        promise2.done(function (data) {
            color = JSON.parse(data).colors[0].hex;
            defaultCategories.push(defaultStorageList2(color));
            finishCategoriesInitialization(defaultCategories);
        }).fail(function (xhr) {
            console.log('error', xhr);
            defaultCategories.push(defaultStorageList2(null));
            finishCategoriesInitialization(defaultCategories);
        });
    });
    return defaultCategories;
};

function finishCategoriesInitialization(categories) {
    NativeStorage.setItem("categories", categories,
        function onSuccess(obj) {
            alert("Categories successfully initialized!");
            var list = CategoryController.buildList();
            list.items = categories;
            list.update();
        },
        function onError(err) { console.log(err.code); });
}

function defaultStorageList1(color) {
    var lists1 = [];
    var reminders11 = [];
    reminders11.push(new Reminder("Create project", "cordova create DIRETÓRIO_APP INDENTIFICADOR_PACOTE \"TÍTULO_APP\""));
    reminders11.push(new Reminder("Adding a platform", "cordova platform add browser | android"));
    reminders11.push(new Reminder("Running a platform", "cordova run browser | android"));
    reminders11.push(new Reminder("Change icon", "config.xml <icon src=\"resources/icon.png\" /> "));
    reminders11.push(new Reminder("Change Splash", "config.xml <splash src=\"resources/splash.png\" />"));
    lists1.push(new List("Commands and config", "Goal", "command/config", reminders11));
    var reminders12 = [];
    reminders12.push(new Reminder("Change Splash", "config.xml <splash src=\"resources/splash.png\" />"));
    reminders12.push(new Reminder("Status Bar", "cordova plugin add cordova-plugin-statusbar"));
    reminders12.push(new Reminder("Alerts, Dialogs", "cordova plugin add cordova-plugin-dialogs"));
    reminders12.push(new Reminder("Vibration", "cordova plugin add cordova-plugin-vibration"));
    reminders12.push(new Reminder("Network Info", "cordova plugin add cordova-plugin-network-information"));
    reminders12.push(new Reminder("Native Storage", "cordova plugin add cordova-plugin-nativestorage"));
    reminders12.push(new Reminder("Geolocation", "cordova plugin add cordova-plugin-geolocation"));
    reminders12.push(new Reminder("Device Info", "cordova-plugindevice"));
    reminders12.push(new Reminder("Contacts", "cordova plugin add cordova-plugin-contacts"));
    reminders12.push(new Reminder("SplashScreen", "cordova plugin add cordova-plugin-splashscreen"));
    lists1.push(new List("Plugins", "Purpose", "command", reminders12));
    return new Category("Cordova Tips", color, lists1);
}

function defaultStorageList2(color) {
    var lists2 = [];
    var reminders21 = [];
    reminders21.push(new Reminder("a", "\"aw\" sound in claw"));
    reminders21.push(new Reminder("e", "\"e\" sound in fell"));
    reminders21.push(new Reminder("i", "\"ee\" sound in fleece"));
    reminders21.push(new Reminder("o", "the pronunciation falls between that of \"o\" in \"close\" and \"oo\" in \"moose\""));
    reminders21.push(new Reminder("u", "\"oo\" sound in \"moose\""));
    reminders21.push(new Reminder("y", "the pronunciation falls between that of \"oo\" in \"moose\" and \"y\" in \"any\" (the trick: shape your mouth as if you were going to say \"y\" but then try to say \"oo\")"));
    reminders21.push(new Reminder("å", "the pronunciation falls between that of \"o\" in \"close\" and \"o\" in \"pot\""));
    reminders21.push(new Reminder("ä", "pronounced like the \"a\" in \"apple\""));
    reminders21.push(new Reminder("ö", "pronounced like the \"u\" in \"full\""));
    reminders21.push(new Reminder("j", "\"y\" sound in yellow"));
    reminders21.push(new Reminder("g", "pronounced like the English \"g\" if it is followed by an a, o, or å; pronounced like the \"y\" in \"yellow\" if followed by an e, i, ä, or ö"));
    reminders21.push(new Reminder("k", "pronounced like the English \"k\" if it is followed by an a, o, or å; pronounced like \"sh\" if followed by an e, i, ä, or ö"));
    reminders21.push(new Reminder("rs", "\"sh\" sound as in shop"));
    lists2.push(new List("Letters Pronunciation", "Letter", "Pronunciation in English", reminders21));
    var reminders22 = [];
    reminders22.push(new Reminder("Yes", "Ja"));
    reminders22.push(new Reminder("No", "Nej"));
    reminders22.push(new Reminder("Thank you", "Tack"));
    reminders22.push(new Reminder("That's fine", "Det är bra"));
    reminders22.push(new Reminder("You're welcome", "Varsågod"));
    reminders22.push(new Reminder("Please", "Snälla/Vänligen"));
    reminders22.push(new Reminder("Excuse me", "Ursäkta mig/Förlåt"));
    reminders22.push(new Reminder("Hello", "Hej"));
    reminders22.push(new Reminder("Goodbye", "Adjö/Hej då"));
    reminders22.push(new Reminder("I do not understand", "Jag förstår inte"));
    reminders22.push(new Reminder("Do you speak English?", "Talar du engelska?"));
    reminders22.push(new Reminder("What is your name?", "Vad heter du?"));
    reminders22.push(new Reminder("My name is...", "Jag heter …"));
    lists2.push(new List("Common Words and Greetings", "English Word/Phrase", "Swedish Word/Phrase", reminders22));
    var reminders23 = [];
    reminders23.push(new Reminder("Where is ...?", "Var finns …?"));
    reminders23.push(new Reminder("What time does the ... leave/arrive", "Nar ... avgar/kommer?"));
    reminders23.push(new Reminder("Train", "Tåget"));
    reminders23.push(new Reminder("Bus", "Bussen"));
    reminders23.push(new Reminder("Boat", "Båten"));
    reminders23.push(new Reminder("Tram", "Spårvagnen"));
    reminders23.push(new Reminder("Tram stop", "Spårvagnshållplatsen"));
    reminders23.push(new Reminder("Train station", "Tågstationen"));
    reminders23.push(new Reminder("Bus stop", "Busshållplatsen"));
    reminders23.push(new Reminder("Rooms available?", "Lediga rum?"));
    reminders23.push(new Reminder("No vacancies", "Fullt"));
    lists2.push(new List("Getting Around", "English Word/Phrase", "Swedish Word/Phrase", reminders23));
    var reminders24 = [];
    reminders24.push(new Reminder("How much is it?	Hur mycket kostar den?"));
    reminders24.push(new Reminder("Zero", "noll"));
    reminders24.push(new Reminder("One", "ett"));
    reminders24.push(new Reminder("Two", "två"));
    reminders24.push(new Reminder("Three", "tre"));
    reminders24.push(new Reminder("Four", "fyra"));
    reminders24.push(new Reminder("Five", "fem"));
    reminders24.push(new Reminder("Six", "sex"));
    reminders24.push(new Reminder("Seven", "sju"));
    reminders24.push(new Reminder("Eight", "åtta"));
    reminders24.push(new Reminder("Nine", "nio"));
    reminders24.push(new Reminder("Ten", "tio"));
    lists2.push(new List("Spending Money", "English Word/Phrase", "Swedish Word/Phrase", reminders24));
    var reminders25 = [];
    reminders25.push(new Reminder("Tourist Information	Turistinformation"));
    reminders25.push(new Reminder("My hotel", "Mitt hotell"));
    reminders25.push(new Reminder("Bank", "Bank"));
    reminders25.push(new Reminder("Police Station", "Polisstation"));
    reminders25.push(new Reminder("Post Office", "Postkontoret"));
    reminders25.push(new Reminder("Embassy", "Ambassaden"));
    reminders25.push(new Reminder("Public telephone", "Offentlig telefon"));
    reminders25.push(new Reminder("Market", "Marknaden"));
    reminders25.push(new Reminder("City center", "centrum"));
    reminders25.push(new Reminder("News agency", "Nyhetsbyrå"));
    reminders25.push(new Reminder("Restrooms", "Toalett"));
    reminders25.push(new Reminder("Entrance", "Ingång"));
    reminders25.push(new Reminder("Exit", "Utgång"));
    reminders25.push(new Reminder("Open", "öppen"));
    reminders25.push(new Reminder("Closed", "Stängd"));
    reminders25.push(new Reminder("Men", "Herrar"));
    reminders25.push(new Reminder("Women", "Damer"));
    reminders25.push(new Reminder("What time does ... open/close?", "När öppnar/stänger de?"));
    lists2.push(new List("Tourist Essentials", "English Word/Phrase", "Swedish Word/Phrase", reminders25));
    var reminders26 = [];
    reminders26.push(new Reminder("Monday	Måndag"));
    reminders26.push(new Reminder("Tuesday", "Tisdag"));
    reminders26.push(new Reminder("Wednesday", "Onsdag"));
    reminders26.push(new Reminder("Thursday", "Torsdag"));
    reminders26.push(new Reminder("Friday", "Fredag"));
    reminders26.push(new Reminder("Saturday", "Lördag"));
    reminders26.push(new Reminder("Sunday", "Söndag"));
    reminders26.push(new Reminder("Today", "Idag"));
    reminders26.push(new Reminder("Yesterday", "igår"));
    reminders26.push(new Reminder("Tomorrow", "Imorgon"));
    reminders26.push(new Reminder("morning", "Morgonen"));
    reminders26.push(new Reminder("Afternoon", "Eftermiddagen"));
    reminders26.push(new Reminder("What time is it?", "Vad ar klockan?"));
    lists2.push(new List("Time and Days of the Week", "English Word/Phrase", "Swedish Word/Phrase", reminders26));
    var reminders27 = [];
    reminders27.push(new Reminder("não falar oi alto (é uma interjeição EPA)"));
    reminders27.push(new Reminder("faça associação com inglês na leitura", "(alla dagar = all day)"));
    reminders27.push(new Reminder("j", "tem som de i"));
    reminders27.push(new Reminder("k", "tem som de x"));
    reminders27.push(new Reminder("a", "tem som de o (variados pois tem vários a)"));
    reminders27.push(new Reminder("loja de brinquedos", "toys r us"));
    reminders27.push(new Reminder("loja de tudo", "ikea"));
    reminders27.push(new Reminder("supermercado", "ica"));
    reminders27.push(new Reminder("presta atenção no acknowledge", "ahá ou á"));
    reminders27.push(new Reminder("svenska", "suécia"));
    reminders27.push(new Reminder("jag förstår inte svenska", "iog forstore inta svenská = eu nao entendo sueco"));
    reminders27.push(new Reminder("hej", "oi"));
    reminders27.push(new Reminder("hejdå", "hei dô = tchau"));
    reminders27.push(new Reminder("tack", "tác = obrigado"));
    reminders27.push(new Reminder("bra", "fine"));
    lists2.push(new List("Adriano Tips", "English Word/Phrase", "Swedish Word/Phrase", reminders27));
    return new Category("Sweden Tips", color, lists2);
}
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