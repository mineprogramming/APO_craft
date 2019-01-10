var RecipiesManager = {
    recipiesLoaded: false,
    recipies: []
}

RecipiesManager.addShaped = function(result, recipie, data){
    RecipiesManager.recipies.push({"result": result, "recipie": recipie, "data": data});
};

RecipiesManager.onRegisterRecipiesNeeded = function(){
    if(!RecipiesManager.recipiesLoaded){
        RecipiesManager.recipiesLoaded = true;
        for(var i in RecipiesManager.recipies){
            let recipie = RecipiesManager.recipies[i];
            Recipes.addShaped(recipie.result, recipie.recipie, recipie.data);
        }
    }
}

RecipiesManager.deleteAll = function(){
    for(var i in RecipiesManager.recipies){
        let recipie = RecipiesManager.recipies[i];
        Recipes.deleteRecipe(recipie.result);
    }
    
}

