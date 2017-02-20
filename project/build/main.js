
var Util = {}

Util.getWorldSeed = function(){
    var worldsPath = "/storage/sdcard0/games/com.mojang/minecraftWorlds/";
    var leveldat = worldsPath+Level.getWorldDir()+"/level.dat";
    if(!java.io.File(leveldat).exists()){
        return 0;
    }
    var fin = new java.io.FileInputStream(leveldat);
    var nechs = [];
    var startSeed = 0;
    var seed = "";
    var str = "";
    var ch;
    while((ch=fin.read())!=-1){
        nechs.push(ch);
        str+=String.fromCharCode(ch);
    }
    startSeed = str.split("RandomSeed")[0].length+10;
    for(var i=3;i>=0;i--){
        if(nechs[startSeed+i]<16){
            seed+="0"+nechs[startSeed+i].toString(16)+"";
        }else{
            seed+=nechs[startSeed+i].toString(16)+"";
        }
    }
    var endSeed = parseInt(seed, 16);
    if(endSeed>(Math.pow(16,8)/2-1)){
        return endSeed-Math.pow(16,8);
    }
    return endSeed;
};

Util.convertStreamToString = function(is) { 
    var bis = new java.io.BufferedInputStream(is); 
    var buf = new java.io.ByteArrayOutputStream(); 
    var res = bis.read(); 
    while(res != -1) { 
        buf.write(res); 
        res = bis.read(); 
    } 
    return buf.toString(); 
}
var Randomizer = {
    Random: (new java.util.Random(Util.getWorldSeed()))
};

Randomizer.GaussRandom = function(max, depth){
    if (typeof depth === 'undefined') {
        depth = 1;
    }
    var result = 0;
    for(var i = 0; i < depth; i++){
        result += this.Random.nextInt(max * 2) - max;
    }
    return Math.round(Math.abs(result / depth));
};
var Timers = {};

Timers.modTick = function(){
    
}

Timers.addOnce = function(){
    print("addOnce");
}

Timers.addRepetiteve = function(){
    print("addRepetiteve");
}
ItemsEngine = {};

ItemsEngine.SetItemFromJson = function(name){
    var str    = ModPE.openInputStreamFromTexturePack("items//" + name);
    var string = Util.convertStreamToString(str);
    var json   = JSON.parse(string);
    if (json.type == "item"){
        ModPE.setItem(json.id, json.texture.name, json.texture.meta, json.name, json.maxStack);
    }
    else if (json.type == "block")
    {
        Block.defineBlock(json.id, json.name, [[json.texture.name, json.texture.meta]], json.material, json.opaque, json.renderType);
        Block.setDestroyTime(json.id, json.destroyTime);
        Block.setExplosionResistance(json.id, json.explosionResistance);
    }
    else if (json.type == "food")
        ModPE.setFoodItem(json.id, json.texture.name, json.texture.meta, json.restore, json.name, json.maxStack);
    else if (json.type == "armor")
        Item.defineArmor(json.id, json.texture.name, json.texture.meta, json.name, json.armorTexture, json.reduceDamage, json.maxDamage, json.armorType);
    else if (json.type == "throwable")
        Item.defineThrowable(json.id, json.texture.name, json.texture.meta, json.name, json.maxStack);
}

