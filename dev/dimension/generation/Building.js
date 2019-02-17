var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;
var StringBuilder = java.lang.StringBuilder;

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
    var path = __dir__ + "buildings/" + filename;
    
    var blocks;
    var loot = [];
    
    var parseBlocks = function(array){
        for(var i = 0; i < array.length; i++){
            for(var j = 0; j < array[0].length; j++){
                for(var k = 0; k < array[0][0].length; k++){
                    array[i][j][k] = eval(array[i][j][k]);
                }
            }
        }
        return array;
    }
    
    var parseLoot = function(array){
        for(var i in array){
            array[i].id = eval(array[i].id);
        }
        return array;
    }
    
    var json = JSON.parse(readFile(path));
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
    
    this.debug = false;
    
    this.build = function(x1, y1, z1){
        //Choose random block for generation
        var randoms = [];
        for(var key in json.randomizer){
            var randomizer = json.randomizer[key];
            var arr = randomizer.variations;
            randoms.push({
                "block": randomizer.block, 
                "variation": arr[Math.round(Math.random()*(arr.length-1))]
            });
        }
        
        //Signs with numbers
        if(this.debug){
            //World.setBlock(x - 1, y + 1, z - 1, 68, 0);
            //Game.message(JSON.stringify(World.getContainer(x - 1, y + 1, z - 1)))
        }
                    
        //generation itself
        for(var y = 0; y < blocks.length; y++){
            for(var x = 0; x < blocks[0].length; x++){
                for(var z = 0; z < blocks[0][0].length; z++){
                    var block = blocks[y][x][z];
                    if(block == 0 || block.id == 0)
                        continue;
                    block.meta = block.meta || 0;
                    for(var key in randoms){
                        var random = randoms[key];
                        if(random.block.id == block.id && random.block.meta == block.meta){
                            block = random.variation;
                        }
                    }
                    World.setBlock(x + x1, y + y1, z + z1, block.id, block.meta);
                    if(block.id == 54 && loot){
                        var container = World.getContainer(x + x1, y + y1, z + z1);
                        if(container != null){
                            for(var key in loot){
                                let item = loot[key];
                                if(Math.random() < item.rarity){
                                    var count = Math.floor(Math.random() * (item.count.max - item.count.min + 1) + item.count.min);
                                    container.setSlot(Math.floor(Math.random() * 27), item.id, count, item.meta);
                                }
                            }
                        }
                    }
                }
            }
        }
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