//APO Craft generation
//You are not welcome here

var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
function runUI(f)
{
ctx.runOnUiThread(new java.lang.Runnable({run: function(){
try{
f();
}catch(e){
print(e);
}
}}));
}
function srandom(seed)//for seedRandom
{
var arg1=Math.abs(Math.sin(seed*3));
var arg2=Math.abs(seed)/1.5;
var final=Math.tan(arg1*arg2)*2.5;
while(Math.abs(final)>1)
{
final/=1.5;
}
return (Math.abs(final));
}
function showSimpleDialog(title,msg)
{
runUI(function(){
var dialog = new android.app.AlertDialog.Builder(context);
dialog.setTitle(title);
var scroll = new android.widget.ScrollView(context);
var layout = new android.widget.LinearLayout(context); 
var TextView = new android.widget.TextView(context); 
TextView.setText(msg); 
TextView.setTextSize(20); 
layout.addView(TextView); 
scroll.addView(layout); 
dialog.setView(scroll); 
dialog.create().show(); 
return dialog; 
});
}
function error(e)
{
	showSimpleDialog("err",e);
}
//Begin with API for easier coding

//Change parameters if you want
var gen_medium_height=75;//blocks
var gen_chunk_min_height=45;//blocks
var gen_chunk_max_height=80;//blocks
var gen_landscape_height=3;//blocks
var gen_radius=3;//chunks
var gen_radius_to_start=3;//chunks
var gen_cycle_delay=50;//milliseconds
var new_level_preparing_time=20*10;//ticks
var gen_chunks=[];
var chunk_info=[];
var gen_bioms_parameters=[];
function addBiom(grass_array,stone_array,rarity)
{
	gen_bioms_parameters.push({grass:grass_array,stone:stone_array,rarity:rarity});
}
addBiom([2,2,2,3,3,3,3,3,4,48],[1],15);
/*
{grass_layer_ids:[{id:2,data:0}],stone_layer_ids:[1,0,1,1,1,3,1,5],rarity:10},//default

{grass_layer_ids:[[12,0]],stone_layer_ids:[1,0,[24,0]],rarity:15},//desert

{grass_layer_ids:[[3,0]],stone_layer_ids:[1,0,1,1,1,3,1,5],rarity:2},//burned earth

{grass_layer_ids:[[2,0],[3,0],[1,0]],stone_layer_ids:[1,0,1,1,1,3,1,5,46,0],rarity:8},//war area

];*/

var Generation={};
Generation.getChunkPoints=function(x,z)//return object with chunk points coords
{
var pointx1=x-(x%16);
var pointz1=z-(z%16);
var pointx2=x-(x%16)+16;
var pointz2=z-(z%16)+16;
return {x1:pointx1,x2:pointx2,z1:pointz1,z2:pointz2};
};
Generation.isChunkReady=function(x,z)//return boolean value
{
var chunk=Generation.getChunkPoints(x,z);
return getTile(chunk.x1,1,chunk.z1)==1;
};
Generation.setChunkReady=function(x,z,ready)
{
var chunk=Generation.getChunkPoints(x,z);

if(ready){
setTile(chunk.x1,1,chunk.z1,1);
setTile(chunk.x1,2,chunk.z1,7);
}else{
setTile(chunk.x1,1,chunk.z1,0);
}
};
Generation.getChunkDistance=function(x,z)
{
var chunk=Generation.getChunkPoints(x,z);
var chunk_center={x:(chunk.x2-chunk.x1)/2,z:(chunk.z2-chunk.z1)/2};
var player={x:Player.getX(),z:Player.getZ()};
var dx=Math.abs(player.x-chunk_center.x);
var dz=Math.abs(player.z-chunk_center.z);
var distance=Math.sqrt(dx*dx+dz*dz);
return distance;
};
Generation.roadLine=function(fx,fz,tx,tz,width,r)
{
	
};

