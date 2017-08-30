//by MineExplorer
//Версия beta v6
//Моя страница Вконтакте - vk.com/vlad.gr2027
//Группа мода - vk.com/modpe_scripting

//define ModAPI
var ModAPI = {
 addTranslation: function(name, translation){
  localisationData[name] = translation
 },
 
 defineBlock: function(id, name, textures, properties){
  if(properties){
   var type = properties.type
   if(type) this.setBlockType(id, type);
   if(type=="stone") type = 1
   if(type=="wood") type = 5
   if(!properties.opacity) Block.setLightOpacity(id, 0);
   try{Block.defineBlock(id, translate(name), textures, type, properties.opacity);}
   catch(e){Block.defineBlock(id, translate(name), ["stone",0], type, properties.opacity);}
   if(properties.render) Block.setRenderType(id, properties.render);
   if(properties.inCreative==undefined) properties.inCreative = true;
   if(properties.inCreative) Player.addItemCreativeInv(id);
  }else{
  Block.defineBlock(id, translate(name), textures);}
 },
 defineDamageBlock: function(id, name, textures, properties){
  var texture = []
  for(var damage in textures){
   for(var n = 0; n < 6; n++){
   texture.push(textures[damage]);}
   if(properties.inCreative) Player.addItemCreativeInv(id, 1, damage);
  }
  properties.inCreative = false
  this.defineBlock(id, name, texture, properties);
 },
 setBlockType: function(id, type){
  blocks[id].type = type;
 },
 setBlockLevel: function(id, level){
  blocks[id].level = level;
 },
 
 setItem: function(id, textureName, textureData, name, maxStack, category){
  try{ModPE.setItem(id, textureName, textureData, translate(name), maxStack);}
  catch(e){ModPE.setItem(id, "stick", 0, translate(name), maxStack);}
  if(!category) category = 4
  Item.setCategory(id, category);
  Player.addItemCreativeInv(id, 1, 0);
 },
 setFoodItem: function(id, textureName, textureData, saturation, name, maxStack){
  try{ModPE.setFoodItem(id, textureName, textureData, saturation, translate(name), maxStack);}
  catch(e){ModPE.setFoodItem(id, "stick", 0, saturation, translate(name), maxStack);}
  Player.addItemCreativeInv(id, 1, 0);
 },
 defineArmor: function(id, textureName, textureData, name, armorTexture, shield, maxDmg, armorType, craftMaterial){
  try{Item.defineArmor(id, textureName, textureData, translate(name), armorTexture, shield, maxDmg, armorType);}
  catch(e){Item.defineArmor(id, "stick", 0, translate(name), armorTexture, shield, maxDmg, armorType);}
  Player.addItemCreativeInv(id, 1, 0);
  if(!craftMaterial[1]) craftMaterial[1] = 0
  if(armorType==ArmorType.helmet){
   Item.addShapedRecipe(id,1,0, ["aaa", "a a"], ["a", craftMaterial[0], craftMaterial[1]]);}
  if(armorType==ArmorType.chestplate){
   Item.addShapedRecipe(id,1,0, ["a a", "aaa", "aaa"], ["a", craftMaterial[0], craftMaterial[1]]);}
  if(armorType==ArmorType.leggings){
   Item.addShapedRecipe(id,1,0, ["aaa", "a a", "a a"], ["a", craftMaterial[0], craftMaterial[1]]);}
  if(armorType==ArmorType.boots){
   Item.addShapedRecipe(id,1,0, ["a a", "a a"], ["a", craftMaterial[0], craftMaterial[1]]);}
 },
 
 addToolMaterial: function(name, toolMaterial){
  ToolMaterial[name] = toolMaterial
 },
 setCustomToolType: function(name, toolType){
  ToolType[name] = toolType
 },
 setTool: function(ID, textureName, textureData, name, toolType, toolMaterial, ID2){
  if(name) this.setItem(ID, textureName, textureData, name, 1, 3);
  Item.setHandEquipped(ID, true);
  Item.setMaxDamage(ID, toolMaterial.maxDmg);
  if(toolType.enchantType){
   Item.setEnchantType(ID, toolType.enchantType, toolMaterial.enchantability);
  }
  tools[ID] = [toolType, toolMaterial.level, toolMaterial.miningSpeed, toolMaterial.enchantment, ID2]
  if(toolType.damage){
   weapons[ID] = [toolType.damage + toolMaterial.damage, toolMaterial.fire, toolType.destroyTool, ID2]
  }
  if(toolMaterial.ID && toolType.craftRecipe){
   if(!toolMaterial.data) toolMaterial.data = 0
   Item.addShapedRecipe(ID,1,0, toolType.craftRecipe, ["a", toolMaterial.ID, toolMaterial.data, "b", 280, 0]);
   if(toolMaterial.ID==5){
    Item.addShapedRecipe(ID,1,0, toolType.craftRecipe, ["a", 5, 1, "b", 280, 0]);
    Item.addShapedRecipe(ID,1,0, toolType.craftRecipe, ["a", 5, 2, "b", 280, 0]);
    Item.addShapedRecipe(ID,1,0, toolType.craftRecipe, ["a", 5, 3, "b", 280, 0]);
    Item.addShapedRecipe(ID,1,0, toolType.craftRecipe, ["a", 5, 4, "b", 280, 0]);
    Item.addShapedRecipe(ID,1,0, toolType.craftRecipe, ["a", 5, 5, "b", 280, 0]);
   }
  }
 },
 
 //registerToolFunc: function(itemID, name, func){ },
 
 destroyItem: function(damage, destroyTool, ID2){
  itemID = Player.getCarriedItem();
  itemData = Player.getCarriedItemData();
  if(itemData+damage >= Item.getMaxDamage(itemID) && destroyTool){
   Level.playSoundEnt(player, "random.break", 1,1);
   Entity.setCarriedItem(player, ID2);
  }
  else{
   if(itemData+damage <= Item.getMaxDamage(itemID)){
    var slot = Player.getSelectedSlotId();
    var name = Player.getItemCustomName(slot);
    var enc = Player.getEnchantments(slot);
    var unbreacking = 0
    for(var n in enc){
     if(enc[n].type==Enchantment.UNBREAKING) unbreacking = enc[n].level
    }
    if(Math.random()*100 < 100/(unbreacking+1)){
     Entity.setCarriedItem(player,itemID,1,itemData+damage)
     if(name) Player.setItemCustomName(slot, name);
     for(var n in enc){
     Player.enchant(slot, enc[n].type, enc[n].level);}
    }
   }
  }
 },
 
 spawnExpOrb: function(x,y,z,exp){
  if(exp){
  Entity.setExtraData(Level.spawnMob(x, y, z, 69), "exp.count", exp);}
 },
 
 setCustomBlockDrop: function(ID, drop){
  blocks[ID].drop = drop
 },
 
 getMiningLevel: function(block){
  tool = tools[itemID]
  if(tool && itemData < Item.getMaxDamage(itemID) && tool[0].blockTypes.indexOf(block.type)!==-1){
   return tool[1]
  }
  tool = minecraftTools[itemID]
  if(tool && tool[0]==block.type){
   return tool[1]
  }
  return -1
 }
};

