const RadiatorsManager = {
    inWorld: {},
    ids: {},
    addId: function (id) {
        if (id <= 0 || (id > 256 && id < CUSTOM_BLOCK_IDS_OFFSET))
            throw "Invalid radiator id (" + id + ")";

        this.ids[id] = true;
    },

    breakBigRadiator: function (x, y, z) {
        let key = x + ":" + y + ":" + z;
        let blocks = this.inWorld[key];
        if (blocks) {
            let index = 0;

            for (let xx = -1; xx < 2; xx++) {
                for (let zz = -1; zz < 2; zz++) {
                    if (xx == 0 && zz == 0) { //drop block in center
                        World.drop(x, y, z, blocks[index], 1, 0);
                    } else World.setBlock(x + xx, y, z + zz, blocks[index]);
                    index++;
                }
            }

            this.inWorld[key] = null;
        } else Logger.Log("'RadiatorsManager.breakBigRadiator' was called with incorrect coords", "WARNING");
    },

    validateBigRadiatorStructure: function (x, y, z) {
        for (let xx = -1; xx < 2; xx++) {
            for (let zz = -1; zz < 2; zz++) {
                let blockId = World.getBlockID(x + xx, y, z + zz);
                if (this.isRadiator(blockId) && this.validateCircle(x + xx, y, z + zz))
                    return;
            }
        }
    },

    validateCircle: function (x, y, z) {
        let blocks = [];
        //Check structure
        for (let xx = -1; xx < 2; xx++) {
            for (let zz = -1; zz < 2; zz++) {
                let blockId = World.getBlockID(x + xx, y, z + zz);
                if (!this.isRadiator(blockId))
                    return false; //invalid structure
                else blocks.push(blockId);
            }
        }

        //Remove blocks
        for (let xx = -1; xx < 2; xx++) {
            for (let zz = -1; zz < 2; zz++) {
                World.setBlock(x + xx, y, z + zz, 0)
            }
        }

        World.setBlock(x, y, z, BlockID.bigRadiator);

        this.inWorld[x + ":" + y + ":" + z] = blocks;
        return true;
    },

    bakeRadiatorRender: function (block, textureName, textureData) {
        var render = new ICRender.Model();
        BlockRenderer.setStaticICRender(block, -1, render);
        var model = BlockRenderer.createModel();

        model.addBox(0 / 16, 0 / 16, 0 / 16, 16 / 16, 12 / 16, 16 / 16, textureName, textureData);
        model.addBox(14 / 16, 12 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, textureName, textureData);
        model.addBox(0 / 16, 12 / 16, 0 / 16, 2 / 16, 16 / 16, 16 / 16, textureName, textureData);
        model.addBox(7 / 16, 12 / 16, 0 / 16, 9 / 16, 16 / 16, 16 / 16, textureName, textureData);
        model.addBox(3.5 / 16, 12 / 16, 0 / 16, 5.5 / 16, 16 / 16, 16 / 16, textureName, textureData);
        model.addBox(10.5 / 16, 12 / 16, 0 / 16, 12.5 / 16, 16 / 16, 16 / 16, textureName, textureData);

        render.addEntry(model);
    },

    isRadiator: function (id) {
        return this.ids[id];
    }
};

