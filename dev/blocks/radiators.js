/* Radiators (Thanks to MaXFeeD) */

/* Regular radiators */

function renderRadiator(block, texture, data){
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(block, -1, render);
    var model = BlockRenderer.createModel();

    model.addBox(0/16, 0/16, 0/16, 16/16, 12/16, 16/16, texture, data);
    model.addBox(14/16, 12/16, 0/16, 16/16, 16/16, 16/16, texture, data);
    model.addBox(0/16, 12/16, 0/16, 2/16, 16/16, 16/16, texture, data);
    model.addBox(7/16, 12/16, 0/16, 9/16, 16/16, 16/16, texture, data);
    model.addBox(3.5/16, 12/16, 0/16, 5.5/16, 16/16, 16/16, texture, data);
    model.addBox(10.5/16, 12/16, 0/16, 12.5/16, 16/16, 16/16, texture, data);

    render.addEntry(model);
}


// Iron Radiator
IDRegistry.genBlockID("radiatorIron");
Block.createBlock("radiatorIron", [{
    name: "Iron Radiator",
    texture: [["iron_block", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorIron, "iron_block", 0);
Recipes.addFurnace(BlockID.radiatorIron, 42, 0);


// Gold Radiator
IDRegistry.genBlockID("radiatorGold");
Block.createBlock("radiatorGold", [{
    name: "Gold Radiator",
    texture: [["gold_block", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorGold, "gold_block", 0);
Recipes.addFurnace(BlockID.radiatorGold, 41, 0);


// Titanium Radiator
IDRegistry.genBlockID("radiatorTitanium");
Block.createBlock("radiatorTitanium", [{
    name: "Titanium Radiator",
    texture: [["block_titanium", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorTitanium, "block_titanium", 0);
Recipes.addFurnace(BlockID.radiatorTitanium, BlockID.blockTitanium, 0);


// Lead Radiator
IDRegistry.genBlockID("radiatorLead");
Block.createBlock("radiatorLead", [{
    name: "Lead Radiator",
    texture: [["block_lead", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorLead, "block_lead", 0);
Recipes.addFurnace(BlockID.radiatorLead, BlockID.blockLead, 0);


// Aluminium Radiator
IDRegistry.genBlockID("radiatorAluminium");
Block.createBlock("radiatorAluminium", [{
    name: "Aluminium Radiator",
    texture: [["block_aluminium", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorAluminium, "block_aluminium", 0);
Recipes.addFurnace(BlockID.radiatorAluminium, BlockID.blockAluminium, 0);


// Copper Radiator
IDRegistry.genBlockID("radiatorCopper");
Block.createBlock("radiatorCopper", [{
    name: "Copper Radiator",
    texture: [["block_copper", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorCopper, "block_copper", 0);
Recipes.addFurnace(BlockID.radiatorCopper, BlockID.blockCopper, 0);


// Tin Radiator
IDRegistry.genBlockID("radiatorTin");
Block.createBlock("radiatorTin", [{
    name: "Tin Radiator",
    texture: [["block_tin", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorTin, "block_tin", 0);
Recipes.addFurnace(BlockID.radiatorTin, BlockID.blockTin, 0);


/* Big radiator */

IDRegistry.genBlockID("bigRadiator");
Block.createBlock("bigRadiator", [{
    name: "Big Radiator",
    texture: [["block_copper", 0]],
    inCreative: true
}]);
Block.setShape(BlockID.bigRadiator, -1, 0, -1, 1, 1, 1);
Block.registerDropFunction("bigRadiator",function(coords, blockID, blockData, level, enchant){
    return [[0,0,0]];
});

// Run in the separate function to avoid name collisions
(function(texture){
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(BlockID.bigRadiator, -1, render);
    var model = BlockRenderer.createModel();

    model.addBox(0/16, 0/16, 0/16, 16/16, 16/16, 16/16, texture, 0);
    model.addBox(16/16, 0/16, 0/16, 32/16, 2/16, 16/16, texture, 0);
    model.addBox(-16/16, 0/16, 0/16, 0/16, 2/16, 16/16, texture, 0);
    model.addBox(0/16, 0/16, 16/16, 16/16, 2/16, 32/16, texture, 0);
    model.addBox(0/16, 0/16, -16/16, 16/16, 2/16, 0/16, texture, 0);
    model.addBox(16/16, 0/16, 16/16, 24/16, 2/16, 24/16, texture, 0);
    model.addBox(-8/16, 0/16, 16/16, 0/16, 2/16, 24/16, texture, 0);
    model.addBox(16/16, 0/16, -8/16, 24/16, 2/16, 0/16, texture, 0);
    model.addBox(-8/16, 0/16, -8/16, 0/16, 2/16, 0/16, texture, 0);
    model.addBox(24/16, 0/16, 16/16, 28/16, 2/16, 21/16, texture, 0);
    model.addBox(16/16, 0/16, 24/16, 21/16, 2/16, 28/16, texture, 0);
    model.addBox(16/16, 0/16, -12/16, 21/16, 2/16, -8/16, texture, 0);
    model.addBox(24/16, 0/16, -5/16, 28/16, 2/16, 0/16, texture, 0);
    model.addBox(-12/16, 0/16, -5/16, -8/16, 2/16, 0/16, texture, 0);
    model.addBox(-5/16, 0/16, -12/16, 0/16, 2/16, -8/16, texture, 0);
    model.addBox(-5/16, 0/16, 24/16, 0/16, 2/16, 28/16, texture, 0);
    model.addBox(-12/16, 0/16, 16/16, -8/16, 2/16, 21/16, texture, 0);
    model.addBox(13/16, 2/16, -16/16, 15/16, 16/16, 0/16, texture, 0);
    model.addBox(-16/16, 2/16, 10/16, 0/16, 16/16, 12/16, texture, 0);
    model.addBox(-16/16, 2/16, 7/16, 0/16, 16/16, 9/16, texture, 0);
    model.addBox(-16/16, 2/16, 4/16, 0/16, 16/16, 6/16, texture, 0);
    model.addBox(-16/16, 2/16, 1/16, 0/16, 16/16, 3/16, texture, 0);
    model.addBox(16/16, 2/16, 13/16, 32/16, 16/16, 15/16, texture, 0);
    model.addBox(16/16, 2/16, 10/16, 32/16, 16/16, 12/16, texture, 0);
    model.addBox(16/16, 2/16, 7/16, 32/16, 16/16, 9/16, texture, 0);
    model.addBox(16/16, 2/16, 4/16, 32/16, 16/16, 6/16, texture, 0);
    model.addBox(16/16, 2/16, 1/16, 32/16, 16/16, 3/16, texture, 0);
    model.addBox(10/16, 2/16, -16/16, 12/16, 16/16, 0/16, texture, 0);
    model.addBox(7/16, 2/16, -16/16, 9/16, 16/16, 0/16, texture, 0);
    model.addBox(4/16, 2/16, -16/16, 6/16, 16/16, 0/16, texture, 0);
    model.addBox(1/16, 2/16, -16/16, 3/16, 16/16, 0/16, texture, 0);
    model.addBox(-16/16, 2/16, 13/16, 0/16, 16/16, 15/16, texture, 0);
    model.addBox(13/16, 2/16, 16/16, 15/16, 16/16, 32/16, texture, 0);
    model.addBox(10/16, 2/16, 16/16, 12/16, 16/16, 32/16, texture, 0);
    model.addBox(7/16, 2/16, 16/16, 9/16, 16/16, 32/16, texture, 0);
    model.addBox(4/16, 2/16, 16/16, 6/16, 16/16, 32/16, texture, 0);
    model.addBox(1/16, 2/16, 16/16, 3/16, 16/16, 32/16, texture, 0);
    model.addBox(-2/16, 2/16, 16/16, 0/16, 16/16, 28/16, texture, 0);
    model.addBox(-2/16, 2/16, -12/16, 0/16, 16/16, 0/16, texture, 0);
    model.addBox(16/16, 2/16, -12/16, 18/16, 16/16, 0/16, texture, 0);
    model.addBox(16/16, 2/16, 16/16, 18/16, 16/16, 28/16, texture, 0);
    model.addBox(18/16, 2/16, 16/16, 28/16, 16/16, 18/16, texture, 0);
    model.addBox(18/16, 2/16, -2/16, 28/16, 16/16, 0/16, texture, 0);
    model.addBox(-12/16, 2/16, -2/16, -2/16, 16/16, 0/16, texture, 0);
    model.addBox(-12/16, 2/16, 16/16, -2/16, 16/16, 18/16, texture, 0);
    model.addBox(-12/16, 2/16, 19/16, -3/16, 16/16, 21/16, texture, 0);
    model.addBox(19/16, 2/16, 19/16, 28/16, 16/16, 21/16, texture, 0);
    model.addBox(19/16, 2/16, -5/16, 28/16, 16/16, -3/16, texture, 0);
    model.addBox(-12/16, 2/16, -5/16, -3/16, 16/16, -3/16, texture, 0);
    model.addBox(-5/16, 2/16, -12/16, -3/16, 16/16, -5/16, texture, 0);
    model.addBox(19/16, 2/16, -12/16, 21/16, 16/16, -5/16, texture, 0);
    model.addBox(19/16, 2/16, 21/16, 21/16, 16/16, 28/16, texture, 0);
    model.addBox(-5/16, 2/16, 21/16, -3/16, 16/16, 28/16, texture, 0);
    model.addBox(-8/16, 2/16, 22/16, -6/16, 16/16, 24/16, texture, 0);
    model.addBox(22/16, 2/16, 22/16, 24/16, 16/16, 24/16, texture, 0);
    model.addBox(22/16, 2/16, -8/16, 24/16, 16/16, -6/16, texture, 0);
    model.addBox(-8/16, 2/16, -8/16, -6/16, 16/16, -6/16, texture, 0);

    render.addEntry(model);
})("block_copper");


RadiatorAPI = {
    worldRadiators:{},
    radiatorsIDs:{},
    coordsToString:function(x,y,z){
        return x+':'+y+':'+z;
    },
    deleteRadiatorInWorld:function(x,y,z){
        //Debug.m("Deleting");
        var stringCoords = this.coordsToString(x,y,z);
        for(var i in this.worldRadiators){
            var rad = this.worldRadiators[i];
            if(rad==stringCoords){
                //Debug.m("deleted "+rad);
                this.worldRadiators[i] = null;
            }
        }
    },
    getRadiatorDrop:function(x,y,z){
        var stringCoords = this.coordsToString(x,y,z);
        return this.worldRadiators[stringCoords];
    },
    stringToCoords:function(stringCoords){
        var arr = stringCoords.split(":");
        return {x:arr[0], y:arr[1], z:arr[2]}
    },
    addRadiatorID:function(id){
        this.radiatorsIDs[id] = true
    },
    isRadiator:function(id){
        return this.radiatorsIDs[id];
    },
    checkStructure2:function(coords){
        for(var currX = -2; currX<=2; currX++){
            for(var currZ = -2; currZ<=2; currZ++){
               var block = World.getBlockID(coords.x+currX,coords.y,coords.z+currZ);
               //Logger.Log("checking structure currX "+currX+' addZ '+currZ + ' '+block);
               if(this.isRadiator(block)){
                   var x = coords.x+currX;
                   var y = coords.y;
                   var z = coords.z+currZ;
                   var crds = {
                        x:coords.x+currX,
                        y:coords.y,
                        z:coords.z+currZ
                   };
                    this.checkCircle(crds);
               }
            }
        }
    },
   checkCircle:function(coords){
       var count = 0;
       var center = {};
        for(var addX = 0; addX<3; addX++){
            for(var addZ = 0; addZ<3; addZ++){
                var block = World.getBlockID(coords.x+addX, coords.y, coords.z+addZ);
                //Logger.Log("checking circle addX "+addX+' addZ'+addZ+ ' '+block);
                if(this.isRadiator(block)){
                    count++;
                }
                if(addX==1&&addZ==1){
                    center = {
                        x:coords.x+addX,
                        y:coords.y,
                        z:coords.z+addZ
                    };
                }
            }
        }
        if(count>8){
            this.remakeStructure(center);
        }
   },
   remakeStructure:function(center){
       var blocks = [];
       
       Game.prevent(); 
       blocks.push(World.getBlockID(center.x+1,center.y,center.z));
       World.setBlock(center.x+1,center.y,center.z, 0, 0);
       
       blocks.push(World.getBlockID(center.x + 1,center.y, center.z + 1));       
       World.setBlock(center.x + 1, center.y, center.z + 1, 0, 0);
       
       blocks.push(World.getBlockID(center.x+1,center.y,center.z-1));       
       World.setBlock(center.x+1,center.y,center.z-1,0,0);
       
       blocks.push(World.getBlockID(center.x-1,center.y,center.z+1));              
       World.setBlock(center.x-1,center.y,center.z+1,0,0);
       
       blocks.push(World.getBlockID(center.x-1,center.y,center.z-1));              
       World.setBlock(center.x-1,center.y,center.z-1,0,0);
       
       blocks.push(World.getBlockID(center.x-1,center.y,center.z));              
       World.setBlock(center.x-1,center.y,center.z,0,0);
       
       blocks.push(World.getBlockID(center.x,center.y,center.z+1));              
       World.setBlock(center.x,center.y,center.z+1,0,0);
       
       blocks.push(World.getBlockID(center.x,center.y,center.z-1));              
       World.setBlock(center.x,center.y,center.z-1,0,0);
       
       blocks.push(World.getBlockID(center.x,center.y,center.z));              
       World.setBlock(center.x,center.y,center.z, BlockID.bigRadiator,0);

       this.worldRadiators[this.coordsToString(center.x,center.y,center.z)] = blocks;
   }
};
RadiatorAPI.addRadiatorID(BlockID.radiatorIron);
RadiatorAPI.addRadiatorID(BlockID.radiatorGold);
RadiatorAPI.addRadiatorID(BlockID.radiatorTitanium);
RadiatorAPI.addRadiatorID(BlockID.radiatorLead);
RadiatorAPI.addRadiatorID(BlockID.radiatorAluminium);
RadiatorAPI.addRadiatorID(BlockID.radiatorCopper);
RadiatorAPI.addRadiatorID(BlockID.radiatorTin);

for(var regID = BlockID.radiatorIron; regID<=BlockID.radiatorTin;regID++){
    Block.registerPlaceFunctionForID(regID,function(coords,item,block){
        World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z,item.id, item.data);
        RadiatorAPI.checkStructure2(coords.relative);
    });
}
Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id==BlockID.bigRadiator){
        var drop = RadiatorAPI.getRadiatorDrop(coords.x,coords.y,coords.z);
        RadiatorAPI.deleteRadiatorInWorld(coords.x,coords.y,coords.z);
        
        for(var id in drop){
            World.drop(coords.x,coords.y,coords.z,drop[id],1,0);
        }
    }
});
Saver.addSavesScope("RadiatorsPosition",
    function read(scope) {
        for(var i in scope){
            RadiatorAPI.worldRadiators[i] = scope[i];
        }
    },
    
    function save() {
        var sObj = [];
        for(var i in RadiatorAPI.worldRadiators){
            sObj[i] = RadiatorAPI.worldRadiators[i];
        }
        return sObj
    }
);


