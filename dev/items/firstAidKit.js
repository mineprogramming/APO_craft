// First Aid Kit
IDRegistry.genItemID("firstAidKit");
Item.createItem("firstAidKit", "First Aid Kit", {name: "first_aid_kit", meta: 0}, {});

Item.registerUseFunctionForID("firstAidKit", function(){
    chemicalScale.setValue(chemicalScale.getValue() - 5);
    Player.decreaseCarriedItem();
});
