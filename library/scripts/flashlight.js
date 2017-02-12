
var Light={};
Block.defineBlock(250,"",[["stone",0]],1,false,0);
Block.setShape(250,1,1,1,1,1,1);
Light.carring=false;
Light.tick=function()
{
	var yaw=Entity.getYaw(getPlayerEnt());
	var pitch=Entity.getPitch(getPlayerEnt());
	var x=Deg.x(yaw);
	var y=Deg.y(pitch);
	var z=Deg.z(yaw);
	var px=Player.getX();
	var pz=Player.getZ();
	var py=Player.getY();
	for(var i=3;i<18;i++)
	{
		if(getTile(px+x*i,py+y*i,pz+z*i)!=0&&getTile(px+x*i,py+y*i,pz+z*i)!=250)
		{
			Block.setLightLevel(250,Math.min(15+15-Math.round(Math.sqrt(Math.pow(x*i,2)+Math.pow(z*i,2)+Math.pow(y*i,2))),15));
			Light.light(Light.x,Light.y,Light.z,0);
			Light.light(px+x*i,py+y*i,pz+z*i,250);
			//clientMessage(getTile(px+x*i,py+y*i,pz+z*i)+" "+Math.round(Math.sqrt(Math.pow(x*i,2)+Math.pow(z*i,2)+Math.pow(y*i,2))));
		//	clientMessage("light");
			break;
		}
	}
};
Light.x;
Light.y;
Light.z;
Light.light=function(x,y,z,id)
{
	Light.x=x;
	Light.z=z;
	Light.y=y;
	if(getTile(x,y+1,z)==0||getTile(x,y+1,z)==250)
	{
		setTile(x,y+1,z,id);
	}
	if(getTile(x,y-1,z)==0||getTile(x,y-1,z)==250)
	{
		setTile(x,y-1,z,id);
	}
	if(getTile(x+1,y,z)==0||getTile(x+1,y,z)==250)
	{
		setTile(x+1,y,z,id);
	}
	if(getTile(x-1,y,z)==0||getTile(x-1,y,z)==250)
	{
		setTile(x-1,y,z,id);
	}
	if(getTile(x,y,z+1)==0||getTile(x,y,z+1)==250)
	{
		setTile(x,y,z+1,id);
	}
	if(getTile(x,y,z-1)==0||getTile(x,y,z-1)==250)
	{
		setTile(x,y,z-1,id);
	}
};
var Deg={
x:function(d){return Math.sin(d/180*Math.PI)*(-1);},
z:function(d){return Math.cos(d/180*Math.PI);},
y:function(d){return Math.cos(((d+90)*Math.PI)/180);},
};
Light.ticking=0;
function modTick()
{
	Light.ticking++;
	if(getCarriedItem()==280&Light.ticking>=2)
	{
	Light.carring=true;
	Light.ticking=0;
	Light.tick();
	}
	if(Light.carring&&getCarriedItem()!==280)
	{
		Light.carring=false;
		Light.light(Light.x,Light.y,Light.z,0);
	}
}
