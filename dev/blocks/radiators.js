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


// Gold Radiator
IDRegistry.genBlockID("radiatorGold");
Block.createBlock("radiatorGold", [{
    name: "Gold Radiator",
    texture: [["gold_block", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorGold, "gold_block", 0);


// Titanium Radiator
IDRegistry.genBlockID("radiatorTitanium");
Block.createBlock("radiatorTitanium", [{
    name: "Titanium Radiator",
    texture: [["block_titanium", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorTitanium, "block_titanium", 0);


// Lead Radiator
IDRegistry.genBlockID("radiatorLead");
Block.createBlock("radiatorLead", [{
    name: "Lead Radiator",
    texture: [["block_lead", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorLead, "block_lead", 0);


// Alluminium Radiator
IDRegistry.genBlockID("radiatorAlluminium");
Block.createBlock("radiatorAlluminium", [{
    name: "Alluminium Radiator",
    texture: [["block_aluminium", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorAlluminium, "block_aluminium", 0);


// Copper Radiator
IDRegistry.genBlockID("radiatorCopper");
Block.createBlock("radiatorCopper", [{
    name: "Copper Radiator",
    texture: [["block_copper", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorCopper, "block_copper", 0);


// Tin Radiator
IDRegistry.genBlockID("radiatorTin");
Block.createBlock("radiatorTin", [{
    name: "Tin Radiator",
    texture: [["block_tin", 0]],
    inCreative: true
}]);
renderRadiator(BlockID.radiatorTin, "block_tin", 0);


/* Big radiator */

IDRegistry.genBlockID("bigRadiator");
Block.createBlock("bigRadiator", [{
    name: "Big Radiator",
    texture: [["block_copper", 0]],
    inCreative: true
}]);
Block.setShape(BlockID.bigRadiator, -1, 0, -1, 1, 1, 1);

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








