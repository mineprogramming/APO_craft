LIBRARY({
    name: "ScalesRPG",
    version: 1,
    shared: true,
    api: "CoreEngine"
});


var elements = {};

var window = new UI.Window({
    location: {
        fullscreen: true
    },
    "elements": elements,
    drawing: [
        {type: "background", color: android.graphics.Color.TRANSPARENT}
    ]
});

window.setTouchable(false);
window.setAsGameOverlay(false);

var container = new UI.Container();

var scales = [];

var ScalesRPG = {
    Scale: function(parameters){
        var shown = false;
        var value;
        if(parameters == undefined){
            this.right = false;
            value = 20;
        }else{
            this.right = (parameters.right == undefined)? false: parameters.right;
            value = parameters.value == undefined? 20: parameters.value;
        }
        
        var position = this.right? 
            scales.filter(function(scale){return scale.right;}).length + 2:
            scales.filter(function(scale){return !scale.right;}).length + 4;
        
        var index = scales.push(this) - 1;
        
        this.setValue = function(_value){
            value = _value;
            if(elements["img" + index + "_0"] == null)
                return;
            var countFull = Math.trunc(value/2);
            var countHalf = value%2;
            if(container.isOpened()){
                //Draw right-side scales
                if(this.right){
                    var i = 9;
                    for(; i > 9 - countFull; i--){
                        elements["img" + index + "_" + i].bitmap = parameters.textures.full;
                    }
                    for(; i > 9 - countHalf - countFull; i--){
                        elements["img" + index + "_" + i].bitmap = parameters.textures.half;
                    }
                    for(; i >= 0; i--){
                        elements["img" + index + "_" + i].bitmap = parameters.textures.empty;
                    }
                } 
                //Draw left-side scales
                else {
                    var i = 0;
                    for(; i < countFull; i++){
                        elements["img" + index + "_" + i].bitmap = parameters.textures.full;
                    }
                    for(; i < countHalf + countFull; i++){
                        elements["img" + index + "_" + i].bitmap = parameters.textures.half;
                    }
                    for(; i < 10; i++){
                        elements["img" + index + "_" + i].bitmap = parameters.textures.empty;
                    }
                }
            }
        }
        
        this.getValue = function(){
            return value;
        }
        
        this.increase = function(){
            this.setValue(++value);
        }
        this.decrease = function(){
            this.setValue(--value);
        }
        
        this.reset = function(){
            this.setValue(20);
        }
        
        this.show = function(){
            if(!inGame || shown) return;
            if(!container.isOpened()){
                container.openAs(window);
            }
            for(var i = 0; i < 10; i++){
                elements["img" + index + "_" + i] = {
                    type: "image", 
                    x: this.right? 807 + i * 19: 4 + i * 19, 
                    y: 27 * position, 
                    bitmap: parameters.textures.full, 
                    scale: 0.792
                };
            }
            this.setValue(value);
            shown = true;
        }
        
        this.isShown = function(){
            return shown;
        }
        
        this.hide = function(){
            if(!shown) return;
            for(var i = 0; i < 10; i++){
                elements["img" + index + "_" + i] = null;
            }
            shown = false;
        }
    },
    
    resetAll: function(){
        for(var i in scales){
            scales[i].reset();
        }
    },
    
    showAll: function(){
        if(!container.isOpened()){
            container.openAs(window);
        }
        for(var i in scales){
            scales[i].show();
        }
    },
    
    hideAll: function(){
        for(var i in scales){
            scales[i].hide();
        }
        container.close();
    },
}

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "hud_screen" || 
      screenName == "in_game_play_screen"){
        inGame = true;
    }
    else{
        inGame = false;
        ScalesRPG.hideAll();
    }
});

EXPORT("ScalesRPG", ScalesRPG);




