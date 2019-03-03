var Mutant = new Mob({
    id: "mutant",
    name: "Mutant",
    texture: "mob/mutant.png",
    aiTypes: { 
        wander: { 
            type: EntityAI.Wander,
            priority: 4,
            speed: 0.09,
            angular_speed: 0.1,
            delay_weigth: 0.2
        },
        
        follow: { 
            type: EntityAI.Follow,
            priority: 0,
            speed: 0.17,
            rotateHead: true
        },
        
        attack: { 
            type: EntityAI.Attack,
            priority: 0
        }, 
        
        enemy_watcher: {
            type: AdvancedAI.EnemyWatcher,
            attackAI: "attack",
            followAI: "follow",
            find_delay: 20,
            priority_on_attack: 5,
            priority_on_idle: 0,
            feelingModifier: 18
        },
        
        swim: { 
            type: EntityAISwim,
        },
    },
    loot: GLOBAL_LOOT
});