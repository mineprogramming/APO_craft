var ICore = false;
ModAPI.addAPICallback("ICore", function(api){ 
    ICore = api;
    
    //Scrap from Waste
    RecipiesManager.addShaped({id: ItemID.scrap, count: 1, data: 0}, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.waste, 0]);

});