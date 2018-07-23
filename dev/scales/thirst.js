var loaded = false;

var thirstScale = new ScalesRPG.Scale({
    textures:{
        full: "scale_water_0", 
        half: "scale_water_1", 
        empty: "scale_water_2"
    }
});

var ticks = 500;
Callback.addCallback("tick", function(){
    ticks--;
    if(ticks <= 0){
        ticks = 500;
        if(loaded){
            if(thirstScale.getValue() < 0){
                Entity.setHealth(Player.get(), Entity.getHealth(Player.get()) - 1);
            }
            else{
                
                thirstScale.decrease();
            }
        }
    }
});

Callback.addCallback("EntityDeath", function(entity){
    if(Player.isPlayer(entity)){
        ScalesRPG.resetAll();
    }
});

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "hud_screen" || 
      screenName == "in_game_play_screen"){
        thirstScale.show();
        loaded = true;
    }
});



