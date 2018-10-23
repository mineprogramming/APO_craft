IDRegistry.genBlockID("extruder");
Block.createBlockWithRotation("extruder", [
    {name: "Extruder", texture: [["std_bottom", 0], ["extruder_top", 0], ["std_side", 0], ["extruder_front", 0], ["extruder_side", 0], ["extruder_side", 1]], inCreative: true}
], "opaque");


var IC2 = false;
Callback.addCallback("ICore", function(){ IC2 = true; });

Callback.addCallback("PreLoaded", function(){
    
}

var guiExtruder = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Extruder"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 146, bitmap: "extruder_bar_background", scale: GUI_BAR_STANDART_SCALE},
        //{type: "bitmap", x: 450, y: 150, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "extruder_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        //"energyScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource": {type: "slot", x: 441, y: 75},
        "slotEnergy": {type: "slot", x: 441, y: 212},
        "slotResult": {type: "slot", x: 625, y: 142},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
});

TileEntity.registerPrototype(BlockID.extruder, {
     defaultValues: {
          someValue: 0 // сохраняемое значение someValue, по умолчанию 0
     },

     tick: function(){
          // что то сделать каждый тик, к примеру выводим someValue
          //Debug.message(this.data.someValue);
     },

     click: function(id, count, data, coords){
          //this.data.someValue = 1; // установить значение someValue на 1
     },
    
     getGuiScreen: function(){
          return guiExtruder; // при попытке открыть интерфейс, возвращаем наш объект интерфейса
     }
});
  
ICRender.getGroup("ic-wire").add(BlockID.extruder, -1);
