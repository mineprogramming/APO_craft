var RecipiesManager = {
    recipiesLoaded: false,
    recipies: [],
    shapeless: [],
}

RecipiesManager.addShaped = function(result, recipie, data){
    RecipiesManager.recipies.push({"result": result, "recipie": recipie, "data": data});
};

RecipiesManager.onRegisterRecipiesNeeded = function(){
    if(!RecipiesManager.recipiesLoaded){
        RecipiesManager.recipiesLoaded = true;
        // Shaped
        for(var i in RecipiesManager.recipies){
            let recipie = RecipiesManager.recipies[i];
            Recipes.addShaped(recipie.result, recipie.recipie, recipie.data);
        }
        
        // Shapeless
        for(var i in RecipiesManager.shapeless){
            let recipe = RecipiesManager.shapeless[i];
            Recipes.addShapeless(recipe.result, recipe.recipe, recipe.callback);
        }
    }
}

RecipiesManager.deleteAll = function(){
    // Shaped
    for(var i in RecipiesManager.recipies){
        let recipie = RecipiesManager.recipies[i];
        Recipes.deleteRecipe(recipie.result);
    }
    
    // Shapeless
    for(var i in RecipiesManager.shapeless){
        let recipe = RecipiesManager.shapeless[i];
        Recipes.deleteRecipe(recipe.result);
    }
}

RecipiesManager.addRecipeWithCraftingTool = function(result, data, tool){
    data.push({id: tool, data: -1});
    RecipiesManager.shapeless.push({"result": result, "recipe": data, "callback": function(api, field, result){
        for (var i in field){
            if (field[i].id == tool){
                field[i].data++;
                if (field[i].data >= CRAFTING_TOOL_MAX_DAMAGE){
                    field[i].id = field[i].count = field[i].data = 0;
                }
            }
            else {
                api.decreaseFieldSlot(i);
            }
        }
    }});
}

