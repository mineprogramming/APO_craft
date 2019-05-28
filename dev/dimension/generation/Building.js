var buildings = [];

function Building(filename){
    this.path = __dir__ + "buildings/" + filename;
    
    var parseBlocks = function(array){
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < array[0].length; j++){
                for(var k = 0; k < array[0][0].length; k++){
                    let block = array[i][j][k];
                    if(Number.isInteger(block) || typeof block == "string"){
                        block = {id: block, data: 0}
                    }
                    if(typeof block.id == "string"){
                        block.id = eval(block.id);
                    }
                    array[i][j][k] = {id: block.id, data: block.data || block.meta || 0};
                }
            }
        }
        return array;
    };
    
    var parseLoot = function(array){
        for(var i in array){
            if(typeof array[i].id == "string"){
                array[i].id = eval(array[i].id);
            }
        }
        return array;
    };
    
    this.json = JSON.parse(readFile(this.path));
    
    if(!this.json){
        throw "Building file not found or is not valid: " + this.path;
    }
        
    if(Array.isArray(this.json)){
        this.blocks = parseBlocks(this.json);
    } else {
        this.blocks = parseBlocks(this.json.blocks);
        this.loot = parseLoot(this.json.loot);
    }
    
    if(!Array.isArray(this.loot)){
        this.loot = [];
    }
    
    for(var i in GLOBAL_LOOT){
        this.loot.push(GLOBAL_LOOT[i]);
    }
    
    this.size = {
        x: this.blocks[0].length,
        y: this.blocks.length,
        z: this.blocks[0][0].length
    }
    
    this.count = this.size.x * this.size.y * this.size.z; 
}


Callback.addCallback("PostLoaded", function(){
    var caching = __config__.getBool("caching");
    if(!caching || !BuildingsSystem.loadCache()){
        // load from mods file and parse
        BuildingsSystem.loadNormal();
        if(caching){
            BuildingsSystem.saveCache();
        }
    }
    BuildingsSystem.customLoading("Post Initialization...");
});

