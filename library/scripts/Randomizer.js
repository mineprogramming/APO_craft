/*
Randomizer API
for APO Craft, #mineprogramming
...You are not welcome here
*/

/*
Randomizer.initialize() - initializes java.util.Random with world's seed
Randomizer.getWorldSeed() - returns unique number for each world
Randomizer.GaussRandom(max) - returns a random number from 0 to max
Randomizer.GaussRandom(max, depth) - returns a random number from 0 to max,
    depth - how more it is possible to get a number close to zero then to max
*/

var Randomizer = {};

Randomizer.getWorldSeed = function(){
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

Randomizer.initialize = function(){
    this.Random = new java.util.Random(this.getWorldSeed());
}

Randomizer.GaussRandom = function(max, depth){
    if (typeof depth === 'undefined') {
        depth = 1;
    }
    var result = 0;
    for(var i = 0; i < depth; i++){
        result += this.Random.nextInt(max * 2) - max;
    }
    return Math.round(Math.abs(result / depth));
}

Randomizer.initialize();
