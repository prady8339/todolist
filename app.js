const express = require("express");
const bodyParser = require("body-parser");

const app = express();



app.set('view engine', 'ejs');

app.get("/",function(req,res){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
var day = today.toLocaleDateString("en-US",options)
res.render("list",{ kindOfDay : day}); 
});

app.listen(3000,function(){
    console.log("server running on port 30000");
});