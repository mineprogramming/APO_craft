LIBRARY({
    name: "TradeLib",
    version: 1,
    shared: true,
    api: "CoreEngine"
});

/*Requires textures:
 * arrow_right
 * arrow_right_down
 * small_arrow_left
 * small_arrow_left_down
 * small_arrow_right
 * small_arrow_right_down
*/

var GUI_BAR_STANDART_SCALE = 3.2;
var getPointed = ModAPI.requireGlobal("Player.getPointed");
var check_time = 5;


var traders = [];
var currentGoods = [];
var currentGood = 0;

var container = new UI.Container();
var containerButton = new UI.Container();

function process(){
    var source0 = container.getSlot("slotSource0");
    var source1 = container.getSlot("slotSource1");
    var result0 = container.getSlot("slotResult0");
    
    var good = currentGoods[currentGood];
    
    if(source0.id == good.price[0].id
            && source0.data == good.price[0].data
            && source0.count >= good.price[0].count
            
            && source1.id == good.price[1].id
            && source1.data == good.price[1].data
            && source1.count >= good.price[1].count
            
            && ((result0.id == good.good.id
            && result0.data == good.good.data
            && result0.count + good.good.count <= 64)
            || result0.id == 0)){
        source0.count -= good.price[0].count;
        source1.count -= good.price[1].count;
        result0.id = good.good.id;
        result0.data = good.good.data;
        result0.count += good.good.count;
    }
}

function next(){
    currentGood++;
    if(currentGood >= currentGoods.length){
        currentGood = 0;
    }
    load();
}

function previous(){
    currentGood--;
    if(currentGood < 0){
        currentGood = currentGoods.length - 1;
    }
    load();
}

function load(){
    var source0 = container.getSlot("iconSource0");
    var source1 = container.getSlot("iconSource1");
    var result0 = container.getSlot("iconResult0");
    
    var good = currentGoods[currentGood];
    
    source0.id = good.price[0].id;
    source0.count = good.price[0].count;
    source0.data = good.price[0].data;
    
    source1.id = good.price[1].id;
    source1.count = good.price[1].count;
    source1.data = good.price[1].data;
    
    result0.id = good.good.id;
    result0.count = good.good.count;
    result0.data = good.good.data;
    
    container.validateAll();
}

var window = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Trading"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 665, y: 100, bitmap: "arrow_right", scale: GUI_BAR_STANDART_SCALE},
        
    ],
    
    elements: {
        "slotSource0": {type: "slot", x: 450, y: 200},
        "iconSource0": {type: "slot", x: 450, y: 100, visual: true, bitmap: "empty", isTransparentBackground:true},
        "slotSource1": {type: "slot", x: 520, y: 200},
        "iconSource1": {type: "slot", x: 520, y: 100, visual: true, bitmap: "empty", isTransparentBackground:true},
        "slotResult0": {type: "slot", x: 800, y: 200},
        "iconResult0": {type: "slot", x: 800, y: 100, visual: true, bitmap: "empty", isTransparentBackground:true},

        "buttonProcess": {type: "button", x: 665, y: 205, 
            bitmap: "arrow_right", bitmap2: "arrow_right_down", 
            scale: GUI_BAR_STANDART_SCALE, clicker: { onClick: process }},
        "btnPrev": {type: "button", x: 390, y: 100, 
            bitmap: "small_arrow_left", bitmap2: "small_arrow_left_down", 
            scale: GUI_BAR_STANDART_SCALE, clicker: { onClick: previous }},
        "btnNext": {type: "button", x: 900, y: 100, 
            bitmap: "small_arrow_right", bitmap2: "small_arrow_right_down", 
            scale: GUI_BAR_STANDART_SCALE, clicker: { onClick: next }},
    }
});
    
var button = new UI.Window({
    location: {
        x:450,
        y:400,
        width:100,
        height:50
    },
    elements: {
        "0": {type: "button", x: 0, y: 0, bitmap: "btnTrade", scale: 30, clicker: {
            onClick: function(){
                containerButton.close();
                container.openAs(window);
                currentGood = 0;
                load();
            }
        }}
    },
    drawing: [
        {type: "background", color: android.graphics.Color.TRANSPARENT}
    ]
});
button.setAsGameOverlay(true);


var TradeLib = {};

Callback.addCallback("tick", function(){
    if (World.getThreadTime() % check_time === 0) {
        let pointedEntity = getPointed().entity;
        let custom = Entity.getCustom(pointedEntity);
        if(custom){
            let nameId = custom.nameId;
            let found = false;
            for(var name in traders){
                if(name == nameId){
                    currentGoods = traders[name].goods;
                    currentGoods = traders[name].goodsChooser(currentGoods, pointedEntity);
                    if(!containerButton.isOpened() && !container.isOpened()){
                        containerButton.openAs(button);
                    }
                    found = true;
                }
            }
            if(!found){
                containerButton.close();
            }
        } else {
            containerButton.close();
        }
    }
});


TradeLib.registerTrader = function(nameId, goods, goodsChooser){
    for(var i in goods){
        if(!Array.isArray(goods[i].price)){
            goods[i].price = [goods[i].price, {id: 0, data: 0, count: 0}];
        }
    }
    traders[nameId] = {"goods": goods, "goodsChooser": goodsChooser? goodsChooser: function(goods, entity){return goods;}};
}


EXPORT("TradeLib", TradeLib);


