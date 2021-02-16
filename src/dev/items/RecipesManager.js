var RecipesManager = {
    recipesLoaded: false,
    recipes: [],
    shapeless: [],
}

RecipesManager.RecipeException = function(result, data){
    this.result = result;
    this.data = data;
    this.toString = function(){
        return "Invalid recipe entry in recipe: " + JSON.stringify(data) + " => " + JSON.stringify(result);
    }
}

RecipesManager.addShaped = function(result, recipe, data){
    // Check everything and throw exceptions if found any
    if(!result.id){
        throw new RecipesManager.RecipeException(result, data);
    }
    
    for(var i = 0; i < data.length; i+=3){
        if(!data[i]){
            throw new RecipesManager.RecipeException(result, data);
        }
    }
    
    RecipesManager.recipes.push({"result": result, "recipe": recipe, "data": data});
};

RecipesManager.addShapeless = function(result, data){
    // Check everything and throw exceptions if found any
    if(!result.id){
        throw new RecipesManager.RecipeException(result, data);
    }
    
    for(var i in data){
        if(!data[i].id){
            throw new RecipesManager.RecipeException(result, data);
        }
    }
    
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
        Logger.Log("Recipes successfully loaded!", "RecipesManager");
    });
}