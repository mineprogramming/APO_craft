/**
 * This library includes some of the "dimensions" library functionality that was
 * not implemented in Inner Core for Horizon API.
 * 
 * Original library author: Zheka Smirnov
 * Inner Core for Horizon adaptation: Ich Zerowan
 */


 LIBRARY({
    name: "DimensionUtils",
    version: 1,
    shared: true,
    api: "CoreEngine"
});


Callback.addCallback("tick", function() {
    if (World.getThreadTime() % 10 == 0) {
        PortalRegistry.tick();
    }
});


var PortalRegistry = {
    PORTAL_BLOCK_TYPE: Block.createSpecialType({
            base: 90,
            lightlevel: 15,
            rendertype: 0,
            renderlayer: 1,
            explosionres: 9999
        }, "custom-portal"),
    
    portalBlocks: {
        
    },
    
    lastTickPortal: null,
    
    getPortalForBlock: function(id) {
        return this.portalBlocks[id];
    },
    
    getPortalForEntityPos: function(pos) {
        var x = Math.floor(pos.x);
        var y = Math.floor(pos.y);
        var z = Math.floor(pos.z);
        return this.getPortalForBlock(World.getBlockID(x, y, z)) || this.getPortalForBlock(World.getBlockID(x, y - 1, z));
    },
    
    tick: function() {
        var pos = Player.getPosition();
        if (pos.y > 255) {
            return;
        }
        
        var portal = this.getPortalForEntityPos(pos);
        if (portal) {
            if (!this.lastTickPortal) {
                this.lastTickPortal = portal;
                portal.startTransfer();
            }
        }
        else {
            this.lastTickPortal = null;
        }
    },
    
    registerPortalBlock: function(id, portal) {
        var id = Block.getNumericId(id);
        if (id != -1) {
            if (portal) {
                this.portalBlocks[id] = portal;
            }
            else {
                delete this.portalBlocks[id];
            }
        }
    },
    
    RENDER_TYPE_FULL: "full",
    RENDER_TYPE_VERTICAL_PLANE: "v-plane",
    RENDER_TYPE_HORIZONTAL_PLANE: "h-plane",
    RENDER_TYPE_UNIVERSAL_PLANE: "u-plane",
    
    setupPortalBlock: function(id, texture, portalRenderParams) {
        id = Block.getNumericId(id);
        if (id == -1) {
            return;
        }
        
        var render = new ICRender.Model();
        var group = ICRender.getGroup("custom-portal-block-" + id);
        
        if (!portalRenderParams.ignoreSelf) {
            group.add(id, -1);
        }
        if (portalRenderParams.frameId) {
            group.add(portalRenderParams.frameId, -1);
        }
        
        
        if (portalRenderParams.type == this.RENDER_TYPE_FULL) {
            render.addEntry(BlockRenderer.createTexturedBlock(texture));
        }
        else if (portalRenderParams.type == this.RENDER_TYPE_HORIZONTAL_PLANE) {
            render.addEntry(BlockRenderer.createTexturedBox(0, .375, 0, 1, .625, 1, texture));
        }
        else if (portalRenderParams.type == this.RENDER_TYPE_VERTICAL_PLANE) {
            var xAxis = BlockRenderer.createTexturedBox(0, 0, .375, 1, 1, .625, texture);
            var zAxis = BlockRenderer.createTexturedBox(.375, 0, 0, .625, 1, 1, texture);
            
            render.addEntry(xAxis).setCondition(ICRender.NOT(
                ICRender.OR(
                    ICRender.BLOCK(0, 0, 1, group, false),
                    ICRender.BLOCK(0, 0, -1, group, false)
                )
            ));
            
            render.addEntry(zAxis).setCondition(ICRender.OR(
                ICRender.BLOCK(0, 0, 1, group, false),
                ICRender.BLOCK(0, 0, -1, group, false)
            ));
        }
        else if (portalRenderParams.type == this.RENDER_TYPE_UNIVERSAL_PLANE) {
            var xAxis = BlockRenderer.createTexturedBox(0, 0, .375, 1, 1, .625, texture);
            var yAxis = BlockRenderer.createTexturedBox(0, .375, 0, 1, .625, 1, texture);
            var zAxis = BlockRenderer.createTexturedBox(.375, 0, 0, .625, 1, 1, texture);
            
            render.addEntry(xAxis).setCondition(ICRender.NOT(
                ICRender.OR(
                    ICRender.BLOCK(0, 0, 1, group, false),
                    ICRender.BLOCK(0, 0, -1, group, false)
                )
            ));
            
            render.addEntry(zAxis).setCondition(ICRender.AND(
                ICRender.OR(
                    ICRender.BLOCK(0, 0, 1, group, false),
                    ICRender.BLOCK(0, 0, -1, group, false)
                ),
                ICRender.NOT(
                    ICRender.AND(
                        ICRender.BLOCK(1, 0, 0, group, false),
                        ICRender.BLOCK(-1, 0, 0, group, false),
                        ICRender.BLOCK(0, 0, 1, group, false),
                        ICRender.BLOCK(0, 0, -1, group, false)
                    )
                )
            ));
            
            render.addEntry(yAxis).setCondition(ICRender.AND(
                ICRender.BLOCK(1, 0, 0, group, false),
                ICRender.BLOCK(-1, 0, 0, group, false),
                ICRender.BLOCK(0, 0, 1, group, false),
                ICRender.BLOCK(0, 0, -1, group, false)
            ));
        }
        else {
            Logger.Log("invalid portal block render type: " + portalRenderParams.type, "ERROR");
            return;
        }
        
        
        BlockRenderer.setStaticICRender(id, -1, render);
    },
    
    newPortalBlock: function(id, texture, portal, portalRenderParams, debugEnabled) {
        IDRegistry.genBlockID(id);
        
        if (texture && typeof(texture[0]) == "string") {
            texture = [texture];
        }
        
        Block.createBlock(id, [
            {name: "tile.portal." + id, texture: texture, inCreative: debugEnabled}
        ], this.PORTAL_BLOCK_TYPE);
        
        var shape = new ICRender.CollisionShape();
        BlockRenderer.setCustomCollisionShape(Block.getNumericId(id), -1, shape); 
        Block.setDestroyTime(Block.getNumericId(id), -1, -1);
        
        if (portal) {
            this.registerPortalBlock(id, portal);
        }
        
        if (portalRenderParams) {
            this.setupPortalBlock(id, texture, portalRenderParams);
        }
    }
};



