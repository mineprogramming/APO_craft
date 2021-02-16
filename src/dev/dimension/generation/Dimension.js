const SKY_COLOR = [0.2, 0.13, 0.2];
const FOG_COLOR = [0.2, 0.16, 0.2];

var apoCity = new Dimensions.CustomDimension("apoCity", 48);

apoCity.setSkyColor(SKY_COLOR[0], SKY_COLOR[1], SKY_COLOR[2]);
apoCity.setFogColor(FOG_COLOR[0], FOG_COLOR[1], FOG_COLOR[2]);

var dimensionGenerator = new Dimensions.newGenerator({
    biome: 2,
    layers: [
        {
            minY: 2, maxY: 79,
            material: {
                base: 1, 
                cover: {id: 1, data: 5}, 
                surface: {id: 3, width: 4}
            }, 
        },
        {
            minY: 1, maxY: 2,
            material: {base: 7},
        }
    ]
});
apoCity.setGenerator(dimensionGenerator);


Callback.addCallback("ItemUse", function(coords, item){
    if(item.id == 280){
        Split.summon(coords.x, coords.y + 2, coords.z);
    }
});


Callback.addCallback("tick", function(){
    if(Player.getDimension() == apoCity.id){
        RandomEvents.tick();
    }
});

Callback.addCallback("GenerateChunkUniversal", function(chunkX, chunkZ){
    if(Player.getDimension() == apoCity.id){
        APOGen.generate(chunkX * 16, chunkZ * 16);
    }
});


Callback.addCallback("DimensionLoaded", function(id){
    if(id == apoCity.id){
        inCity = true;
        RecipesManager.onRegisterRecipesNeeded();
        let position = Player.getPosition();
        position = GenerationUtils.findSurface(position.x, position.y, position.z);
        Player.setPosition(position.x, position.y + 2, position.z);
        NativeAPI.setRespawnCoords(position.x, position.y, position.z);
    }
});


var apoCityTransferSequence = new TransferSequence(apoCity.id);
apoCityTransferSequence.setPortalTimeout(40);


apoCityTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "aether_portal_overlay_animation"
}));

PortalRegistry.newPortalBlock("apoPortal", ["apo_portal", 0], apoCityTransferSequence.getPortal(), {type: "h-plane", frameId: 4}, true);
apoCityTransferSequence.setPortalTiles(BlockID.apoPortal);