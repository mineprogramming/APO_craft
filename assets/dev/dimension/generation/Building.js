var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;
var StringBuilder = java.lang.StringBuilder;


function Building(filename){
    var path = __dir__ + "buildings/" + filename;
    
    var blocks;
    var loot;
    
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