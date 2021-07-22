const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

const items=['buy food','cook food','eat food'];
const workItems = [];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    const day = date.getDay();
   res.render("list",{ listTittle : day , newItem : items}); 
});

app.post("/",function(req,res){
    const item = req.body.newItem;
    if (req.body.list=="work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTittle:"work List", newItem : workItems});
});

app.get("/about",function(req,res){
    res.render("about");
})


app.listen(3000,function(){
    console.log("server running on port 30000");
    
});