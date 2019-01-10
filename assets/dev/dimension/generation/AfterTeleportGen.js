Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
    if(!inCity) return;
    
    //Gallium Arsenide Ore
    for(var i = 0; i < 20; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 60);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreGalliumArsenide, 0, 3);
    }
    
    //Shale Ore 
    for(var i = 0; i < 5; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 5, 15);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreShaleOil, 0, 100);
    }
});