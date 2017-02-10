// !!! REQUIRES SIGN TEXTURES !!!
 
var ID_POST = 254;
var ID_SIGN = 255;

Block.defineBlock (ID_POST, "Столб", ["stone", 0], 1, true, 0);
Block.defineBlock (ID_SIGN, "Знак", 
    [["stone", 0], ["stone", 0], ["sign", 0], ["sign", 0], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 1], ["sign", 1], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 2], ["sign", 2], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 3], ["sign", 3], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 4], ["sign", 4], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 5], ["sign", 5], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 6], ["sign", 6], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 7], ["sign", 7], ["stone", 0], ["stone", 0],
    ["stone", 0], ["stone", 0], ["sign", 8], ["sign", 8], ["stone", 0], ["stone", 0]], 
    1, true, 0);

Block.setShape (ID_POST, 0.45, 0, 0.45, 0.55, 1, 0.55);
Block.setShape (ID_SIGN, 0, 0, 0.45, 1, 1, 0.55);

function GenerateSign(x, y, z, height, meta){
    for(var i = 0; i < height; i++){
        setTile(x, y + i, z, ID_POST, 0);
    }
    setTile(x, y + height, z, ID_SIGN, meta);
}

function useItem(x,y,z,itemid,blockid,side,itemDamage,blockDamage) {
    if(itemid == 280){
        GenerateSign(x, y + 1, z, 2, Math.floor (Math.random() * 9));
    }
}