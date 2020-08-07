var RandomEvents = {
    events: [],
    
    registerEvent: function(eventName, eventFrequency, eventCallback){
        this.events.push({name: eventName, frequency: eventFrequency, callback: eventCallback});
    },
    
    registerTimedEvent: function(data){
        data.enabled = false;
        this.events.push(data);
    },
    
    randomCoordsNearPlayer: function(){
        let coords = Player.getPosition();
        var x, y, z;
        
        if(Math.random() > 0.5) x = coords.x + Math.random() * 16 + 6;
        else x = coords.x - Math.random() * 16 - 6;
        
        if(Math.random() > 0.5) y = coords.y + Math.random() * 16 + 6;
        else y = coords.y - Math.random() * 16 - 6;
        
        if(Math.random() > 0.5) z = coords.z + Math.random() * 16 + 6;
        else z = coords.z - Math.random() * 16 - 6;
        
        return {"x": x, "y": y, "z": z};
    },
    
    tick: function(){
        for(var key in this.events){
            let event = this.events[key];
            
            //Timed event timers
            if(event.enabled){
                event.timeLeft -= 1;
                if(event.tick){
                    event.tick();
                }
                
                if(event.timeLeft <= 0){
                    event.disable();
                    event.enabled = false;
                }
            }
            
            //Start events
            if(Math.random() < event.frequency){
                //Handle timed event
                if(event.time){
                    if(!event.enabled){
                        event.enable();
                        event.enabled = true;
                        event.timeLeft = event.time;
                    }
                //Handle other events
                } else{
                    event.callback(event.name);
                }
            }
        }
    }
};