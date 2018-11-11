//Glock 18
IDRegistry.genItemID("glock18");
Item.createItem("glock18", "Glock 18", {name: "glock_18", meta: 0}, {
    stack: 1
});

//Bullet 9*19
IDRegistry.genItemID("bullet_9_19");
Item.createItem("bullet_9_19", "Bullet 9*19", {name: "bullet_9_19", meta: 0}, {});


var bullets = [];
var hurt = [];

function shoot(){
    for(var i = 0; i < 36; i++){
        let slot = Player.getInventorySlot(i);
        if(slot.id == ItemID.bullet_9_19){
            slot.count--;
            Player.setInventorySlot(i, slot.id, slot.count, slot.data);
            let coords = Entity.getPosition(Player.get());
            let lookAngle = Entity.getLookAngle(Player.get()); 
            let velocity = {
                x: -Math.sin(lookAngle.yaw) * 8,
                y: Math.sin(lookAngle.pitch) * 8,
                z: Math.cos(lookAngle.yaw) * 8
            }
            let entity = Entity.spawn(coords.x, coords.y, coords.z, 80);
            bullets.push({"entity": entity, damage: 50});
            Entity.setSkin(entity, "mob/bullet.png");
            Entity.setVelocity(entity, velocity.x, velocity.y, velocity.z);
            return;
        }
    }
}

Item.registerNoTargetUseFunction("glock18", shoot);
Item.registerUseFunction("glock18", shoot);

Callback.addCallback("ProjectileHit", function (projectile, item, target) {
    bullets = bullets.filter(function(bullet){
        if(bullet.entity == projectile){
            Entity.remove(projectile);
            if(target.entity != -1){
                hurt.push({entity: target.entity, damage: bullet.damage});
            }
            return false;
        }
        return true;
    });
});

Callback.addCallback("EntityHurt", function(attacker, victim, damage){
    var entity = -1;
    hurt = hurt.filter(function(entity){
        if(entity.entity == victim){
            entity = entity.entity;
            return false;
        }
    });
    if(entity != -1){
        Entity.damageEntity(entity.entity, entity.damage);
        Game.prevent();
    }
    return true;
});



var ctx = UI.getContext();

function runAsUI(func){
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            func();
        }catch(err){
            Game.message(err);
            alert(err);
        }}
    }));
}


var windowAim;
var aimShown = false;
var inGame = false;

runAsUI(function(){
    //Main layout of the whole window
    var layoutMain = new LinearLayout(ctx);
    layoutMain.setOrientation(0);
    layoutMain.setGravity(Gravity.CENTER);
    
    var params = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
    layoutMain.setLayoutParams(params);
    
    var image = new android.widget.ImageView(ctx);
    image.setImageBitmap(BitmapFactory.decodeFile(__dir__ + "gui/aim.png"));
    layoutMain.addView(image);
    
    //Popup Window for displaying the staff
    windowAim = new android.widget.PopupWindow(layoutMain, LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
    windowAim.setTouchable(false);
    windowAim.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
});



function showAim(){
    if(aimShown) return;
    runAsUI(function(){
        aimShown = true;
        windowAim.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT | Gravity.TOP, 0, 0);
    });
}

function hideAim(){
    if(!aimShown) return;
    runAsUI(function(){
        windowAim.dismiss();
        aimShown = false;
    });
}


Callback.addCallback("tick", function(){
    if (World.getThreadTime() % 5 === 0) {
        let carried = Player.getCarriedItem();
        if(carried.id == ItemID.glock18){
            showAim();
        } else {
            hideAim();
        }
    }
});

Callback.addCallback("NativeGuiChanged", function (screenName) {
    if(screenName == "hud_screen" || 
      screenName == "in_game_play_screen"){
        inGame = true;
    }
    else{
        inGame = false;
    }
});

