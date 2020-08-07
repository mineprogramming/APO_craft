Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
    if(!inCity) return;
    
    // Gallium Arsenide Ore
    for(var i = 0; i < 31; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 60);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreGalliumArsenide, 0, 3);
    }
    
    // Shale Ore 
    for(var i = 0; i < 5; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 15);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreShaleOil, 0, 100);
    }
    
    // Titanium Ore
    for(var i = 0; i <  19; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 30);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTitanium, 0, 3);          
    }
    
    // Lead Ore
    for(var i = 0; i < 21; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 41);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreLead, 0, 3);          
    }
    
    // Aluminum Ore
    for(var i = 0; i < 23; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 44);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreAluminum, 0, 5);
    }
    
    // Sulfur Ore
    for(var i = 0; i < 22; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 39);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSulfur, 0, 5);          
    }
    
    // Fluorite Ore
    for(var i = 0; i < 20; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 60);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreFluorite, 0, 5);          
    } 
    
    // Copper Ore
    for(var i = 0; i < 28; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 54);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, 5);          
    } 
    
    // Tin Ore
    for(var i = 0; i < 29; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 55); 
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTin, 0, 5);          
    } 
    
    // Ruby Ore
    for(var i = 0; i < 12; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 15);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreRuby, 0, 3);          
    }
    
    // Magnesium Ore
    for(var i = 0; i < 20; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 55); 
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreMagnesium, 0, 5);           
    }
});