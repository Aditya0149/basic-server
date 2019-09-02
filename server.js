var express = require("express");
var cors = require('cors')
var server = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var jsonFile = require("jsonfile");

server.use(express.static("js"));
server.use(express.static("css"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(cors());

var usersFile = "database/db.json";

server.get("/",function(req,res){ // get all list
  var configFile = "";
  configFile = fs.readFileSync(usersFile);
  var jsObj = JSON.parse(configFile);

  res.send(jsObj);
});

server.get("/users/:id",function(req,res){ // get one element
  var configFile = "";
  configFile = fs.readFileSync(usersFile);
  var jsObj = JSON.parse(configFile);
  var resObj = {};
  for(i in jsObj){
    if(jsObj[i].id == req.params.id) {
        resObj = jsObj[i];
    }
  }

  res.send(resObj);
});

server.post("/users",function(req,res){ // save element
    var configFile = fs.readFileSync(usersFile);
    var jsObj = JSON.parse(configFile);
    var reqObj = req.body;
    Array.prototype.last = function() {
        return this[this.length-1];
    }
    if(jsObj.last()){
      var id = parseInt(jsObj.last().id) + 1;
      console.log(id);
    }
    else
      id = 1;
    reqObj.id = id;
    jsObj.push(reqObj);
    var newConfigFile = JSON.stringify(jsObj);
    fs.writeFileSync(usersFile,newConfigFile);
    res.send({});
});


server.put("/users/:id",function(req,res){ // update element
    var configFile = fs.readFileSync(usersFile);
    var jsObj = JSON.parse(configFile);
    var id = req.params.id;
    var resObj = {};
    for(i in jsObj){
      if(jsObj[i].id == req.params.id) {
          jsObj[i] = req.body;
      }
    }
    var newConfigFile = JSON.stringify(jsObj);
    fs.writeFileSync(usersFile,newConfigFile);
    res.send({});
});

server.delete("/users/:id",function(req,res){ // delete element
    var configFile = fs.readFileSync(usersFile);
    var jsObj = JSON.parse(configFile);
    var id = req.params.id;
    var resObj = {};
    for(i in jsObj){
      if(jsObj[i].id == req.params.id) {
          jsObj.splice(i,1)
      }
    }
    var newConfigFile = JSON.stringify(jsObj);
    fs.writeFileSync(usersFile,newConfigFile);
    res.send({});
});


server.listen(8888,function(){
   console.log("server is listening on port 8888");
});
