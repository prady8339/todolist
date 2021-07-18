const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items=['buy food','cook food','eat food'];
let workItems = [];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();
let day = today.toLocaleDateString("en-US",options)

 res.render("list",{ listTittle : day , newItem : items}); 
});

app.post("/",function(req,res){
    let item = req.body.newItem;
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