// Iron Radiator
IDRegistry.genBlockID("radiatorIron");
Block.createBlock("radiatorIron", [{
    name: "Iron Radiator",
    texture: [["iron_block", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorIron, "iron_block", 0);
Recipes.addFurnace(BlockID.radiatorIron, 42, 0);


// Gold Radiator
IDRegistry.genBlockID("radiatorGold");
Block.createBlock("radiatorGold", [{
    name: "Gold Radiator",
    texture: [["gold_block", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorGold, "gold_block", 0);
Recipes.addFurnace(BlockID.radiatorGold, 41, 0);


// Titanium Radiator
IDRegistry.genBlockID("radiatorTitanium");
Block.createBlock("radiatorTitanium", [{
    name: "Titanium Radiator",
    texture: [["block_titanium", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorTitanium, "block_titanium", 0);
Recipes.addFurnace(BlockID.radiatorTitanium, BlockID.blockTitanium, 0);


// Lead Radiator
IDRegistry.genBlockID("radiatorLead");
Block.createBlock("radiatorLead", [{
    name: "Lead Radiator",
    texture: [["block_lead", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorLead, "block_lead", 0);
Recipes.addFurnace(BlockID.radiatorLead, BlockID.blockLead, 0);


// Aluminum Radiator
IDRegistry.genBlockID("radiatorAluminum");
Block.createBlock("radiatorAluminum", [{
    name: "Aluminum Radiator",
    texture: [["block_aluminum", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorAluminum, "block_aluminum", 0);
Recipes.addFurnace(BlockID.radiatorAluminum, BlockID.blockAluminum, 0);


// Copper Radiator
IDRegistry.genBlockID("radiatorCopper");
Block.createBlock("radiatorCopper", [{
    name: "Copper Radiator",
    texture: [["block_copper", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorCopper, "block_copper", 0);
Recipes.addFurnace(BlockID.radiatorCopper, BlockID.blockCopper, 0);


// Tin Radiator
IDRegistry.genBlockID("radiatorTin");
Block.createBlock("radiatorTin", [{
    name: "Tin Radiator",
    texture: [["block_tin", 0]],
    inCreative: true
}]);
RadiatorsManager.bakeRadiatorRender(BlockID.radiatorTin, "block_tin", 0);
Recipes.addFurnace(BlockID.radiatorTin, BlockID.blockTin, 0);


/* Big radiator */

IDRegistry.genBlockID("bigRadiator");
Block.createBlock("bigRadiator", [{
    name: "Big Radiator",
    texture: [["hopper_side", 0]]
}]);
Block.setShape(BlockID.bigRadiator, -1, 0, -1, 1, 1, 1);
Block.registerDropFunction("bigRadiator", function () {
    return [];
});

// Run in the separate function to avoid name collisions
(function (texture) {
    let render = new ICRender.Model();
    BlockRenderer.setStaticICRender(BlockID.bigRadiator, -1, render);
    let model = BlockRenderer.createModel();

    model.addBox(0 / 16, 0 / 16, 0 / 16, 16 / 16, 16 / 16, 16 / 16, texture, 0);
    model.addBox(16 / 16, 0 / 16, 0 / 16, 32 / 16, 2 / 16, 16 / 16, texture, 0);
    model.addBox(-16 / 16, 0 / 16, 0 / 16, 0 / 16, 2 / 16, 16 / 16, texture, 0);
    model.addBox(0 / 16, 0 / 16, 16 / 16, 16 / 16, 2 / 16, 32 / 16, texture, 0);
    model.addBox(0 / 16, 0 / 16, -16 / 16, 16 / 16, 2 / 16, 0 / 16, texture, 0);
    model.addBox(16 / 16, 0 / 16, 16 / 16, 24 / 16, 2 / 16, 24 / 16, texture, 0);
    model.addBox(-8 / 16, 0 / 16, 16 / 16, 0 / 16, 2 / 16, 24 / 16, texture, 0);
    model.addBox(16 / 16, 0 / 16, -8 / 16, 24 / 16, 2 / 16, 0 / 16, texture, 0);
    model.addBox(-8 / 16, 0 / 16, -8 / 16, 0 / 16, 2 / 16, 0 / 16, texture, 0);
    model.addBox(24 / 16, 0 / 16, 16 / 16, 28 / 16, 2 / 16, 21 / 16, texture, 0);
    model.addBox(16 / 16, 0 / 16, 24 / 16, 21 / 16, 2 / 16, 28 / 16, texture, 0);
    model.addBox(16 / 16, 0 / 16, -12 / 16, 21 / 16, 2 / 16, -8 / 16, texture, 0);
    model.addBox(24 / 16, 0 / 16, -5 / 16, 28 / 16, 2 / 16, 0 / 16, texture, 0);
    model.addBox(-12 / 16, 0 / 16, -5 / 16, -8 / 16, 2 / 16, 0 / 16, texture, 0);
    model.addBox(-5 / 16, 0 / 16, -12 / 16, 0 / 16, 2 / 16, -8 / 16, texture, 0);
    model.addBox(-5 / 16, 0 / 16, 24 / 16, 0 / 16, 2 / 16, 28 / 16, texture, 0);
    model.addBox(-12 / 16, 0 / 16, 16 / 16, -8 / 16, 2 / 16, 21 / 16, texture, 0);
    model.addBox(13 / 16, 2 / 16, -16 / 16, 15 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(-16 / 16, 2 / 16, 10 / 16, 0 / 16, 16 / 16, 12 / 16, texture, 0);
    model.addBox(-16 / 16, 2 / 16, 7 / 16, 0 / 16, 16 / 16, 9 / 16, texture, 0);
    model.addBox(-16 / 16, 2 / 16, 4 / 16, 0 / 16, 16 / 16, 6 / 16, texture, 0);
    model.addBox(-16 / 16, 2 / 16, 1 / 16, 0 / 16, 16 / 16, 3 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, 13 / 16, 32 / 16, 16 / 16, 15 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, 10 / 16, 32 / 16, 16 / 16, 12 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, 7 / 16, 32 / 16, 16 / 16, 9 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, 4 / 16, 32 / 16, 16 / 16, 6 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, 1 / 16, 32 / 16, 16 / 16, 3 / 16, texture, 0);
    model.addBox(10 / 16, 2 / 16, -16 / 16, 12 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(7 / 16, 2 / 16, -16 / 16, 9 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(4 / 16, 2 / 16, -16 / 16, 6 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(1 / 16, 2 / 16, -16 / 16, 3 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(-16 / 16, 2 / 16, 13 / 16, 0 / 16, 16 / 16, 15 / 16, texture, 0);
    model.addBox(13 / 16, 2 / 16, 16 / 16, 15 / 16, 16 / 16, 32 / 16, texture, 0);
    model.addBox(10 / 16, 2 / 16, 16 / 16, 12 / 16, 16 / 16, 32 / 16, texture, 0);
    model.addBox(7 / 16, 2 / 16, 16 / 16, 9 / 16, 16 / 16, 32 / 16, texture, 0);
    model.addBox(4 / 16, 2 / 16, 16 / 16, 6 / 16, 16 / 16, 32 / 16, texture, 0);
    model.addBox(1 / 16, 2 / 16, 16 / 16, 3 / 16, 16 / 16, 32 / 16, texture, 0);
    model.addBox(-2 / 16, 2 / 16, 16 / 16, 0 / 16, 16 / 16, 28 / 16, texture, 0);
    model.addBox(-2 / 16, 2 / 16, -12 / 16, 0 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, -12 / 16, 18 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(16 / 16, 2 / 16, 16 / 16, 18 / 16, 16 / 16, 28 / 16, texture, 0);
    model.addBox(18 / 16, 2 / 16, 16 / 16, 28 / 16, 16 / 16, 18 / 16, texture, 0);
    model.addBox(18 / 16, 2 / 16, -2 / 16, 28 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(-12 / 16, 2 / 16, -2 / 16, -2 / 16, 16 / 16, 0 / 16, texture, 0);
    model.addBox(-12 / 16, 2 / 16, 16 / 16, -2 / 16, 16 / 16, 18 / 16, texture, 0);
    model.addBox(-12 / 16, 2 / 16, 19 / 16, -3 / 16, 16 / 16, 21 / 16, texture, 0);
    model.addBox(19 / 16, 2 / 16, 19 / 16, 28 / 16, 16 / 16, 21 / 16, texture, 0);
    model.addBox(19 / 16, 2 / 16, -5 / 16, 28 / 16, 16 / 16, -3 / 16, texture, 0);
    model.addBox(-12 / 16, 2 / 16, -5 / 16, -3 / 16, 16 / 16, -3 / 16, texture, 0);
    model.addBox(-5 / 16, 2 / 16, -12 / 16, -3 / 16, 16 / 16, -5 / 16, texture, 0);
    model.addBox(19 / 16, 2 / 16, -12 / 16, 21 / 16, 16 / 16, -5 / 16, texture, 0);
    model.addBox(19 / 16, 2 / 16, 21 / 16, 21 / 16, 16 / 16, 28 / 16, texture, 0);
    model.addBox(-5 / 16, 2 / 16, 21 / 16, -3 / 16, 16 / 16, 28 / 16, texture, 0);
    model.addBox(-8 / 16, 2 / 16, 22 / 16, -6 / 16, 16 / 16, 24 / 16, texture, 0);
    model.addBox(22 / 16, 2 / 16, 22 / 16, 24 / 16, 16 / 16, 24 / 16, texture, 0);
    model.addBox(22 / 16, 2 / 16, -8 / 16, 24 / 16, 16 / 16, -6 / 16, texture, 0);
    model.addBox(-8 / 16, 2 / 16, -8 / 16, -6 / 16, 16 / 16, -6 / 16, texture, 0);

    render.addEntry(model);
})("block_aluminum");

RadiatorsManager.addId(BlockID.radiatorIron);
RadiatorsManager.addId(BlockID.radiatorGold);
RadiatorsManager.addId(BlockID.radiatorTitanium);
RadiatorsManager.addId(BlockID.radiatorLead);
RadiatorsManager.addId(BlockID.radiatorAluminum);
RadiatorsManager.addId(BlockID.radiatorCopper);
RadiatorsManager.addId(BlockID.radiatorTin);

for (let regID = BlockID.radiatorIron; regID <= BlockID.radiatorTin; regID++) {
    Block.registerPlaceFunctionForID(regID, function (coords, item) {
        let relative = coords.relative;
        World.setBlock(relative.x, relative.y, relative.z, item.id, item.data);
        RadiatorsManager.validateBigRadiatorStructure(relative.x, relative.y, relative.z);
    });
}
Callback.addCallback("DestroyBlock", function (coords, block) {
    if (block.id == BlockID.bigRadiator)
        RadiatorsManager.breakBigRadiator(coords.x, coords.y, coords.z);
});
Saver.addSavesScope("RadiatorsPosition",
    function read(scope) {
        for (let i in scope)
            RadiatorsManager.inWorld[i] = scope[i];
    },

    function save() {
        let inWorld = [];
        for (let i in RadiatorsManager.inWorld) {
            let radiator = RadiatorsManager.inWorld[i];
            if (radiator) //don't save deleted radiators (with null value)
                inWorld[i] = radiator;
        }
        return inWorld
    }
);