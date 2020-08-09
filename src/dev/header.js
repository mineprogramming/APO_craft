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
 *MaXFeeD
 *NikolaySavenko
 *Nikich21
 
*/

IMPORT("DimensionUtils");
IMPORT("ScalesRPG");
IMPORT("NativeAPI");
IMPORT("SettingsManager");
IMPORT("EntityState");
IMPORT("ThirstLib");
IMPORT("energylib");
IMPORT("TradeLib");
IMPORT("Inventory");
IMPORT("ChargeItem");
IMPORT("AdvancedAI");

const DIRECTION_X = 0;
const DIRECTION_Z = 1;
const DIRECTION_BOTH = 2;

const CUSTOM_BLOCK_IDS_OFFSET = 8192;
const BUILDINGS_COUNT = 45;

var GUI_BAR_STANDART_SCALE = 3.2;
var CRAFTING_TOOL_MAX_DAMAGE = 96;
var ENTITIES_MAX_COUNT = 23;

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
var ctx = UI.getContext();

var BLOCK_LIGHT_O = Block.createSpecialType({
    lightlevel: 7,
    opaque: true
});

var BLOCK_HARD = Block.createSpecialType({
    explosionres: 2000
});

var DEBUG = __config__.getBool("debug_mode");
var inCity = false;

Saver.addSavesScope("inCity", 
    function read(scope){
        if(__config__.getBool("late_recipes_registration")){
            if(!scope.inCity){
                RecipesManager.deleteAll();
                return;
            }else{
                RecipesManager.onRegisterRecipesNeeded();
            }
        }
        
        inCity = scope.inCity;
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
        }catch(e){
            Game.message(e);
        }}
    }));
}