function Portal(dimension) {
    this.dimension = dimension;
    this.timeout = 0;
    this.overlay = null;
    this.interruptible = true;
    
    this.setTimeout = function(t) {
        this.timeout = t;
    }
    
    this.setOverlay = function(overlay) {
        this.overlay = overlay;
    }
    
    this.setInterruptible = function(b) {
        this.interruptible = b;
    }
    
    this.isIdle = function() {
        return !this.isTransferInProgress();
    }
    
    this.cancelTransfer = function() {
        if (this.interruptible) {
            this.isTransferCancelled = true;
            if (this.overlay) {
                this.overlay.fade();
            }
        }
    }
    
    this.onTransferRequested = function() {
        return true;
    }
    
    this.onTransferStarted = function() {
        if (this.overlay) {
            this.overlay.setAlpha(0);
            this.overlay.open();
        }
    }
    
    this.onTransferInProgress = function(progress) {
        if (this != PortalRegistry.getPortalForEntityPos(Player.getPosition())) {
            this.cancelTransfer();
        }
        
        if (this.overlay) {
            this.overlay.setAlpha(progress / this.timeout);
        }
        
        return progress >= this.timeout;
    }
    
    this.onTransferComplete = function(progress) {
        Dimensions.transfer(Player.get(), this.dimension == Player.getDimension()? 0: this.dimension);
    }
    
    this.setCallback = function(name, callback) {
        var validCallbacks = ["onTransferRequested", "onTransferStarted", "onTransferInProgress", "onTransferComplete"];
        
        var isValid = false;
        for (var i in validCallbacks) {
            if (validCallbacks[i] == name) {
                isValid = true;
                break;
            }
        }
        
        if (isValid) {
            this[name] = callback;
        }
        else {
            Logger.Log("invalid portal callback name: " + name + " required: " + validCallbacks, "ERROR");
        }
    }
    
    
    
    this.transferUpdatable = null;
    
    this.isTransferInProgress = function() {
        return this.transferUpdatable != null;
    }
    
    this.startTransfer = function() {
        if (this.isTransferInProgress()) {
            return false;
        }
        
        if (!this.onTransferRequested()) {
            return false;
        }
        
        this.isTransferCancelled = false;
        this.transferUpdatable = {
            portal: this,
            progress: 0,
            
            finish: function() {
                this.remove = true;
                this.portal.transferUpdatable = null;
            },
            
            update: function() {
                if (this.progress == 0) {
                    this.portal.onTransferStarted();
                }
                if (this.portal.onTransferInProgress(this.progress)) {
                    if (!this.portal.isTransferCancelled && this.portal.onTransferComplete(this.progress)) {
                        this.finish();
                    }
                }
                if (this.portal.isTransferCancelled) {
                    this.finish();
                    this.portal.isTransferCancelled = false;
                }
                
                this.progress++;
            }
        };
        
        Updatable.addUpdatable(this.transferUpdatable);
        return true;
    }
}



