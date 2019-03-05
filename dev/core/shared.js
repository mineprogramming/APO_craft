ModAPI.registerAPI("APO", {
    // Module used to register guns
    GunRegistry: GunRegistry,
    
    // Module used to register new machines that are fully compatible with A.P.O.
    MachineEssentials: MachineEssentials,
    
    // Module used to register recipes for A.P.O. machines and your own machines registered using MachineEssentials
    MachineRecipeRegistry: MachineRecipeRegistry,
    
    // Class representing the armor your mob can wear
    ArmorSet: ArmorSet,
    
    // Class that is used to register new mobs and spawn them
    CustomMob: Mob,
    
    // Module used to register periodic in-game events happening in A.P.O. City
    RandomEvents: RandomEvents,
    
    // Module used to add mod-related recipes for late registration
    RecipesManager: RecipesManager
});

Logger.Log("A.P.O. Craft API shared with name \"APO\"", "API");