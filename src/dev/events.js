Callback.addCallback("LevelLoaded", function(){
    Game.message("Raspberry Pi is a trademark of the Raspberry Pi Foundation");
    if(!inCity && __config__.getBool("split_on_start")){
        let coords = Player.getPosition();
        Split.summon(coords.x, coords.y, coords.z);
    }
});