Generation.getSurfaceHeight=function(x,z)
{
	for(var y=gen_chunk_min_height;y<=gen_chunk_max_height;y++)
	{
		var tile=Level.getTile(x,y,z);
		if(tile==0)
		{
			return y;
		}
	}
	return null;
};
Generation.generateSimpleLandscapeAtChunk=function(x,z,biom_obj)
{
//var thread=doInNewThread(function(){
var chunk=Generation.getChunkPoints(x,z);
var cx=chunk.x1;
var cz=chunk.z1;
clientMessage(cx+" "+cz);
var h=gen_medium_height;
for(var zc=0;zc<16;zc++)
{
for(var xc=0;xc<16;xc++)
{
//thread.sleep(gen_cycle_delay);
var grass_index=Math.round((biom_obj.grass.length-1)*srandom(Math.abs(xc)+""+Math.abs(cz)+""+Math.abs(cx)+""+Math.abs(cz)+"222"));
var id=biom_obj.grass[grass_index];
var height=Math.round(10*srandom(Math.abs(xc)+""+Math.abs(zc)+""+Math.abs(cx)+""+Math.abs(cz)));
if(height>9)
{
Level.setTile(cx+xc,h+1,cz+zc,id);
Level.setTile(cx+xc+1,h+1,cz+zc,id);
Level.setTile(cx+xc-1,h+1,cz+zc,id);
Level.setTile(cx+xc,h+1,cz+zc+1,id);
Level.setTile(cx+xc,h+1,cz+zc-1,id);
}
Level.setTile(cx+xc,h,cz+zc,id);
}
}
//});
};
Generation.generateStoneLayerAtChunk=function(x,z,biom_obj)
{
	var chunk=Generation.getChunkPoints(x,z);
	var fromX=Math.min(chunk.x1,chunk.x2);
	var fromZ=Math.min(chunk.z1,chunk.z2);
	var toX=Math.max(chunk.x1,chunk.x2);
	var toZ=Math.max(chunk.z1,chunk.z2);
	
};
Generation.box=function(fx,fy,fz,tx,ty,tz,id,data,r)
{
var thread=doInNewThread(function(){
 for(var x=Math.min(fx,tx);x<Math.max(fx,tx);x++)
 {
    for(var y=Math.min(fy,ty);y<Math.max(fy,ty);y++)
    {
        for(var z=Math.min(fz,tz);z<Math.max(fz,tz);z++)
        {
            if(srandom(fx+""+fy+""+fz+""+tx+""+ty+""+tz+""+id+""+data)*100<=r)
            {
            	setTile(x,y,z,id,data);
				
            }
			thread.sleep(gen_cycle_delay);
        }     
    }     
 }    
});
};
function tonnel(x,y,z)
{
Generation.box(x-2,y-2,z-2,x+2,y+2,z+2,0,0,90);
}
function startTonnel(x,y,z)
{
tonnel(x,y,z);
tonnel(x-4,y,z);
continueTonnel(x-8,y,z,50);
tonnel(x+4,y,z);
continueTonnel(x+8,y,z,50);
tonnel(x,y,z-4);
continueTonnel(x,y,z-8,50);
tonnel(x,y,z+4);
continueTonnel(x,y,z+8,50);
tonnel(x,y+4,z);
continueTonnel(x,y+8,z,50);
tonnel(x,y-4,z);
continueTonnel(x,y-8,z,50);
}
function continueTonnel(x,y,z,r)
{
t(x,y,z);
var r1=Math.random()*100;
var r2=Math.random()*100;
var r3=Math.random()*100;
var r4=Math.random()*100;
var r5=Math.random()*100;
var r6=Math.random()*100;
if(r1<r)
{
tonnel(x-4,y,z);
continueTonnel(x-8,y,z,r1);
}
if(r2<r)
{
tonnel(x+4,y,z);
continueTonnel(x+8,y,z,r2);
}
if(r3<r)
{
tonnel(x,y,z-4);
continueTonnel(x,y,z-8,r3);
}
if(r4<r)
{
tonnel(x,y,z+4);
continueTonnel(x,y,z+8,r4);
}
if(r5<r)
{
tonnel(x,y+4,z);
continueTonnel(x,y+8,z,r5);
}
if(r6<r)
{
tonnel(x,y-4,z);
continueTonnel(x,y-8,z,r6);
}
}
Generation.setInfo=function(info_obj)
{
	var coords=info_obj.points;
	var index=-1;
	for(var chunk in gen_chunks)
	{
		if(gen_chunks[chunk].points==coords)
		{
			index=chunk;
			break;
		}
	}
	if(index!=-1)
	{
		gen_chunks[index]=info_obj;
	}else{
		gen_chunks.push(info_obj);
	}
	
};
Generation.getChunkInfo=function(x,z)
{
	var points=Generation.getChunkPoints(x,z);
	var index=-1;
	for(var chunk in gen_chunks)
	{
		if(gen_chunks[chunk].points==coords)
		{
			index=chunk;
			break;
		}
	}
	if(index!=-1)
	{
		return gen_chunks[index];
	}else{
		return null;
	}
};
function doInNewThread(whatToDo)
{
	var thread=new java.lang.Thread(
	new java.lang.Runnable({run:function(){
			whatToDo();
		}
	})
	);
	thread.start();
	return thread;
}
Generation.tick=function()
{
	var px=Player.getX();
	var pz=Player.getZ();
	
	
	
	/*
	OLD 
	var px=Player.getX();
	var pz=Player.getZ();
	for(var cx=-gen_radius*16;cx<gen_radius*16;cx+=16)
	{
		for(var cz=-gen_radius*16;cz<gen_radius*16;cz+=16)
		{
			var x=cx+px;
			var z=cz+pz;
			var distance=Generation.getChunkDistance(x,z);
				if(!Generation.isChunkReady(x,z))
				{
					try{
						doInNewThread(function(){
						Generation.generateSimpleLandscapeAtChunk(x,z,3,3,gen_bioms_parameters[0]);
						Generation.setChunkReady(x,z,true);
						//showSimpleDialog("Error",e);
						});
					}catch(e){print(e);}
				}
		}
	}*/
};
















function newLevel()
{
	
}
function useItem(x,y,z,i)
{
	if(i==280)
	{
	try{
	Generation.generateSimpleLandscapeAtChunk(x,z,gen_bioms_parameters[0]);
	clientMessage(x+" "+z);
	}catch(e){print(e);}
	}
}
function modTick()
{
	//Generation.tick();
}



