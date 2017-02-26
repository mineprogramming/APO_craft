Block.setDestroyTime(7, 1);

function destroyBlock(x,y,z,side) {
    if(getTile(x, y, z) == 7){
        for(var i = 0; i < 20; i++){
            Level.explode(x, y, z, 1000);
        }
    }
}