var app = {
       initialize: function() {
           document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);     }, 

       // deviceready Event Handler
       // Bind any cordova events here. Common events are:
       // 'pause', 'resume', etc.
       onDeviceReady: function() {
        StatusBar.backgroundColorByHexString("#ff5722");
           myApp.alert('Exemplo modal', 'Exemplo modal!');     } };
   app.initialize();