function translate(name){
 var translation = localisationData[name]
 if(translation){
  if(translation[language]){
  return translation[language]}
  var lang = language.split("_")
  if(translation[lang[0]]){
  return translation[lang[0]]}
 }
 return name
}

function random(min, max){
 return Math.floor(Math.random()*(max-min+1))+min
}

function drop(x,y,z,id,count,data){
 for(var n=1; n<=count; n++){
 Level.dropItem(x+0.5, y+0.5, z+0.5, 0, id, 1, data);}
}


var ToolMaterial = {
 WOOD: {ID:5, maxDmg:60, level:0, miningSpeed:2, enchantability:15, damage:0},
 STONE: {ID:4, maxDmg:131, level:1, miningSpeed:4, enchantability:5, damage:1},
 IRON: {ID:265, maxDmg:251, level:2, miningSpeed:6, enchantability:14, damage:2},
 GOLD: {ID:266, maxDmg:33, level:0, miningSpeed:12, enchantability:15, damage:0},
 DIAMOND: {ID:264, maxDmg:1562, level:3, miningSpeed:8, enchantability:10, damage:3}
};


var ToolType = {
 sword: {
  damage: 4,
  destroyTool: true,
  blockTypes: [],
  enchantType: EnchantType.weapon,
  craftRecipe: ["a", "a", "b"],
  startDestroyBlock: function(x,y,z, side, itemID, itemDmg, blockID, block){
   //if(!Level.getGameMode()){
    if(blockID==30){
    Block.setDestroyTime(30, 0.08);}
    if(swordBlocks.indexOf(blockID)!==-1){
    Block.setDestroyTime(blockID, destroyTime/1.5);}
   //}else{
   //preventDefault();}
  },
  destroyBlock: function(x,y,z, side, itemID, itemDmg, blockID){
   ModAPI.destroyItem(2);
   if(blockID==30) drop(x,y,z,287,1);
  }
 },
 
 shovel: {
  damage: 2,
  destroyTool: true,
  blockTypes: ["dirt"],
  enchantType: EnchantType.shovel,
  craftRecipe: ["a", "b", "b"],
  useItem: function(x, y, z, itemID, blockID, side, itemDmg, blockDmg){
   if(blockID==2&&side==1){ 
	setTile(x, y, z, 198);
	Level.playSoundEnt(player, "step.grass", 0.5, 0.75);
	ModAPI.destroyItem(1, true);
   }
  }
 },
 
 pickaxe: {
  damage: 2,
  destroyTool: true,
  blockTypes: ["stone"],
  enchantType: EnchantType.pickaxe,
  craftRecipe: ["aaa", " b ", " b "]
 },
 
 axe: {
  damage: 3,
  destroyTool: true,
  blockTypes: ["wood"],
  enchantType: EnchantType.axe,
  craftRecipe: ["aa", "ab", " b"]
 },
 
 hoe: {
  blockTypes: [],
  craftRecipe: ["aa", " b", " b"],
  useItem: function(x, y, z, itemID, blockID, side, itemDmg, blockDmg){
   if((blockID==2 || blockID==3)&&side==1){ 
   setTile(x, y, z, 60);
   Level.playSoundEnt(player, "step.gravel", 0.5, 0.75);
   ModAPI.destroyItem(1, true);}
  }
 }
};


