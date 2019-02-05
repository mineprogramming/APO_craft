/*
 APO craft
 by IchZerowan
 
 █▀▀█ ░ █▀▀█ ░ █▀▀█ ░   █▀▀ █▀▀█ █▀▀█ █▀▀ ▀▀█▀▀
 █▄▄█ ▄ █░░█ ▄ █░░█ ▄   █░░ █▄▄▀ █▄▄█ █▀▀ ░░█░░
 ▀░░▀ █ █▀▀▀ █ ▀▀▀▀ █   ▀▀▀ ▀░▀▀ ▀░░▀ ▀░░ ░░▀░░
 
 You are not welcome here!
 
 Contributors:
 *IchZerowan
 *Urpanium
 *DansTS
 *TsnZephy
 *SDesya74
 *AlexSocol
 
*/

IMPORT("dimensions");
IMPORT("ScalesRPG");
IMPORT("NativeAPI");
IMPORT("SettingsManager");
IMPORT("EntityState");
IMPORT("ThirstLib");
IMPORT("DevAPI");
IMPORT("energylib");
IMPORT("TradeLib");
IMPORT("Inventory");
IMPORT("ChargeItem");
IMPORT("AdvancedAI");

const DIRECTION_X = 0;
const DIRECTION_Z = 1;
const DIRECTION_BOTH = 2;

var GUI_BAR_STANDART_SCALE = 3.2;
var CRAFTING_TOOL_MAX_DAMAGE = 96;

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var ctx = UI.getContext();


var BLOCK_LIGHT = Block.createSpecialType({
    lightlevel: 7,
    opaque: false
});

var BLOCK_LIGHT_O = Block.createSpecialType({
    lightlevel: 7,
    opaque: true
});

var BLOCK_LOW_LIGHT = Block.createSpecialType({
    lightlevel: 9,
    opaque: true});

var BLOCK_LOWEST_LIGHT = Block.createSpecialType({
    lightlevel: 4,
    opaque: true});


var inCity = false;

Saver.addSavesScope("inCity", 
    function read(scope){
        if(!scope.inCity) {
            RecipiesManager.deleteAll();
            return;
        }
        inCity = scope.inCity;
        RecipiesManager.onRegisterRecipiesNeeded();
    },

    function save(){
        return {inCity: inCity};
    }
);



/* Just some useful functions */

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function srand(seed){
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
}

function getSideCoords(coords){
    return [
        {x: coords.x, y: coords.y + 1, z: coords.z},
        {x: coords.x, y: coords.y - 1, z: coords.z},
        {x: coords.x + 1, y: coords.y, z: coords.z},
        {x: coords.x - 1, y: coords.y, z: coords.z},
        {x: coords.x, y: coords.y, z: coords.z + 1},
        {x: coords.x, y: coords.y, z: coords.z - 1},
    ];
}

function runAsUI(func){
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            func();
        }catch(err){
            Game.message(err);
            alert(err);
        }}
    }));
}
