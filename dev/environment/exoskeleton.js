var Exoskeleton = {};

Exoskeleton.render = new Render({skin: "mob/exoskeleton.mtl"});
(function() {
    var mesh = new RenderMesh(__dir__ + "models/exoskeleton.obj", "obj", null);
    Exoskeleton.render.getPart("body").setMesh(mesh);
})();

Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(item.id == 280){
        var animationPlane = new Animation.Base(x, y + 5, z);
        animationPlane.describe({render: Plane.render.getId()})
    }
});