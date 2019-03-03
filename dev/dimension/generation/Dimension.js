const SKY_COLOR = [0.2, 0.13, 0.2];
const FOG_COLOR = [0.2, 0.16, 0.2];

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
        sky: SKY_COLOR,
        fog: FOG_COLOR
    },
    
    callbacks: {
        tick: function() {
            RandomEvents.tick();
        },
        
        generateChunk: function(chunkX, chunkZ) {
            APOGen.generate(chunkX * 16, chunkZ * 16);
        },
        
        loaded: function(){
            inCity = true;
            RecipesManager.onRegisterRecipesNeeded();
            let position = Player.getPosition();
            NativeAPI.setRespawnCoords(position.x, position.y, position.z);
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

PortalRegistry.newPortalBlock("aetherPortal", ["apo_portal", 0], APOCityTransferSequence.getPortal(), {type: "h-plane", frameId: 4}, true);
APOCityTransferSequence.setPortalTiles(BlockID.aetherPortal);