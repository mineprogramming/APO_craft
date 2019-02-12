var MachineEssentials = {
    registerStandart: function(id, params){
        let prototype = {};
        
        //Prototype's standart params and functions
        let defaultValues = {};
        defaultValues.energy_storage = params.energy_storage? params.energy_storage: 2000;
        defaultValues.energy_consumption = params.energy_consumption? params.energy_consumption: 2;
        defaultValues.work_time = params.work_time? params.work_time: 300;
        defaultValues.energy = 0;
        defaultValues.progress = 0;
        prototype.defaultValues = defaultValues;
        
        prototype.result = params.resultFunc;
        
        prototype.getEnergyStorage = function(){
            return this.data.energy_storage;
        }
        
        prototype.energyTick = function(type, src){
            var energyNeed = this.getEnergyStorage() - this.data.energy;
            this.data.energy += src.get(energyNeed);
        }
        
        prototype.getTransportSlots = function(){
            return {input: params.source_slots, output: params.result_slots};
        }
        
        prototype.getGuiScreen = function(){
            return params.guiScreen;
        }
        
        prototype.checkResult = function(result, resultSlots){
            if(!result) return false;
            for(var i in resultSlots){
                var id, count;
                if(Array.isArray(result)){
                    id = result[i * 2];
                    count = result[i * 2 + 1];
                } else {
                    id = result.id;
                    count = result.count;
                }
                
                var resultSlot = resultSlots[i];
                if((resultSlot.id != id || resultSlot.count + count > 64) && resultSlot.id != 0){
                    return false;
                }
            }
            return true;
        }
        
        prototype.tick = function(){
            // Get all slots
            var sourceSlots = [];
            for(var i in params.source_slots){
                sourceSlots[i] = this.container.getSlot(params.source_slots[i]);
            }
            var resultSlots = [];
            for(var i in params.result_slots){
                resultSlots[i] = this.container.getSlot(params.result_slots[i]);
            }
            
            // Get recipe source to look for
            let source;
            if(sourceSlots.length == 1){
                source = {"id": sourceSlots[0].id, "data": sourceSlots[0].data};
            } else {
                source = [];
                for(var i in sourceSlots){
                    source[i] = {"id": sourceSlots[i].id, "data": sourceSlots[i].data};
                }
            }
            
            var result = MachineRecipeRegistry.getRecipeResult(params.machine_name, source);
            
            if(params.customResult) result = params.customResult(result, this.container);
            
            if(result && this.checkResult(result, resultSlots)){
                if(this.data.energy >= this.data.energy_consumption){
                    this.data.energy -= this.data.energy_consumption;
                    this.data.progress += 1/this.data.work_time;
                }
                if(this.data.progress >= 1){
                    for(var i in sourceSlots){
                        sourceSlots[i].count--;
                    }
                    this.result(resultSlots, result);
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
            else {
                this.data.progress = 0;
            }
        
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            //this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), Math.min(32, energyStorage - this.data.energy), 0);
            
            this.container.setScale(params.progress_scale, this.data.progress);
            this.container.setScale(params.energy_scale, this.data.energy / energyStorage);
        }
        
        TileEntity.registerPrototype(id, prototype);
        ICRender.getGroup("ic-wire").add(id, -1);
        EnergyTileRegistry.addEnergyTypeForId(id, EU);
    }
};