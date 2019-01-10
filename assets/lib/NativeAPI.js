LIBRARY({
    name: "NativeAPI",
    version: 1,
    shared: true,
    api: "CoreEngine"
});


var t_bool = java.lang.Boolean.TYPE;
var t_int = java.lang.Integer.TYPE;
var t_double = java.lang.Double.TYPE;

//TODO: toInt(Number);


var clazz = java.lang.Class.forName("zhekasmirnov.launcher.api.NativeAPI", true, UI.getContext().getClass().getClassLoader());

var setTileUpdateAllowed = clazz.getMethod("setTileUpdateAllowed", t_bool);
var setRespawnCoords = clazz.getMethod("setRespawnCoords", t_int, t_int, t_int);

var NativeAPI = {};

NativeAPI.setTileUpdateAllowed = function(allowed) { 
    setTileUpdateAllowed.invoke(null, allowed) 
};

NativeAPI.setRespawnCoords = function(x, y, z) { 
    setRespawnCoords.invoke(null, new java.lang.Integer(x), new java.lang.Integer(y), new java.lang.Integer(z));
}


EXPORT("NativeAPI", NativeAPI);
