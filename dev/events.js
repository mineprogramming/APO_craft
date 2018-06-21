Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x
    var y = coords.relative.y
    var z = coords.relative.z
    
    if(item.id == 280){
        
        Game.message(x + "; " + y + "; " + z);
        var i = Math.floor(Math.random() * 46);
        Game.message(i + ": " + buildings[i]);
        buildings[i].build(x, y, z);
    }
});




var buildings = [];


Callback.addCallback("PostLoaded", function(){
    for(var i = 1; i <= 46; i++){
        buildings.push(new Building(i + ".json"));
    }
});
