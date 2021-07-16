const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items=['buy food','cook food','eat food'];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
var day = today.toLocaleDateString("en-US",options)

 res.render("list",{ kindOfDay : day , newItem : items}); 
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    console.log(items);
    items.push(item);
  res.redirect("/");

});
app.listen(3000,function(){
    console.log("server running on port 30000");
    
});