function DimensionTransfer(dimension) {
    this.dimension = dimension;
    this.overlay = null;
    this.idle = true;
    
    var self = this;
    this.handler = {
        transfer: this,
        dimension: this.dimension,
        
        portalBlockId: -1,
        frameBlockId: -1,
        portalSearchRadius: 5,
        
        start: function() {
            self.idle = false;
        },
        
        progress: function() {
            
        },
        
        correctPosition: function(pos) {
            if (this.portalBlockId > 0) {
                var portalPos = DimensionHelper.searchForPortal(pos, this.portalBlockId, {radius: this.portalSearchRadius});
                if (portalPos) {
                    var correctedPos = DimensionHelper.adjustPlayerInPortal(portalPos, this.portalBlockId, {frameId: this.frameBlockId});
                    pos.x = Math.floor(correctedPos.x) + .5;
                    pos.y = correctedPos.y;
                    pos.z = Math.floor(correctedPos.z) + .5;
                    self.idle = true;
                    return true;
                }
            }
            
            return false;
        },
        
        buildPortal: function(pos) {
            if (self.portalBuilder) {
                self.portalBuilder(pos);
            }
            self.idle = true;
        }
    };
    
    this.setPortalTiles = function(portalId, frameId) {
        this.handler.portalBlockId = portalId || -1;
        this.handler.frameBlockId = frameId || -1;
    }
    
    this.setHandlerCallback = function(name, callback) {
        this.handler[name] = callback;
    }
    
    this.setPortalSearchRadius = function(radius) {
        this.transfer.portalSearchRadius = radius;
    }
    
    this.setOverlay = function(overlay) {
        this.overlay = overlay;
    }
    
    this.isIdle = function() {
        return this.idle;
    }
    
    this.setPortalBuilder = function(builder) {
        this.portalBuilder = builder;
    }
}



function TransferSequence(dimension) {
    this.dimension = dimension;
     
    this.portal = new Portal(dimension);
    this.transfer = new DimensionTransfer(dimension);    
    
    this.getPortal = function() {
        return this.portal;
    }
    
    this.getTransfer = function() {
        return this.transfer;
    }
    
    this.setPortalCallback = function(name, callback) {
        this.portal.setCallback(name, callback);
    }
    
    this.setUiCallback = function(name, callback) {
        this.transfer.setUiCallback(name, callback);
    }
    
    this.setHandlerCallback = function(name, callback) {
        this.transfer.setHandlerCallback(name, callback);
    }
    
    
    this.portalId = -1;
    this.frameId = -1;
    
    this.setPortalTiles = function(portalId, frameId) {
        this.transfer.setPortalTiles(portalId, frameId);
        this.portalId = portalId;
        this.frameId = frameId;
    }
    
    this.setPortalSearchRadius = function(radius) {
        this.transfer.setPortalSearchRadius(radius);
    }
    
    this.setPortalTimeout = function(timeout) {
        this.portal.setTimeout(timeout);
    }
    
    this.setPortalOverlay = function(overlay) {
        this.portal.setOverlay(overlay);
        this.transfer.setOverlay(overlay);
    }
    
    this.setPortalBuilder = function(builder) {
        this.transfer.setPortalBuilder(builder);
    }
    
    this.setLoadingScreenParams = function(params) {
        this.transfer.setLoadingScreenParams(params);
    }
    
    this.setInterruptible = function(b) {
        this.portal.setInterruptible(b);
    }
    
    this.isIdle = function() {
        return this.portal.isIdle() && this.transfer.isIdle();
    }
    
    this.startTransfer = function() {
        if (!this.isIdle()) {
            this.portal.startTransfer();
        }
    }
}


