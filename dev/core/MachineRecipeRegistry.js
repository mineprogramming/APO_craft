
/** Simple object used to store recipes for different  */

MachineRecipeRegistry = {
    recipeData: {},
    
    /**
     * @param {string} name Machine name used to identify machine
     * @param {Object[]} data Array of Recipes
     * @param {Object|Object[]} data[].source 
    */
    registerRecipesFor: function(name, data){
        this.recipeData[name] = data;
    },
    
    addRecipeFor: function(name, source, result){
        this.requireRecipesFor(name, true).push({"source": source, "result": result});
    },
    
    requireRecipesFor: function(name, createIfNotFound){
        if(!this.recipeData[name] && createIfNotFound){
            this.recipeData[name] = {};
        }
        return this.recipeData[name];
    },
    
    getRecipeResult: function(name, source){
        var data = this.requireRecipesFor(name);
        if(data){
            if(Array.isArray(source)){
                // Several objects
                for(var i in data){
                    let dataSource = data[i].source;
                    if(Array.isArray(dataSource)){
                        if(dataSource.length != source.length){
                            continue;
                        }
                        for(var i in source){
                            if(this.compareObjects(source[i], dataSource[i])){
                                return data[i].result;
                            }
                        }
                    }
                }
            } else {
                // Single object
                for(var i in data){
                    let dataSource = data[i].source;
                    if(!Array.isArray(dataSource) && this.compareObjects(dataSource, source)){
                        return data[i].result;
                    }
                }
            }
            
        }
    },
    
    compareObjects: function(obj1, obj2){
        return obj1.id == obj2.id && obj1.data == obj2.data;
    }
}