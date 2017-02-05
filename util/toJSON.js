var x1; var y1; var z1;
var x2; var y2; var z2;

var first = true;

var context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

function useItem(x,y,z,itemid,blockid,side,itemDamage,blockDamage) {
    if(itemid == 280){
        if(first){
            x1 = x; 
            y1 = y; 
            z1 = z;
            
            first = false;
            clientMessage(ChatColor.AQUA + "first point set to " + x + ";" + y + ";" + z);
        }
        else{
            x2 = x; 
            y2 = y; 
            z2 = z;
            
            first = true;
            clientMessage(ChatColor.AQUA + "second point set to " + x + ";" + y + ";" + z);
            clientMessage(ChatColor.AQUA + "generating JSON...");
            
            if(x1 > x2){
                var temp = x1; x1 = x2; x2 = temp;
            }
            if(y1 > y2){
                var temp = y1; y1 = y2; y2 = temp;
            }
            if(z1 > z2){
                var temp = z1; z1 = z2; z2 = temp;
            }
            
            saveTiles();
        }
    }
}

function saveTiles(){
    var json   = [];
    var ztiles = [];
    var xtiles = [];
    
    for(var y = y1; y <= y2; y++){
        for(var x = x1; x <= x2; x++){
            for(var z = z1; z <= z2; z++){
                var obj  = {};
                obj.id   = Level.getTile(x, y, z);
                obj.meta = Level.getData(x, y, z);
                ztiles[z - z1] = obj;
            }
            xtiles[x - x1] = ztiles;
            ztiles = [];
        }
        json[y - y1] = xtiles;
        xtiles = [];
    }
    var string    = JSON.stringify(json);
    var directory = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
    var file      = directory + "/building.json";
    try {
        var outputStream = new java.io.FileOutputStream(new java.io.File(file));
        outputStream.write(new java.lang.String(string).getBytes());
        outputStream.close();
        clientMessage(ChatColor.GREEN + "Successfully saved to " + file);
        } catch (err) {
            clientMessage(ChatColor.RED + "Unable to save file: " + err);
        }
}

