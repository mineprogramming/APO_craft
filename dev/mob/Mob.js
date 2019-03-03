var MOB = 0;

var Mob = function(params){
    if(!params.id){
        params.id = "apo_mob_" + MOB;
    }
    
    if(!params.name){
        params.name = "Unknown Mob" + MOB;
    }
    
    if(!params.render){
        params.render = new Render(3);
    }
    
    if(!params.texture){
        params.texture = "";
    }
    
    if(!params.armor){
        params.armor = new ArmorSet();
    }
    
    if(!params.equipChance){
        params.equipChance = 1;
    }
    
    if(!params.hitbox){
        params.hitbox = {w: 0.9, h: 1.8};
    }
    
    if(!params.aiTypes){
        params.aiTypes = {};
    }
    
    if(!params.loot){
        params.loot = [];
    }
    
    
    this.entity = MobRegistry.registerEntity(params.id);
    this.id = params.id;
    
    var model = new EntityModel();
    model.setRender(params.render);
    
    var texture = new Texture(params.texture);
    model.setTexture(texture);
    
    this.entity.customizeVisual({ 
        getModels: function() {
            return {
                "main": model
            };
        }
    });
    
    this.entity.customizeDescription({
        getHitbox: function(){
            return {w: 0.9, h: 1.8}
        },
        
        getDrop: function(){
            return params.loot;
        }
    });
    
    this.entity.customizeAI({ 
        getAITypes: function(){ 
            return params.aiTypes;
        } 
    });
    
    this.spawn = function(x, y, z){
        let entity = Entity.spawnCustom(this.id, x, y, z);
        params.armor.equip(entity.entity, params.equipChance);
    }
    
    this.registerEgg = function(itemId){
        Item.registerUseFunctionForID(itemId, function(coords, item, block) {
            coords = coords.relative;
            this.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
        });
    }
    
    MOB++;
}