var buildings = [];


var GLOBAL_LOOT = [
    {
        "id": ItemID.drawingChipset,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingCpu,
        "meta": 0,
        "rarity": 0.005,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingCpu,
        "meta": 0,
        "rarity": 0.005,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingChipRam,
        "meta": 0,
        "rarity": 0.02,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingChipVideo,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingChipGeneratorSpaceTime,
        "meta": 0,
        "rarity": 0.003,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingPcbMotherboard,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingPcbPowerSupply,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingPcbCardVideo,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.drawingPcbControllerHdd,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.tableAssembly,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.cokeOven,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.crystalizer,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.extruder,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.burnerLaser,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.pressMetal,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.pressPlastic,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.polymerizer,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.rectifier,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.solderingStation,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.generatorLightning,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.generatorFuel,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": BlockID.casingStabilizer,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.pressFormPlate,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.pressFormBlade,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.pressFormRod,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.pressFormRadiator,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.karambitGradient,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.knifeButterfly,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.swordBig,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.glock18,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.bullet_9_19,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.deserteagle,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.rsh_12,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.bullet_12c7_55,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.ak47,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.ammo_assault,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.aa12,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.ammo_shotgun,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.sg_556,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.bullet_5c56_45,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.barrett,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    },
    {
        "id": ItemID.ammo_sniper,
        "meta": 0,
        "rarity": 0.01,
        "count": { "min": 1, "max": 1 }
    }
];

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
                                if(Math.random() < item.rarity){
                                    var count = Math.floor(Math.random() * (item.count.max - item.count.min + 1) + item.count.min);
                                    container.setSlot(Math.floor(Math.random() * 27), item.id, count, item.meta || item.data || 0);
                                }
                            }
                        }
                    }
                }
            }
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
    
    
    // Structure Placer
    IDRegistry.genItemID("placerStructure");
    Item.createItem("placerStructure", "Structure Placer", {name: "place", meta: 0},{isTech:false,stack: 1});
    
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
                    BuildingEditor.position = {x: x, y: y, z: z};
                    Game.message(AQUA + "Editing building with id: " + item);
                });
                dialog.create().show();
            });
        },
        
        save: function(){
            if(Array.isArray(BuildingEditor.current.json)){
                BuildingEditor.current.json = BuildingEditor.getBlocks();
            } else {
                BuildingEditor.current.json.blocks = BuildingEditor.getBlocks();
            }
            FileTools.WriteText(BuildingEditor.current.path, JSON.stringify(BuildingEditor.current.json));
            Game.message(GREEN + "Successfully saved to " + BuildingEditor.current.path);
        },
        
        getBlocks: function(){
            let blocks  = [];
            let ztiles = [];
            let xtiles = [];
            
            let x1 = BuildingEditor.position.x;
            let y1 = BuildingEditor.position.y;
            let z1 = BuildingEditor.position.z;
            let x2 = x1 + BuildingEditor.current.size.x;
            let y2 = y1 + BuildingEditor.current.size.y;
            let z2 = z1 + BuildingEditor.current.size.z;

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
                        ztiles[z - z1] = block;
                    }
                    xtiles[x - x1] = ztiles;
                    ztiles = [];
                }
                blocks[y - y1] = xtiles;
                xtiles = [];
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
    
    Callback.addCallback("NativeCommand", function(command){
        if(command.indexOf("//") == 0){
            command = command.substring(2);
            switch(command){
                case "save": 
                    BuildingEditor.save();
                    break;
            }
        }
    });
}







