var buildings = [];

function Building(filename){
    this.path = __dir__ + "buildings/" + filename;
    
    var blocks;
    var loot = [];
    
    var parseBlocks = function(array){
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < array[0].length; j++){
                for(var k = 0; k < array[0][0].length; k++){
                    let block = array[i][j][k];
                    if(Number.isInteger(block) || typeof block == "string"){
                        block = {id: block, data: 0}
                    } 
                    array[i][j][k] = {id: eval(block.id), data: block.data || block.meta || 0};
                }
            }
        }
        return array;
    };
    
    var parseLoot = function(array){
        for(var i in array){
            array[i].id = eval(array[i].id);
        }
        return array;
    };
    
    var getCount = function(){
        var count = 0;
        for(a in blocks){
            for(b in blocks[a]){
                for(c in blocks[a][b]){
                    count += 1;
                }
            }
        }
        return count;
    };
    
    var json = JSON.parse(readFile(this.path));
    if(DEBUG){
        // Save JSON object for building editor
        this.json = json;
    }
    
    if(Array.isArray(json)){
        blocks = parseBlocks(json);
    } else {
        blocks = parseBlocks(json.blocks);
        loot = parseLoot(json.loot);
    }
    
    if(!Array.isArray(loot)){
        loot = [];
    }
    
    for(var i in GLOBAL_LOOT){
        loot.push(GLOBAL_LOOT[i]);
    }
    
    this.count = getCount();
    this.size = {
        x: blocks[0].length,
        y: blocks.length,
        z: blocks[0][0].length
    }
    
    this.build = function(x1, y1, z1, edit){
        //Choose random block for generation
        var randoms = [];
        for(var key in json.randomizer){
            var randomizer = json.randomizer[key];
            var arr = randomizer.variations;
            var variation = arr[randomInt(0, arr.length-1)];
            randoms.push({
                "block": {id: eval(randomizer.block.id), data: randomizer.block.data || randomizer.block.meta || 0}, 
                "variation": {id: eval(variation.id), data: variation.data || variation.meta || 0}
            });
        }

        if(DEBUG) {
            NativeAPI.setTileUpdateAllowed(false);
        }
        
        //generation itself
        for(var y = 0; y < blocks.length; y++){
            for(var x = 0; x < blocks[0].length; x++){
                for(var z = 0; z < blocks[0][0].length; z++){
                    var block = blocks[y][x][z];
                    
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
                    if(block.id == 54 && loot){
                        var container = World.getContainer(x + x1, y + y1, z + z1);
                        if(container != null){
                            for(var key in loot){
                                let item = loot[key];
                                if(Math.random() < item.chance){
                                    var count = randomInt(item.count.min, item.count.max);
                                    container.setSlot(Math.floor(Math.random() * 27), item.id || 0, count, item.meta || item.data || 0);
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
    }
}

Callback.addCallback("PostLoaded", function(){
    for(var i = 0; i < 46; i++){
       buildings.push(new Building(i + ".json"));
    }
});


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
                    BuildingEditor.current.build(x, y, z, true);
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