
function GenerateTree(x, y, z, id, damage){
    var trunkCount    = Math.floor (Math.random() * 2) + 2;
    var branchesCount = Math.floor (Math.random() * 5) + 3;
    for(var i = 0; i < trunkCount; i++)
        setTile(x, y + i, z, id, damage);
    _BuildBranchesRecurcive(x, y + trunkCount, z, id, damage, branchesCount);
}

function _BuildBranchesRecurcive(x, y, z, id, damage, count){
    count--;
    if(count < 0) return;
    setTile(x, y, z, id, damage);
    for(var i = 0; i < 2; i++){
        var side = Math.floor (Math.random() * 3);
        switch(side){
          case 0:
            setTile(x + 1, y + 1, z, id, damage);
            _BuildBranchesRecurcive(x + 2, y + 2, z, id, damage, count - 2);
            break;
          case 1:
            setTile(x - 1, y + 1, z, id, damage);
            _BuildBranchesRecurcive(x - 2, y + 2, z, id, damage, count - 2);
            break;
          case 2:
            setTile(x, y + 1, z + 1, id, damage);
            _BuildBranchesRecurcive(x, y + 2, z + 2, id, damage, count - 2);
            break;
          case 3:
            setTile(x, y + 1, z - 1, id, damage);
            _BuildBranchesRecurcive(x, y + 2, z - 2, id, damage, count - 2);
            break;
        }
    }
}

function useItem(x,y,z,itemid,blockid,side,itemDamage,blockDamage) {
    if(itemid == 280){
        GenerateTree(x, y + 1, z, 17, 1);
    }
}