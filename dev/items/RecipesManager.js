var RecipesManager = {
    recipesLoaded: false,
    recipes: [],
    shapeless: [],
}

RecipesManager.addShaped = function(result, recipe, data){
    RecipesManager.recipes.push({"result": result, "recipe": recipe, "data": data});
};

RecipesManager.addShapeless = function(result, data){
    RecipesManager.shapeless.push({"result": result, "recipe": data});
}

RecipesManager.onRegisterRecipesNeeded = function(){
    if(!RecipesManager.recipesLoaded){
        RecipesManager.recipesLoaded = true;
        // Shaped
        for(var i in RecipesManager.recipes){
            let recipe = RecipesManager.recipes[i];
            Recipes.addShaped(recipe.result, recipe.recipe, recipe.data);
        }
        
        // Shapeless
        for(var i in RecipesManager.shapeless){
            let recipe = RecipesManager.shapeless[i];
            if(recipe.callback){
                Recipes.addShapeless(recipe.result, recipe.recipe, recipe.callback);
            } else {
                Recipes.addShapeless(recipe.result, recipe.recipe);
            }
        }
    }
}

RecipesManager.deleteAll = function(){
    // Shaped
    for(var i in RecipesManager.recipes){
        let recipe = RecipesManager.recipes[i];
        Recipes.deleteRecipe(recipe.result);
    }
    
    // Shapeless
    for(var i in RecipesManager.shapeless){
        let recipe = RecipesManager.shapeless[i];
        Recipes.deleteRecipe(recipe.result);
    }
}

RecipesManager.addRecipeWithCraftingTool = function(result, data, tool){
    data.push({id: tool, data: -1});
    RecipesManager.shapeless.push({"result": result, "recipe": data, "callback": function(api, field, result){
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




// Register all recipes in PostLoad for debugging or testing
if(!__config__.getBool("late_recipes_registration")){
    Callback.addCallback("PostLoaded", function(){
        RecipesManager.onRegisterRecipesNeeded();
        Logger.Log("RecipesManager", "Recipes successfully loaded!");
    });
}




