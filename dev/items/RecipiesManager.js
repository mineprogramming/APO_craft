var RecipiesManager = {
    recipiesLoaded: false,
    recipies: []
}

RecipiesManager.addShaped = function(result, recipie, data){
    RecipiesManager.recipies.push({"result": result, "recipie": recipie, "data": data});
};

RecipiesManager.onRegisterRecipiesNeeded = function(){
    if(!RecipiesManager.recipiesLoaded){
        for(var i in RecipiesManager.recipies){
            let recipie = RecipiesManager.recipies[i];
            Recipes.addShaped(recipie.result, recipie.recipie, recipie.data);
        }
    }
}