var BuildingsSystem = {
    staticidsFile: FileTools.getFullPath("games/com.mojang/mods/.staticids"),
    checksumFile: FileTools.getFullPath("games/com.mojang/innercore/cache/checksum.txt"),
    cacheFile: FileTools.getFullPath("games/com.mojang/innercore/cache/apo.json"),
    
    build: function(building, x1, y1, z1, edit){
        //Choose random block for generation
        var randoms = [];
        for(var key in building.json.randomizer){
            var randomizer = building.json.randomizer[key];
            if(typeof randomizer.block.id == "string"){
                randomizer.block.id = eval(randomizer.block.id);
            }
            var arr = randomizer.variations;
            var variation = arr[randomInt(0, arr.length-1)];
            if(typeof variation.id == "string"){
                variation.id = eval(variation.id);
            }
            randoms.push({
                "block": {id: randomizer.block.id, data: randomizer.block.data || randomizer.block.meta || 0}, 
                "variation": {id: variation.id, data: variation.data || variation.meta || 0}
            });
        }

        if(DEBUG) {
            NativeAPI.setTileUpdateAllowed(false);
        }
        
        //generation itself
        for(var y = 0; y < building.blocks.length; y++){
            for(var x = 0; x < building.blocks[0].length; x++){
                for(var z = 0; z < building.blocks[0][0].length; z++){
                    var block = building.blocks[y][x][z];
                    
                    if(!edit && block.id == 0)
                        continue;
                    
                    if(!edit){
                        for(var key in randoms){
                            var random = randoms[key];
                            if(random.block.id == block.id && (random.block.meta || random.block.data) == block.data){
                                block = random.variation;
                            }
                        }
                    }
                    
                    World.setBlock(x + x1, y + y1, z + z1, block.id, block.data);
                    if(block.id == 54 && building.loot){
                        var container = World.getContainer(x + x1, y + y1, z + z1);
                        if(container != null){
                            for(var key in building.loot){
                                let item = building.loot[key];
                                if(Math.random() < item.chance){
                                    var count = randomInt(item.count.min, item.count.max);
                                    if(!item.id){
                                        Game.message("Error adding item n°" + key + " to generated chest");
                                    } else {
                                        container.setSlot(Math.floor(Math.random() * 27), item.id, count, item.meta || item.data || 0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if(DEBUG) {
            NativeAPI.setTileUpdateAllowed(true);
        }
    },
    
    loadNormal: function(){
        var time = Date.now();
        for(var i = 0; i < BUILDINGS_COUNT; i++){
            BuildingsSystem.customLoading("[A.P.O. Craft] Loading buildings: " + (i + 1) + "/" + BUILDINGS_COUNT);
            buildings.push(new Building(i + ".json"));
        }
        Logger.Log(BUILDINGS_COUNT + " buildings loaded in " + (Date.now() - time) + " milliseconds", "A.P.O. Craft");
    },
    
    loadCache: function(){
        BuildingsSystem.customLoading("[A.P.O. Craft] Loading buildings from cache...");
        
        // Get cached .staticids size
        this.currentLength = new java.io.File(this.staticidsFile).length();
        var cachedLength = FileTools.ReadText(this.checksumFile);
      
        if(this.currentLength == cachedLength){
            // load from cache
            var time = Date.now();
            buildings = FileTools.ReadJSON(this.cacheFile);
            if(!buildings || buildings.length == 0){
                return false;
            }
            Logger.Log(BUILDINGS_COUNT + " buildings loaded from cache in " + (Date.now() - time) + " milliseconds", "A.P.O. Craft");
            return true;
        }
        
        return false;
    },
    
    saveCache: function(){
        // Save cache
        BuildingsSystem.customLoading("[A.P.O. Craft] Saving cache...");
        var time = Date.now();
        FileTools.WriteJSON(this.cacheFile, buildings);
        FileTools.WriteText(this.checksumFile, "" + this.currentLength);
        Logger.Log("Cache files generated in " + (Date.now() - time) + " milliseconds", "A.P.O. Craft");
    },
    
    customLoading: function(text){
        var clazz = java.lang.Class.forName("zhekasmirnov.launcher.ui.LoadingUI", true, UI.getContext().getClass().getClassLoader());
        clazz.getMethod("setText", new java.lang.String().getClass()).invoke(null, new java.lang.String(text));
    }
}


function readFile(path){
    var reader = new BufferedReader(new FileReader(path));
    var builder = new StringBuilder();
    
    try{
        var line = reader.readLine();
        while (line != null) {
            builder.append(line);
            line = reader.readLine();
        }
        return builder.toString();
    } catch(e){
        Game.message(e);
    }
}



/* BUILDING EDITOR 
 * Module that allows for quick and easy building editing.
 *  - place the building you want to edit wherever you want using Structure Placer
 *  - edit it as you like
 *  - save it by typing //save command
 * You should reload Inner Core to see the effects
*/

if(DEBUG){
    const GOLD = "§6";
    const AQUA = "§b";
    const GREEN = "§a";
    const RED = "§c";
    
    // WorldEdit integrations
    var WorldEdit;
    var WorldEditCommands;

    ModAPI.addAPICallback("WorldEdit", function(api){
        WorldEdit = api.WorldEdit;
        WorldEditCommands = api.WorldEditCommands;
        
        // Register //save command
        WorldEditCommands["//save"] = {
            name:"//save",
            description:"Saves A.P.O. Craft building to file",
            args:"",
            func:function(){
                if(!WorldEdit.getValidPosition()){
                    Game.message("Area is not selected");
                    return;
                }
                
                if(Array.isArray(BuildingEditor.current.json)){
                    BuildingEditor.current.json = BuildingEditor.getBlocks();
                } else {
                    BuildingEditor.current.json.blocks = BuildingEditor.getBlocks();
                }
                FileTools.WriteText(BuildingEditor.current.path, JSON.stringify(BuildingEditor.current.json));
                Game.message(GREEN + "Successfully saved to " + BuildingEditor.current.path);
            },
        }
    });
    
    
    // Structure Placer
    IDRegistry.genItemID("placerStructure");
    Item.createItem("placerStructure", "Structure Placer", {name: "place", meta: 0},{stack: 1});
    
    var BuildingEditor = {
        edit: function(x, y, z){
            runAsUI(function(){
                var items = [];
                for(i in buildings){
                    items.push("Build #" + i + " (" + buildings[i].count + " blocks)");
                }
                
                var dialog = new AlertDialog.Builder(ctx);
                dialog.setTitle("What do you want to build?");
                dialog.setItems(items, function(d, item){
                    BuildingEditor.current = buildings[item];
                    BuildingsSystem.build(BuildingEditor.current, x, y, z, true);
                    WorldEdit.selectPosition({x: x, y: y, z: z}, {
                        x: x + BuildingEditor.current.size.x,
                        y: y + BuildingEditor.current.size.y,
                        z: z + BuildingEditor.current.size.z
                    });
                    Game.message(AQUA + "Editing building with id: " + item);
                });
                dialog.create().show();
            });
        },
        
        getBlocks: function(){
            let blocks  = [];
            let zTiles = [];
            let xTiles = [];
            
            let x1 = WorldEdit.pos1.x;
            let y1 = WorldEdit.pos1.y;
            let z1 = WorldEdit.pos1.z;
            let x2 = WorldEdit.pos2.x;
            let y2 = WorldEdit.pos2.y;
            let z2 = WorldEdit.pos2.z;

            for(var y = y1; y <= y2; y++){
                for(var x = x1; x <= x2; x++){
                    for(var z = z1; z <= z2; z++){
                        var block = World.getBlock(x, y, z);
                        
                        // Allow for custom blocks
                        if(block.id > 256){
                            for(var i in BlockID){
                                if(BlockID[i] == block.id){
                                    block.id = "BlockID." + i;
                                    break;
                                }
                            }
                        }
                        
                        // Drop redundant data for blocks without it
                        if(block.data == 0){
                            block = block.id;
                        }
                        zTiles[z - z1] = block;
                    }
                    xTiles[x - x1] = zTiles;
                    zTiles = [];
                }
                blocks[y - y1] = xTiles;
                xTiles = [];
            }

            return blocks;
        }
    }


    Callback.addCallback("ItemUse", function(coords, item, block) {
        var x = coords.relative.x;
        var y = coords.relative.y;
        var z = coords.relative.z;
        
        if(item.id == ItemID.placerStructure){
            BuildingEditor.edit(x, y, z);
        }
    });
}