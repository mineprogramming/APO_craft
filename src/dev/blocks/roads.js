const ROAD_CLEANING = 0;
const MAX_SIGNS_COUNT = 3;
const SIGNS_FREQUENCY = 0.2;

var data = [];
for(var i = 0; i < 11; i++){
    data.push({
        name: "Asphalt", 
        texture: [["asphalt", 0], ["asphalt", i], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0]], 
        inCreative: true
    });
}
IDRegistry.genBlockID("asphalt");
Block.createBlock("asphalt", data, "opaque");

RecipesManager.addShaped({id: BlockID.asphalt, count: 3, data: 0}, [
     "bbb",
     "aaa",
     "aaa"
], ['a', 13, 0, 'b', ItemID.bitumen, 0]);
