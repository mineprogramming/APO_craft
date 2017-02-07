function convertStreamToString(is) { 
    var bis = new java.io.BufferedInputStream(is); 
    var buf = new java.io.ByteArrayOutputStream(); 
    var res = bis.read(); 
    while(res != -1) { 
        buf.write(res); 
        res = bis.read(); 
    } 
    return buf.toString(); 
}
function SetTileFromJson(name, x1, y1, z1){
    var str    = ModPE.openInputStreamFromTexturePack("buildings//" + name);
    var string = convertStreamToString(str);
    var json   = JSON.parse(string);
    for(var y = 0; y < json.length; y++){
        for(var x = 0; x < json[0].length; x++){
            for(var z = 0; z < json[0][0].length; z++){
                var id   = json[y][x][z].id;
                var meta = json[y][x][z].meta;
                setTile(x1 + x, y1 + y, z1 + z, id, meta); 
            }
        }
    }
}

function newLevel() {
    var x = Player.getX() + 10;
    var y = Player.getY();
    var z = Player.getZ() + 10;

    SetTileFromJson("1.json", x, y, z);
}
