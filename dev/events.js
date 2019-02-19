IDRegistry.genItemID("Place");
Item.createItem("Place", "Structure Placer", {name: "place", meta: 0},{isTech:false,stack: 1});

Callback.addCallback("ItemUse", function(coords, item, block) {
    var x = coords.relative.x;
	var y = coords.relative.y;
	var z = coords.relative.z;
    
    if(item.id == ItemID.Place){
		runAsUI(function(){
			var items = [];
			for(i in buildings){
				items.push("Build #" + i + " (" + buildings[i].count + " blocks)");
			}
			
			var dialog = new AlertDialog.Builder(ctx);
			dialog.setTitle("What do you want to build?");
			dialog.setItems(items, function(d, item){
				buildings[item].build(x, y, z);
			});
			dialog.create().show();
		});
    }
});

var buildings = [];
Callback.addCallback("PostLoaded", function(){
    for(var i = 0; i < 46; i++){
       buildings.push(new Building(i + ".json"));
    }
});

Callback.addCallback("LevelLoaded", function(){
    Game.message("Raspberry Pi is a trademark of the Raspberry Pi Foundation");
    if(!inCity && __config__.getBool("split_on_start")){
        let coords = Player.getPosition();
        Split.summon(coords.x, coords.y, coords.z);
    }
});