function PortalShape() {
    this.minWidth = 1;
    this.minHeight = 1;
    
    this.spaceIds = {0: true};
    this.frameIds = {};
    this.buildIds = {
        portal: -1,
        frame: -1
    };
    
    this.orientation = {
        vertical: true,
        horizontal: true
    };
    
    
    
    this.setMinSize = function(w, h) {
        this.minWidth = w;
        this.minHeight = h;
    }
    
    this.setPortalId = function(id) {
        this.buildIds.portal = id;
        this.spaceIds[id] = true;
    }
    
    this.setFrameIds = function() {
        this.frameIds = {};
        
        for (var i in arguments) {
            var id = parseInt(arguments[i]);
            this.frameIds[id] = true;
            if (i == 0) {
                this.buildIds.frame = id;
            }
        }
    }
    
    this.setSpaceIds = function() {
        this.spaceIds = {0: true};
        
        for (var i in arguments) {
            var id = parseInt(arguments[i]);
            this.spaceIds[id] = true;
        }
    }
    
    this.setVertical = function(b) {
        this.orientation.vertical = b;
    }
    
    this.setHorizontal = function(b) {
        this.orientation.horizontal = b;
    }
    
    
    
    this.isFrameTileAt = function(x, y, z) {
        return this.frameIds[World.getBlockID(x, y, z)];
    }
    
    this.isSpaceTileAt = function(x, y, z) {
        return this.spaceIds[World.getBlockID(x, y, z)];
    }
    
    this._searchForFrameTile = function(x, y, z, ax, ay, az) {
        var len = 0;
        while(!this.isFrameTileAt(x, y, z)) {
            x += ax;
            y += ay;
            z += az;
            len++;
            if (len > 16) {
                return -1;
            }
        }
        return len;
    }
    
    this._buildRect = function(pos, raw) {
        if (raw.minX != -1 && raw.minY != -1 && raw.maxX != -1 && raw.maxY != -1) {
            var rect = {
                minX: -raw.minX,
                maxX: raw.maxX + 1,
                minY: -raw.minY,
                maxY: raw.maxY + 1,
                plane: raw.plane,
                
                width: function() {
                    return this.maxX - this.minX;
                },
                
                height: function() {
                    return this.maxY - this.minY;
                },
                
                offset: pos,
            };
            
            switch(rect.plane) {
                case "oX":
                rect.convert = function(x, y, z) {
                    return {
                        x: this.offset.x + (z || 0),
                        y: this.offset.y + y,
                        z: this.offset.z + x
                    }
                }
                break;
                case "oY":
                rect.convert = function(x, y, z) {
                    return {
                        x: this.offset.x + x,
                        y: this.offset.y + (z || 0),
                        z: this.offset.z + y
                    }
                }
                break;
                case "oZ":
                rect.convert = function(x, y, z) {
                    return {
                        x: this.offset.x + x,
                        y: this.offset.y + y,
                        z: this.offset.z + (z || 0)
                    }
                }
                break;
                default:
                return;
            }
            
            return rect;
        }
    }
    
    this._getPossibleRects = function(x, y, z) {
        var distances = {
            left: this._searchForFrameTile(x, y, z, -1, 0, 0),
            right: this._searchForFrameTile(x, y, z, 1, 0, 0),
            down: this._searchForFrameTile(x, y, z, 0, -1, 0),
            up: this._searchForFrameTile(x, y, z, 0, 1, 0),
            back: this._searchForFrameTile(x, y, z, 0, 0, -1),
            forward: this._searchForFrameTile(x, y, z, 0, 0, 1),
        }
        
        var rawRects = [];
        if (this.orientation.horizontal) {
            rawRects.push({
                minX: distances.left,
                maxX: distances.right,
                minY: distances.back,
                maxY: distances.forward,
                plane: "oY"
            });
        }
        if (this.orientation.vertical) {
            rawRects.push({
                minX: distances.back,
                maxX: distances.forward,
                minY: distances.down,
                maxY: distances.up,
                plane: "oX"
            });
            rawRects.push({
                minX: distances.left,
                maxX: distances.right,
                minY: distances.down,
                maxY: distances.up,
                plane: "oZ"
            });
        }
        
        var rects = [];
        for (var i in rawRects) {
            var rect = this._buildRect({x: x, y: y, z: z}, rawRects[i]);
            if (rect && rect.width() - 2 >= this.minWidth && rect.height() - 2 >= this.minHeight) {
                rects.push(rect);
            }
        }
        
        return rects;
    }
    
    this._checkRect = function(rect) { 
        for (var x = rect.minX + 1; x < rect.maxX - 1; x++) {
            var pos1 = rect.convert(x, rect.minY);
            var pos2 = rect.convert(x, rect.maxY - 1);
            if (!this.isFrameTileAt(pos1.x, pos1.y, pos1.z) || !this.isFrameTileAt(pos2.x, pos2.y, pos2.z)) {
                return false;
            }
        }
        
        for (var y = rect.minY + 1; y < rect.maxY - 1; y++) {
            var pos1 = rect.convert(rect.minX, y);
            var pos2 = rect.convert(rect.maxX - 1, y);
            if (!this.isFrameTileAt(pos1.x, pos1.y, pos1.z) || !this.isFrameTileAt(pos2.x, pos2.y, pos2.z)) {
                return false;
            }
        }
        
        for (var x = rect.minX + 1; x < rect.maxX - 1; x++) {
            for (var y = rect.minY + 1; y < rect.maxY - 1; y++) {
                var pos = rect.convert(x, y);
                if (!this.isSpaceTileAt(pos.x, pos.y, pos.z)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    this._buildPortalPlane = function(rect) {
        for (var x = rect.minX + 1; x < rect.maxX - 1; x++) {
            for (var y = rect.minY + 1; y < rect.maxY - 1; y++) {
                var pos = rect.convert(x, y);
                World.setBlock(pos.x, pos.y, pos.z, this.buildIds.portal);
            }
        }
    }
    
    this._buildPortalFrame = function(rect) {
        for (var x = rect.minX; x < rect.maxX; x++) {
            var pos1 = rect.convert(x, rect.minY);
            World.setBlock(pos1.x, pos1.y, pos1.z, this.buildIds.frame);
            var pos2 = rect.convert(x, rect.maxY - 1);
            World.setBlock(pos2.x, pos2.y, pos2.z, this.buildIds.frame);
            var pos3 = rect.convert(x, rect.minY, -1);
            World.setBlock(pos3.x, pos3.y, pos3.z, this.buildIds.frame);
            var pos4 = rect.convert(x, rect.minY, 1);
            World.setBlock(pos4.x, pos4.y, pos4.z, this.buildIds.frame);
        }
        
        for (var y = rect.minY; y < rect.maxY; y++) {
            var pos1 = rect.convert(rect.minX, y);
            World.setBlock(pos1.x, pos1.y, pos1.z, this.buildIds.frame);
            var pos2 = rect.convert(rect.maxX - 1, y);
            World.setBlock(pos2.x, pos2.y, pos2.z, this.buildIds.frame);
        }
    }
    
    this._clearArea = function(rect) {
        for (var z = -2; z <= 2; z++) {
            for (var x = rect.minX; x < rect.maxX; x++) {
                for (var y = rect.minY + 1; y < rect.maxY; y++) {
                    var pos = rect.convert(x, y, z);
                    World.setBlock(pos.x, pos.y, pos.z, 0);
                }
            }
        }
    }
    
    this.findPortal = function(x, y, z) {
        var rects = this._getPossibleRects(x, y, z);
        for (var i in rects) {
            if (this._checkRect(rects[i])) {
                return rects[i];
            }
        }
    }
    
    this.buildPortal = function(rect, isNewOne) {
        if (isNewOne) {
            this._clearArea(rect);
            this._buildPortalFrame(rect);
        }
        this._buildPortalPlane(rect);
    }
    
    this.getBuilder = function() {
        var self = this;
        
        return function(pos) {
            pos.y++; 
            var x = Math.floor(pos.x);
            var y = Math.floor(pos.y) - 2;
            var z = Math.floor(pos.z) - 1;
            
            var rect = self._buildRect({x: x, y: y, z: z}, {
                minX: 0,
                minY: 0, 
                maxX: self.minWidth + 1,
                maxY: self.minHeight + 1,
                plane: self.orientation.vertical ? "oX" : "oY"
            });
            
            self.buildPortal(rect, true);
        }
    }
}



var DimensionHelper = {
    searchForPortal: function(pos, blockId, options) {
        if (!options) {
            options = {};
        }
        if (!options.radius) {
            options.radius = 3;
        }
        if (!options.range) {
            options.range = [0, 256];
        }
        
        
        var rad = options.radius;
        var closestPos = null;
        var closestDis = -1;
        
        var posx = Math.floor(pos.x);
        var posz = Math.floor(pos.z);
        for (var y = options.range[0]; y < options.range[1]; y++) {
            for (var x = -rad; x <= rad; x++) {
                for (var z = -rad; z <= rad; z++) {
                    var px = posx + x;
                    var pz = posz + z;
                    if (World.getBlockID(px, y, pz) == blockId) {
                        var dis = x * x + (y - 128) * (y - 128) + z * z;
                        if (dis < closestDis || !closestPos) {
                            closestDis = dis;
                            closestPos = {x: px, y: y, z: pz};
                        }
                        if (options.fast) {
                            break;
                        }
                    }
                }
            }
        }
        
        return closestPos;
    },
    
    adjustPlayerInPortal: function(pos, blockId, options) {
        if (!options) {
            options = {};
        }
        if (!options.frameId) {
            options.frameId = 1;
        }
        
        var posx = Math.floor(pos.x);
        var posy = Math.floor(pos.y);
        var posz = Math.floor(pos.z);
        
        while (World.getBlockID(posx, posy, posz) == blockId && posy > 0) {
            posy--;
        }
        
        if (options.frameId > 0 && World.getBlockID(posx, posy, posz) == 0) {
            World.setBlock(posx, posy, posz, options.frameId);
        }
        
        for (var y = 1; y < 3; y++) {
            var bId = World.getBlockID(posx, posy + y, posz);
            if (bId != 0 && bId != blockId) {
                World.setBlock(posx, posy + y, posz, options.placePortal ? blockId : 0);
            }
        }
        
        if (options.movePlayer) {
            Player.setPosition(posx + .5, posy + 2.63, posz + .5);
        }
    
        return {x: posx + .5, y: posy + 2.63, z: posz + .5};
    },
    
    eliminateIncorrectPlacedPortals: function(pos, portalId, frameIds) {
        var validIds = {};
        validIds[portalId] = true;
        for (var i in frameIds) {
            validIds[frameIds[i]] = true;
        }
        
        
        Updatable.addUpdatable({
            _checkPortal: function(x, y, z) {
                var count = 0;
                if (validIds[World.getBlockID(x - 1, y, z)] && validIds[World.getBlockID(x + 1, y, z)]) {
                    count++;
                }
                if (validIds[World.getBlockID(x, y - 1, z)] && validIds[World.getBlockID(x, y + 1, z)]) {
                    count++;
                }
                if (validIds[World.getBlockID(x, y, z - 1)] && validIds[World.getBlockID(x, y, z + 1)]) {
                    count++;
                }
                return count == 2;
            },
            
            _checkRecursive: function(x, y, z) {
                if (World.getBlockID(x, y, z) == portalId) {
                    if (!this._checkPortal(x, y, z)) {
                        World.setBlock(x, y, z, 0);
                        this._checkAround(x, y, z);
                    }
                }
            },
            
            _checkAround: function(x, y, z) {
                this._checkRecursive(x + 1, y, z);
                this._checkRecursive(x - 1, y, z);
                this._checkRecursive(x, y + 1, z);
                this._checkRecursive(x, y - 1, z);
                this._checkRecursive(x, y, z + 1);
                this._checkRecursive(x, y, z - 1);
            },
            
            update: function() {
                this.remove = true;
                this._checkAround(pos.x, pos.y, pos.z);
            }
        })
    }
}



var CURRENT_PORTAL_OVERLAY = null;

function PortalOverlayWindow(content) {
    this.alpha = 1;
    
    var overlay = this;
    this.window = new UI.Window({
        location: {
            fullscreen: true
        },
        
        drawing: [
            {type: "color", color: 0}
        ],
        
        elements: {
            "overlay": {
                type: "custom",
                
                custom: {
                    alpha: 0
                },
                
                onSetup: function(element) {
                    this.animationTexture = UI.TextureSource.get(content.texture);
                    this.animationFrames = content.frames || 1;
                    this.animationRate = content.rate || 1;
                    this.paint = new android.graphics.Paint();
                    
                    var self = element.getScope();
                    self.alpha = overlay.alpha;
                },
                
                onDraw: function(element, canvas, scale) {
                    var self = element.getScope();
                    var width = canvas.getWidth();
                    var height = canvas.getHeight();
                    
                    this.paint.setAlpha(self.alpha * 255);
                    
                    if (this.animationFrames > 1) {
                        var texWidth = this.animationTexture.getWidth();
                        var texHeight = this.animationTexture.getHeight();
                        var frameCount = this.animationFrames;
                        var frameIndex = parseInt(java.lang.System.currentTimeMillis() * this.animationRate / 1000) % frameCount;
                        canvas.drawBitmap(this.animationTexture, new android.graphics.Rect(0, frameIndex * texHeight / frameCount, texWidth, (frameIndex + 1) * texHeight / frameCount), new android.graphics.Rect(0, 0, width, height), this.paint);
                    }
                    else {
                        canvas.drawBitmap(this.animationTexture, null, new android.graphics.Rect(0, 0, width, height), this.paint);
                    }
                },
                
                onBindingUpdated: function(element, name, val) {
                    var self = element.getScope();
                    if (name == "alpha") {
                        self.alpha = parseFloat(val) || 0;
                    }
                }
            }
        }
    });
    
    this.window.setTouchable(false);
    this.window.setAsGameOverlay(false);
    
    this.container = new UI.Container();
    
    this.open = function() {
        if (CURRENT_PORTAL_OVERLAY) {
            CURRENT_PORTAL_OVERLAY.close();
        }
        CURRENT_PORTAL_OVERLAY = this;
        this.container.openAs(this.window);
    }
    
    this.close = function() {
        CURRENT_PORTAL_OVERLAY = null;
        this.container.close();
    }
    
    this.fade = function() {
        if (content.fade > 0) {
            var self = this;
            var alpha = this.alpha;
            var start = java.lang.System.currentTimeMillis();
            (new java.lang.Thread({
                run: function() {
                    try {
                        while (self.alpha > 0) {
                            var time = java.lang.System.currentTimeMillis() - start;
                            self.setAlpha(alpha * (1 - time / (content.fade * 1000)));
                            java.lang.Thread.sleep(20);
                        }
                    } catch(e) {};
                    self.close();
                }
            })).start();
        }
        else {
            this.close();
        }
    }
    
    this.setAlpha = function(alpha) {
        alpha = parseFloat(alpha) || 0;
        alpha = Math.max(0, Math.min(1, alpha));
        this.container.setBinding("overlay", "alpha", alpha);
        this.alpha = alpha;
    }
}


// export dimension modules
EXPORT("PortalRegistry", PortalRegistry);
EXPORT("Portal", Portal);
EXPORT("DimensionTransfer", DimensionTransfer);
EXPORT("TransferSequence", TransferSequence);
EXPORT("PortalShape", PortalShape);
EXPORT("PortalOverlayWindow", PortalOverlayWindow);
EXPORT("DimensionHelper", DimensionHelper);