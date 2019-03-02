var WorldAPI = {
    getBlock: function(){
        return 12;
    },
    
    getBlock: function(){
        return 1;
    }
}

print(WorldAPI.getBlock());

var command = "//save";
if(command.indexOf("//") == 0){
    command = command.substring(2);
    print(command);
}




function p(block){
    block.data = block.data || block.meta || 0;
    print("ID: " + block.id + "; Data: " + block.data);
}

var b1 = {
    id: 1, 
    data: 1
}

var b2 = {
    id: 1,
    meta: 22
}

p(b1);
p(b2);

item = {
}
print(item.data || item.meta || 0)