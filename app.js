const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname+"/date.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
// const items=['buy food','cook food','eat food'];
// const workItems = [];

const itemSchema = {
    name: String
};
const Item = mongoose.model('item',itemSchema);

const item1 = new Item({
    name:"welcome to your todolist"
})
const item2 = new Item({
    name:"hit + to add item"
})
const item3 = new Item({
    name:"<-- hit this to delete an item"
})

const defaultItems = [item1,item2,item3];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    // const day = date.getDay();
    Item.find({},function(err,foundItems){
          if(foundItems.length == 0){ 
             Item.insertMany(defaultItems,(err)=>{
                if(err){
                    return console.log(err);
                }else{
                    console.log("success insertion");
                }
            });
            res.redirect('/');
            } else{
            res.render("list",{ listTittle : "today" ,newItem:foundItems}); 
        }
       
    })
 
   
});

app.post("/",function(req,res){

const itemName = req.body.newItem;
const item = new Item({
    name:itemName
});
item.save();
res.redirect("/");
    // const item = req.body.newItem;
    // if (req.body.list=="work"){
    //     // workItems.push(item);
    //     res.redirect("/work");
    // }else{
    //     // items.push(item);
    //     res.redirect("/");
    // }
});

app.get("/work",function(req,res){
    res.render("list",{listTittle:"work List", newItem : workItems});
});

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/delete",function(req,res){
        const checkeditemId = req.body.checkbox;
        
        Item.deleteOne({_id:checkeditemId},(err)=>{
            if(err){
                console.log(err);
            }else {
                console.log("success delete");
            }
        })
        res.redirect("/");
})

app.listen(3000,function(){
    console.log("server running on port http://127.0.0.1:3000");
    
});