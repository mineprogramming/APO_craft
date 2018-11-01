/* Этот код получается слишком кривым. Возможно, в светлом будущем он станет лучше. */


// High-Voltage Transformator
IDRegistry.genBlockID("hvTransformator");
Block.createBlock("hvTransformator", [
    {name: "High-Voltage Transformator", texture: [["std_bottom", 0], ["std_top", 0], ["hv_transformator", 0], ["hv_transformator", 0], ["hv_transformator", 0], ["hv_transformator", 0]], inCreative: true}
]);
ICRender.getGroup("ic-transformator").add(BlockID.hvTransformator, -1);

TileEntity.registerPrototype(BlockID.hvTransformator, {
    defaultValues: {
        transmitter: false
    }, 
    
    click: function(id, count, data){
        if(id == BlockID.hvConnector) return true;
        this.data.transmitter = !this.data.transmitter;
        if(this.data.transmitter){
            Game.message("Transmitter");
        } else {
            Game.message("Reciever");
        }
        return true;
    },
    
    energyTick: function(type, src){
        
    },
    
    isGenerator: function() {return this.data.transmitter;}
});

EnergyTileRegistry.addEnergyTypeForId(BlockID.hvTransformator, EU);

Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(block.id == BlockID.hvTransformator && item.id == BlockID.hvConnector){
        World.setBlock(x, y, z, BlockID.hvConnector, 0);
    }
});




// High-Voltage Connector
IDRegistry.genBlockID("hvConnector");
Block.createBlock("hvConnector", [
    {name: "High-Voltage Connector", texture: [["hv_connector", 0]], inCreative: true}
]);
RenderTools.setupConnectorRender(BlockID.hvConnector);

Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id == BlockID.hvConnector){
        for(var i in WireSystem.wires){
            let wc1 = WireSystem.wires[i].coords[0];
            let wc2 = WireSystem.wires[i].coords[1];
            if((wc1.x == coords.x + 0.5 && wc1.y == coords.y - 1 && wc1.z == coords.z + 0.5)
                    || (wc2.x == coords.x + 0.5 && wc2.y == coords.y - 1 && wc2.z == coords.z + 0.5)){
                // Remove wire from array and remove animation of the returned item;
                WireSystem.wires.splice(i, 1)[0].animation.destroy();
                World.drop(coords.x, coords.y, coords.z, ItemID.wireCoil, 1, 0);
            }
        }
    }
});



IDRegistry.genItemID("wireCoil");
Item.createItem("wireCoil", "Wire coil", {name: "wire_coil", meta: 0}, {});

var WireSystem = {
    connector1: null,
    
    wires: [],
    
    setupWire: function(pos1, pos2){
        let distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2));
        if(distance == 0 || distance > 32) {
            return false;
        }
        for(var i in WireSystem.wires){
            let wc1 = WireSystem.wires[i].coords[0];
            let wc2 = WireSystem.wires[i].coords[1];
            if((wc1.x == pos1.x && wc1.y == pos1.y && wc1.z == pos1.z
                    && wc2.x == pos2.x && wc2.y == pos2.y && wc2.z == pos2.z)
                || (wc2.x == pos1.x && wc2.y == pos1.y && wc2.z == pos1.z
                    && wc1.x == pos2.x && wc1.y == pos2.y && wc1.z == pos2.z)){
                  return false;
            }
        }
        let animation = WireSystem.addWire(pos1, pos2, distance);
        WireSystem.wires.push({animation: animation, coords: [pos1, pos2]});
        return true;
    },
    
    addWire: function(pos1, pos2, distance){
        var animationWire = new Animation.Base((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2, (pos1.z + pos2.z) / 2);
        var render = new Render({skin: "mob/wire.png"});
        var partWire = render.getPart("body").addPart("wire");
        
        var angleX = (pos2.y == pos1.y)? 0: Math.atan((pos1.z - pos2.z) / (pos2.y - pos1.y));
        var angleY = (pos2.x == pos1.x)? Math.PI / 2: Math.atan((pos1.z - pos2.z) / (pos1.x - pos2.x));
        var angleZ = (pos1.x == pos2.x)? 0: Math.atan((pos2.y - pos1.y) / (pos1.x - pos2.x));
        
        if(!distance) {
            distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2));
        }
        partWire.setRotation(angleX, angleY, angleZ);
        render.setPart("wire", [
            {
                type: "box",
                coords: { x: 0, y: 0, z: 0 },
                size: { x: distance * 16, y: 1, z: 1 }
            },
        ], {});
        
        animationWire.describe({render: render.getId()});
        animationWire.load();
        
        return animationWire;
    }
}

Saver.addSavesScope("wires", 
    function read(scope){
        WireSystem.wires = [];
        for(var i in scope.wires){
            let pos1 = scope.wires[i][0];
            let pos2 = scope.wires[i][1];
            let animation = WireSystem.addWire(pos1, pos2);
            WireSystem.wires.push({animation: animation, coords : [pos1, pos2]});
        }
    },

    function save(){
        var scope = [];
        for(var i in WireSystem.wires){
            scope.push(WireSystem.wires[i].coords);
        }
        return {wires: scope};
    }
);

Item.registerUseFunction("wireCoil", function (coords, item, block) {
    if(block.id != BlockID.hvConnector)
        return;
    if(!WireSystem.connector1){
        WireSystem.connector1 = {x: coords.x + 0.5, y: coords.y - 1, z: coords.z + 0.5};
    } else {
        let connector2 = {x: coords.x + 0.5, y: coords.y - 1, z: coords.z + 0.5};
        if(connector2.x == WireSystem.connector1.x 
                && connector2.y == WireSystem.connector1.y 
                && connector2.z == WireSystem.connector1.z)
            return;
        if(WireSystem.setupWire(WireSystem.connector1, connector2)){
            Game.message("Add wire");
            Player.decreaseCarriedItem();
            WireSystem.connector1 = null;
        }
    }
});