var player;
var weapon_tick = 0
var tool;
var itemID;
var itemData;
var blockID;
var blockData;

var localisationData = {}

var tools = {}
var weapons = {}
var minecraftTools = {
 256:["dirt", 2, 6], 269:["dirt", 0, 2], 273:["dirt", 1, 4], 277:["dirt", 3, 8], 284:["dirt", 0, 12],
 257:["stone", 2, 6], 270:["stone", 0, 2], 274:["stone", 1, 4], 278:["stone", 3, 8], 285:["stone", 0, 12],
 258:["wood", 2, 6], 271:["wood", 0, 2], 275:["wood", 1, 4], 279:["wood", 3, 8], 286:["wood", 0, 12],
 359:["leaves", 0]
}

var swordBlocks = [18, 86, 91, 103, 106, 127, 161];
var minecraftBlocks = {
 "dirt": {
  0:[2, 3, 12, 13, 60, 78, 80, 82, 88, 110, 198, 243]
 },
 "stone": {
  0:[1, 4, 16, 23, 24, 27, 28, 29, 33, 43, 44, 45, 48, 61, 62, 66, 67, 70, 71, 79, 87, 98, 108, 109, 112, 113, 114, 116, 117, 118, 121, 125, 126, 128, 139, 145, 147, 148, 152, 153, 154, 155, 156, 159, 167, 172, 173, 174, 179, 180, 181, 182, 245, 251],
  1:[15, 21, 22, 42, 52, 101],
  2:[14, 41, 56, 57, 73, 74, 129, 133],
  3:[49]
 },
 "wood": {
  0:[5, 17, 25, 47, 53, 54, 58, 63, 64, 85, 86, 91, 96, 107, 134, 135, 136, 158, 162, 163, 164, 183, 184, 185, 187]
 },
 "leaves": {
  0:[18, 161]
 },
 "glass": {
  0: [20, 102]
 }
}

