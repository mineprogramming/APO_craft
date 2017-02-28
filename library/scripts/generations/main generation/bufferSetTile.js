var buffer      = [];
var build_speed = 20;
function bufferSetTile(x,y,z,id,data,important)
{
    if(important)
    {
        setTile(x,y,z,id,data);
    }else{
        buffer.push({x:x,y:y,z:z,i:id,d:data});
    }
}
function bufferTick()
{
    for(var i=0;i<Math.min(buffer.length,build_speed);i++)
    {
        var b=buffer[0];
        defaultSetTile(b.x,b.y,b.z,b.i,b.d);
        buffer.shift();
    }
}
function useItem(x,y,z,i)
{
    if(i==280)
    {
        for(var i=0;i<100;i++)
        {
            bufferSetTile(x+i,y+i,z+i,57,0,false);
        }
    }
}
