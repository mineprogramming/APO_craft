/*
 APO craft
 by IchZerowan
 
 █▀▀█ ░ █▀▀█ ░ █▀▀█ ░   █▀▀ █▀▀█ █▀▀█ █▀▀ ▀▀█▀▀
 █▄▄█ ▄ █░░█ ▄ █░░█ ▄   █░░ █▄▄▀ █▄▄█ █▀▀ ░░█░░
 ▀░░▀ █ █▀▀▀ █ ▀▀▀▀ █   ▀▀▀ ▀░▀▀ ▀░░▀ ▀░░ ░░▀░░
 
 You are not welcome here!
*/

IMPORT("dimensions");
IMPORT("ScalesRPG");
IMPORT("NativeAPI");
IMPORT("SettingsManager");
IMPORT("EntityState");
IMPORT("ThirstLib");
IMPORT("DevAPI");
IMPORT("energylib");

const DIRECTION_X = 0;
const DIRECTION_Z = 1;
const DIRECTION_BOTH = 2;

var GUI_BAR_STANDART_SCALE = 3.2;

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);


function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function srand(seed){
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
}