var blocksDrop = {
 1: function(x,y,z, blockData, enchant){
  if(blockData==0){
   if(enchant.type=="silk_touch"){
   drop(x,y,z, 1, 1);}
   else{drop(x,y,z,4,1);}
  }
  else{drop(x,y,z, 1, 1, blockData);}
 },
 16: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 16, 1);}
  else{
  drop(x,y,z, 263, random(1, 1+enchant.level));
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(0,2));}
 },
 21: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 56, 1);}
  else{
  drop(x,y,z, 351, random(4, 8*enchant.level), 4);
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(2,5));}
 },
 43: function(x,y,z, blockData){
  drop(x,y,z, 44, 2, blockData);
 },
 52: function(x,y,z){
  ModAPI.spawnExpOrb(random(15,43));
 },
 56: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 56, 1);}
  else{
  drop(x,y,z, 264, random(1, 1+enchant.level));
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(3,7));}
 },
 62: function(x,y,z){
  drop(x,y,z, 61, 1);
 },
 73: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 73, 1);}
  else{
  drop(x,y,z, 331, random(4, 5+enchant.level));
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(1,5));}
 },
 74: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 73, 1);}
  else{
  drop(x,y,z, 331, random(4, 5+enchant.level));
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(1,5));}
 },
 78: function(x,y,z, blockData){
  drop(x,y,z, 332, Math.floor(blockData/4)+1);
 },
 80: function(x,y,z){
  drop(x,y,z, 332, 4);
 },
 129: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 129, 1);}
  else{
  drop(x,y,z, 388, random(1, 1+enchant.level));
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(3,7));}
 },
 153: function(x,y,z, blockData, enchant){
  if(enchant.type=="silk_touch"){
  drop(x,y,z, 153, 1);}
  else{
  drop(x,y,z, 406, random(1, 1+enchant.level));
  ModAPI.spawnExpOrb(x+0.5, y+0.5, z+0.5, random(2,5));}
 }
}



//Tools
Block.setDestroyTime(1,2);
Block.setDestroyTime(4,1.5);
Block.setDestroyTime(139,2);
Block.setDestroyTime(181,0.8);
Block.setDestroyTime(182,0.8);

var blocks = [];
for(var id=0; id<256; id++){
	blocks[id] = {level:0}
}
for(var type in minecraftBlocks){
	for(var lvl in minecraftBlocks[type]){
		for(var n in minecraftBlocks[type][lvl]){
			id = minecraftBlocks[type][lvl][n]
			blocks[id].type = type
			blocks[id].level = lvl
		}
	}
}

function attackHook(a, v){
	itemID = Player.getCarriedItem();
	itemData = Player.getCarriedItemData();
	entHealth = Entity.getHealth(v);
	weapon = weapons[itemID];
	
	if(weapon_tick>=10 && entHealth>1){
		weapon_tick = 0;
		if(weapon && itemData < Item.getMaxDamage(itemID)){
			try{tools[itemID][0].attackHook(a, v);}catch(e){}
			var damage = weapon[0];
			if(damage > Math.floor(damage)){
				if(Math.random() < damage - Math.floor(damage)){
			    damage++;}
			    damage = Math.floor(damage);
			}
			ModAPI.destroyItem(1, weapon[2], weapon[3]);
			var fire = weapon[1];
			if(fire){Entity.setFireTicks(v, fire);}
			entHealth -= damage-1;
			Entity.setHealth(v, entHealth);
		}
	}
}

function getSpeed(speed){
	var enc = Player.getEnchantments(Player.getSelectedSlotId());
	var efficiency = 0
	for(var n in enc){
		if(enc[n].type==Enchantment.EFFICIENCY) efficiency = enc[n].level
	}
	if(!efficiency) return speed
	return speed*(Math.pow(1.3, Math.pow(2, efficiency-1)))
}

