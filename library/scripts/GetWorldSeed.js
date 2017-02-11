Level.getWorldSeed = function(){
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
}