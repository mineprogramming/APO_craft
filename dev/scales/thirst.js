const THIRST_TICKS = 500;
const THIRST_WATER_RESTORES = 5;

var loaded = false;

var thirstScale = new ScalesRPG.Scale({
    textures:{
        full: "scale_water_0", 
        half: "scale_water_1", 
        empty: "scale_water_2"
    }
});


var ticks = THIRST_TICKS;
Callback.addCallback("tick", function(){
    let state = EntityState.getPlayerState();
    if(state.checkFlags(EntityState.RUNNING) 
        || state.checkFlags(EntityState.JUMPING)
        || state.checkFlags(EntityState.SWIMMING)
        || state.checkFlags(EntityState.FLOATING))
        ticks -= 2
    else if(state.checkFlags(EntityState.WALKING))
        ticks -= 1.5;
    else 
        ticks--;
    if(ticks <= 0){
        ticks = THIRST_TICKS;
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


Callback.addCallback("ItemUse", function(coords, item, block){
    if(item.id == 373){
        let thirst = thirstScale.getValue();
        if(thirst < 20){
            Player.decreaseCarriedItem(1);
            Player.addItemToInventory(374, 1, 0);
            
            thirst += THIRST_WATER_RESTORES;
            if(thirst > 20) thirst = 20;
            thirstScale.setValue(thirst);
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



