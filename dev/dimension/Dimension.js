var APOCity = new Dimension({
    name: "APOCity",
    
    generation: {
        layers: [
            {
                range: [2, 80],
                noise: {
                    octaves: {
                        count: 4,
                        weight: 0.5,
                        scale: [1, 0.6, 1]
                    }
                },
                
                gradient: [[-1, 1], [0.2, 0.5], [0.4, 0.3], [0.6, 0.7], [1, 0.25]],
               
                terrain: {
                    cover: {
                        height: 4,
                        top: {id: 1, data: 5},
                        block: 3
                    }
                }
            },
            {
                range: [1,2],
                noise:{
                    octaves:{
                        count:8,
                        weight: 0.4,
                        scale: [.01,.02,.04,.08]
                    }
                },
                gradient:[
                    [0,1],
                    [1,-1],
                    [0.05,.4],
                    [.2,-.8]
                ],
                terrain:{
                    base: 7
                }
            },
        ],
        
        decoration: {
            biome: 2,
            features: false
        }
    },
    
    environment: {
        sky: [0.3, 0.1, 0.1],
        fog: [0.44, 0.3, 0.3]
    },
    
    callbacks: {
        tick: function() {
            
        },
        
        generateChunk: function(chunkX, chunkZ) {
            generate(chunkX * 16, chunkZ * 16);
        }
    }
});

//APOCity.debugTerrainSlice(128, 1, true);


var APOCityTransferSequence = new TransferSequence(APOCity);
APOCityTransferSequence.setPortalTimeout(40);

APOCityTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "aether_portal_overlay_animation"
}));

APOCityTransferSequence.setLoadingScreenParams({
    texture: "default_dimension_loading_screen"
});

PortalRegistry.newPortalBlock("aetherPortal", ["aether_portal", 0], APOCityTransferSequence.getPortal(), {type: "u-plane", frameId: 4}, true);
APOCityTransferSequence.setPortalTiles(BlockID.aetherPortal);





var shape = new PortalShape();
shape.setPortalId(BlockID.aetherPortal);
shape.setFrameIds(4);
shape.setMinSize(2, 3);

APOCityTransferSequence.setPortalBuilder(shape.getBuilder());

//Callback.addCallback("ItemUse", function(coords, item) {
//    if (item.id == 280) {
//        var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
//        if (rect) {
//            shape.buildPortal(rect, false);
//        }
//    }
//});

//Callback.addCallback("DestroyBlock", function(pos, block){
//    if (block.id == 4 || block.id == BlockID.aetherPortal) {
//        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.aetherPortal, [4]);
//    }
//});