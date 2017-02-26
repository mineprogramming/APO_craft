var BufferedBuilding = {
    buffer: new Array(),
    perTick:20,
    setTileFunction:function(x, y, z, id, data){
        setTile(x, y, z, id, data);
    }
};

BufferedBuilding.setTile = function(x, y, z, id, data){
    this.buffer.push({x:x, y:y, z:z, id:id, data:data});
}

BufferedBuilding.modTick = function(){
    for(var i = 0; (i < this.perTick && this.buffer.length > 0); i++){
        var block = this.buffer.shift();
        this.setTileFunction(block.x, block.y, block.z, block.id, block.data);
    }
}