function startDestroyBlock(x,y,z, side){
	itemID = Player.getCarriedItem(); 
	itemData = Player.getCarriedItemData();
	blockID = Level.getTile(x,y,z);
	blockData = Level.getData(x,y,z);
	if(blockID==73) blockID = 74
	tool = tools[itemID]
	block = blocks[blockID]
	
	Block.setDestroyTime(blockID, block.time);
	
	if(tool){
		if(tool[0].startDestroyBlock){
		tool[0].startDestroyBlock(x,y,z, side, itemID, itemData, blockID, block);}
		else{
			if(tool[0].blockTypes.indexOf(block.type)!==-1 && itemData<Item.getMaxDamage(itemID)){
				miningSpeed = getSpeed(tool[2])
				if(block.type=="stone" && tool[1]>=block.level) miningSpeed = miningSpeed*10/3
				Block.setDestroyTime(blockID, block.time/miningSpeed);
			}
		}
	}else{
		tool = minecraftTools[itemID]
		if(tool && tool[0]==block.type && (!minecraftBlocks[block.type][block.level] || minecraftBlocks[block.type][block.level].indexOf(blockID)==-1)){
			if(block.type=="stone" && tool[1] < block.level){
				Block.setDestroyTime(blockID, block.time*10/3);
			}
			if(block.type=="dirt"){
				miningSpeed = getSpeed(tool[2])
				Block.setDestroyTime(blockID, block.time/miningSpeed);
			}
			if(block.type=="leaves"){
				Block.setDestroyTime(blockID, 0.04);
			}
		}
	}
}

function destroyBlock(x,y,z, side){
	itemID = Player.getCarriedItem(); 
	itemData = Player.getCarriedItemData();
	blockID = Level.getTile(x,y,z);
	blockData = Level.getData(x,y,z);
	tool = tools[itemID]
	block = blocks[blockID]
	
	if(tool){
		if(tool[0].destroyBlock){
		tool[0].destroyBlock(x,y,z, side, itemID, itemData, blockID, blockData, block);}
		else{
		if(itemData < Item.getMaxDamage(itemID))
		ModAPI.destroyItem(1, tool[0].destroyTool, tool[4]);}
	}
	block = blocks[getTile(x,y,z)]
	if(block){
		if(tool && tool[3]){
			var enchant = {type: tool[3][0], level: tool[3][1]}
		}else{
			var enchant = {level:0}
			var enc = Player.getEnchantments(Player.getSelectedSlotId());
			for(var n in enc){
				if(enc[n].type==Enchantment.SILK_TOUCH) enchant = {type: "silk_touch", level: enc[n].level}
				if(enc[n].type==Enchantment.FORTUNE && !enchant.type) enchant = {type: "fortune", level: enc[n].level}
			}
		}
		if(block.drop){
			Level.destroyBlock(x,y,z)
			block.drop(x,y,z, itemID, itemData, blockData, ModAPI.getMiningLevel(block), enchant);
		}
		else{
			if(tool && itemData < Item.getMaxDamage(itemID) && block.type=="stone" && tool[0].blockTypes.indexOf("stone")!==-1){
				if(blocksDrop[blockID]){
				blocksDrop[blockID](x,y,z, blockData, enchant);}
				else{
				Level.destroyBlock(x,y,z,true);}
			}
		}
	}
}

function useItem(x, y, z, itemID, blockID, side, itemDmg, blockDmg){
 try{
 tools[itemID][0].useItem(x, y, z, itemID, blockID, side, itemDmg, blockDmg);
 }catch(e){}
}


//Add experience
var expAdded = false

function playerAddExpHook(player, experienceAdded){
	if(!experienceAdded) expAdded = false
}
function entityRemovedHook(entity){
	exp = Entity.getExtraData(entity, "exp.count")
	if(exp&&!expAdded) Player.addExp(exp);
	expAdded = true
}


