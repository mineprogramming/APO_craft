var Exoskeleton = {
    coords: []
};

Exoskeleton.render = new Render({skin: "mob/exoskeleton.tga"});
(function() {
    var mesh = new RenderMesh(__dir__ + "models/exoskeleton.obj", "obj", null);
    Exoskeleton.part = Exoskeleton.render.getPart("body").addPart("exoskeleton");
    Exoskeleton.part.setOffset(0, 20, 0);
    Exoskeleton.part.setMesh(mesh);
})();

Exoskeleton.add = function(x, y, z){
    var animation = new Animation.Base(x, y, z);
    animation.ticks = 0;
    animation.describe({render: Exoskeleton.render.getId()});
    animation.loadCustom(function(){
        this.ticks++;
        Exoskeleton.part.setRotation(0, this.ticks / 4, 0);
        this.refresh();
    });
    return animation;
}

Exoskeleton.setup = function(x, y, z){
    let animation = Exoskeleton.add(x, y, z);
    Exoskeleton.coords.push({animation: animation, coords: {"x": x, "y": y, "z": z}});
}

Saver.addSavesScope("exoskeleton", 
    function read(scope){
        if(!scope.coords) return;
        Exoskeleton.coords = [];
        for(var i in scope.coords){
            let coords = scope.coords[i];
            let animation = Exoskeleton.add(coords.x, coords.y, coords.z);
            Exoskeleton.coords.push({animation: animation, coords: coords});
        }
    },

    function save(){
        let coords = [];
        for(var i in Exoskeleton.coords){
            coords.push(Exoskeleton.coords[i].coords);
        }
        return {coords: coords};
    }
);

var exoMessageDisplayed = false;
Callback.addCallback("tick", function(){
    if (World.getThreadTime() % 5 === 0) {
        let player = Entity.getPosition(Player.get());
        var near = false;
        
        // Check armor slots
        var empty = true;
        var exo = false;
        var slots = [];
        for(var i = 0; i < 4; i++){
            var slot = Player.getArmorSlot(i);
            if(slot.id != 0){
                empty = false;
            }
            if(slot.id == armorExo[i]){
                exo = true;
            }
            slots.push(slot.id);
        }
        
        // Check if all the slots are used
        if(exo){
            if(!(slots[0] == armorExo[0] 
                    && slots[1] == armorExo[1] 
                    && slots[2] == armorExo[2] 
                    && slots[3] == armorExo[3])){
                // Take armor off
                for(var i = 0; i < 4; i++){
                    Player.setArmorSlot(i, 0);
                }
                
                for(var i = 0; i < 36; i++){
                    let slot = Player.getInventorySlot(i);
                    for(var j = 0; j < 4; j++){
                        if(armorExo[j] == slot.id){
                            Player.setInventorySlot(i, 0);
                        }
                    }
                }
                let coords = Entity.getPosition(Player.get());
                Exoskeleton.setup(coords.x + 2, coords.y - 0.5, coords.z);
            }
        }
        
        Exoskeleton.coords = Exoskeleton.coords.filter(function(obj){
            let exoskeleton = obj.coords;
            if(player.x < exoskeleton.x + 1 && player.x > exoskeleton.x - 1
                    && player.y < exoskeleton.y + 1 && player.y > exoskeleton.y - 1
                    && player.z < exoskeleton.z + 1 && player.z > exoskeleton.z - 1){
                near = true;
                if(empty){
                    // Put armor on
                    obj.animation.destroy();
                    for(var i = 0; i < 4; i++){
                        Player.setArmorSlot(i, armorExo[i]);
                    }
                    return false;
                } else {
                    // Display warning
                    if(!exoMessageDisplayed){
                        exoMessageDisplayed = true;
                        Game.message("Take off all the armor to proceed");
                    }
                }
                
            }
            return true;
        });
        
        if(!near){
            exoMessageDisplayed = false;
        }
    }
});