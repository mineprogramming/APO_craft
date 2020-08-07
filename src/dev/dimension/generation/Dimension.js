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
        Dimensions.transfer(Player.get(), Player.getDimension() == 0 ? apoCity.id: 0);
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
        Debug.m(position);
        NativeAPI.setRespawnCoords(position.x, position.y, position.z);
    }
});



// var apoCity = new Dimension({
//     name: "apoCity",
    
//     generation: {
//         layers: [
//             {
//                 range: [2, 80],
//                 noise: {
//                     octaves: {
//                         count: 4,
//                         weight: 0.5,
//                         scale: [1, 0.6, 1]
//                     }
//                 },
                
//                 gradient: [[-1, 1], [0.2, 0.5], [0.4, 0.3], [0.6, 0.7], [1, 0.25]],
               
//                 terrain: {
//                     cover: {
//                         height: 4,
//                         top: {id: 1, data: 5},
//                         block: 3
//                     }
//                 }
//             },
//             {
//                 range: [1,2],
//                 noise:{
//                     octaves:{
//                         count:8,
//                         weight: 0.4,
//                         scale: [.01,.02,.04,.08]
//                     }
//                 },
//                 gradient:[
//                     [0,1],
//                     [1,-1],
//                     [0.05,.4],
//                     [.2,-.8]
//                 ],
//                 terrain:{
//                     base: 7
//                 }
//             },
//         ],
        
//         decoration: {
//             biome: 2,
//             features: false
//         }
//     },
    
//     environment: {
//         sky: SKY_COLOR,
//         fog: FOG_COLOR
//     },
    
//     callbacks: {
//         tick: function() {
//             RandomEvents.tick();
//         },
        
//         generateChunk: function(chunkX, chunkZ) {
//             APOGen.generate(chunkX * 16, chunkZ * 16);
//         },
        
//         loaded: function(){
//             inCity = true;
//             RecipesManager.onRegisterRecipesNeeded();
//             let position = Player.getPosition();
//             NativeAPI.setRespawnCoords(position.x, position.y, position.z);
//         }
//     }
// });

// //apoCity.debugTerrainSlice(128, 1, true);

// var apoCityTransferSequence = new TransferSequence(apoCity);
// apoCityTransferSequence.setPortalTimeout(40);

// apoCityTransferSequence.setPortalOverlay(new PortalOverlayWindow({
//     frames: 32, 
//     rate: 20, 
//     fade: 1, 
//     texture: "aether_portal_overlay_animation"
// }));

// apoCityTransferSequence.setLoadingScreenParams({
//     texture: "default_dimension_loading_screen"
// });

// PortalRegistry.newPortalBlock("apoPortal", ["apo_portal", 0], apoCityTransferSequence.getPortal(), {type: "h-plane", frameId: 4}, true);
// apoCityTransferSequence.setPortalTiles(BlockID.apoPortal);