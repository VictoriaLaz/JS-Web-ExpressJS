let fs = require("fs");
let storage = {};
let put = (key, value)=>{
    if(typeof(key)!=="string"){
        console.log("The key must be a string!");
        return;
    }
    if(storage.hasOwnProperty(key)){
        console.log("Key already exists");
        return;
    }
    storage[key] = value;
}
let get = (key)=>{
    if(typeof(key)!=="string"){
        console.log("The key must be a string!");
        return;
    }
    if(!storage.hasOwnProperty(key)){
        console.log("No such key");
        return;
    }
    return storage[key];
}
let getAll = ()=>{
    if(Object.values(storage).length === 0){
        return "There are no items in storage";
       
    }
    return storage;
}
let update = (key, value)=>{
    if(!storage.hasOwnProperty(key)){
        console.log("No such key")
        return;
    }
    storage[key]=value;
}
let deleteItem = (key)=>{
    if(!storage.hasOwnProperty(key)){
        console.log("No such key")
        return;
    }
    delete storage[key];
}
let clear = ()=>{
    storage = {};
    return;
}
let save = ()=>{
    fs.writeFileSync('./storage.json', JSON.stringify(storage), 'utf8');
    return;
}
let load = ()=>{
    try{
        storage = JSON.parse(fs.readFileSync('./storage.json', 'utf8'))
    } catch(err){
    } finally{
    }
}

module.exports = {
    put:put,
    get:get,
    getAll:getAll,
    update:update,
    delete:deleteItem,
    clear:clear,
    save:save,
    load:load
}