//Generation
ModAPI.genOreNormal = function(id, data, id2, maxY, x,z){
	x += Math.floor(Math.random()*16)
	z += Math.floor(Math.random()*16)
	var y = random(1, maxY)
	for(var xa = -1; xa < 2; xa++){
	 	for(var ya = -1; ya < 2; ya++){
			for(var za = -1; za < 2; za++){
 				var d = Math.sqrt(xa*xa+ya*ya+za*za);
 				var r = 1.5 - Math.random()/2
 				if(d < r) ModAPI.setOre(x+xa, y+ya, z+za, id, data, id2);
 			}
		}
	}
}
ModAPI.genOreSmall = function(id, data, id2, maxY, x,z){
	x += Math.floor(Math.random()*16)
	z += Math.floor(Math.random()*16)
	var y = random(1, maxY)
	for(var xa = 0; xa < 2; xa++){
	 	for(var ya = 0; ya < 2; ya++){
			for(var za = 0; za < 2; za++){
 				var d = Math.sqrt(xa*xa+ya*ya+za*za);
 				var r = 2 - Math.random()*2
 				if(d < r) ModAPI.setOre(x+xa, y+ya, z+za, id, data, id2);
 			}
		}
	}
}
ModAPI.genOreTiny = function(id, data, id2, maxY, x,z){
	x += Math.floor(Math.random()*16)
	z += Math.floor(Math.random()*16)
	var y = random(1, maxY)
	ModAPI.setOre(x,y,z, id, data, id2);
	if(Math.random()<0.5){
		ModAPI.setOre(x+random(-1,1), y+random(-1,1), z+random(-1,1), id, data, id2);
	}
}
ModAPI.setOre = function(x,y,z, id, data, id2){
	if(getTile(x,y,z)==id2) setTile(x,y,z, id, data);
}

var genTick;
var genOreTick;
var dimension;

function modTick(){
	weapon_tick++;
	if(dimension!==Player.getDimension()){
		genTick = -1
		genOreTick = -1
	}
	dimension = Player.getDimension()
	//Ore generation
	if(dimension==0){
		genOreTick++;
		if(genOreTick==25){
			genOreTick = 0
		}
		if(genOreTick==0){
			XX = Math.floor(Player.getX()/16)*16
			ZZ = Math.floor(Player.getZ()/16)*16
		}
		if(Player.getY()<64){
			var x = XX+16*(genOreTick%5-2)
			var z = ZZ+16*(Math.floor(genOreTick/5)%5-2)
			if(Level.getData(x+1, 0, z)!==1){
				setTile(x+1, 0, z, 7, 1);
				call("oreGeneration", x, z);
			}
		}
	}
	//World generation
	genTick++;
	if(genTick==49){
		genTick = 0
	}
	if(genTick==0){
		XX1 = Math.floor(Player.getX()/16)*16
		ZZ1 = Math.floor(Player.getZ()/16)*16
	}
	var x = XX1+16*(genTick%7-3)
	var z = ZZ1+16*(Math.floor(genTick/7)%7-3)
	if(Level.getData(x+2, 0, z)!==1){
		setTile(x+2, 0, z, getTile(x+2,0,z), 1);
		if(dimension==0){
		call("worldGeneration", x, z);}
		if(dimension==1){
		call("netherGeneration", x, z);}
		if(dimension==2){
		call("endGeneration", x, z);}
	}
}



//Final loading
var language = ModPE.getLanguage();
var loaded = false

function call(){
 var args = Array.prototype.slice.call(arguments);
 var funct = args.shift();
 
 var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
 var javascript = org.mozilla.javascript.ScriptableObject;
 
 for(var i = 0; i < scripts.size(); i++){
  var script = scripts.get(i);
  var scope = script.scope;
  
  if(javascript.hasProperty(scope, funct)){
   var obj = javascript.getProperty(scope, funct);
   obj.apply(scope, args);
  }
 }
}

/*
language_changed = false
if(language !== ModPE.getLanguage()){
  language = ModPE.getLanguage();
  language_changed = true
 }
*/
function newLevel(){
 if(!loaded){
  for(var id=1; id<256; id++){
   blocks[id].time = Block.getDestroyTime(id)
  }
  print("loading complete");
  loaded = true
 }
 player = getPlayerEnt()
 genTick = -1
 genOreTick = -1
}