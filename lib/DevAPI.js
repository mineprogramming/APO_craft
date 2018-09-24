LIBRARY({
    name: "DevAPI",
    version: 1,
    shared: true,
    api: "CoreEngine"
});


var DevAPI = {
    dump: function(obj){
        for(var key in obj){
            Game.message(key);
        }
    }, 
    
    iterate: function(){
        for(var key in obj){
            Game.message(key + ": " + obj[key]);
        }
    }
}


EXPORT("DevAPI", DevAPI);