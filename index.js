var express 				= require("express");
var app						  = express();
var Intercom 	      = require('intercom-client');
var bodyParser 			= require("body-parser");
var $               = require('jquery');
//var mongoose 			  = require("mongoose");

//mongoose.connect("mongodb://localhost://ic_dashboard_api", //{useNewUrlParser: true, useUnifiedTopology: true});

app.set ("view engine", "ejs");
app.use (bodyParser.urlencoded({extended:true}));
app.use (express.static('public'));


//======== TOKENS ========//
var client = new Intercom.Client({ 
    token: 'dG9rOmZjMTc1MDhhXzIwNTZfNDE3ZF9iOGM1XzczYjdmMzQ5Y2E1ZDoxOjA=' 
}); 

//======== TEST ========//
/*
app.get("/", function(req, res){
  res.render("index");
});
*/
//======== TEST ========//

let myRemarks = [];

//======== REMARKS FUNCTION ========//
app.get("/", function(req, r){
    //////////
  let aux = function (res, currentPage) {
    const promises = res.body.conversations.map((conversation, index) => {
      return new Promise((resolve) => {
        client.conversations.find({ id: conversation.id }, (response) => {
          if (response.body.conversation_rating.remark !== null && response.body.conversation_rating.rating === 5) {
            const adminID = response.body.conversation_rating.teammate.id;
            client.admins.find(adminID, convs => {
              console.log(response.body);
              resolve({ name: convs.body.name, remark: response.body.conversation_rating.remark });
            });
          } else {
            resolve(null);
          };
        });
      })
    });
    Promise.all(promises).then((remarks) => {
      myRemarks.push(...remarks.filter((remark) => remark !== null));

      if (myRemarks.length < 3 && currentPage < 10) {
        client.nextPage(res.body.pages, (newRes) => {
          aux(newRes, currentPage);
        });
      } else {
        r.render("index", { remarks: myRemarks });
      }
    });
  };
  client.conversations.list({ 
      order: "desc",
      sort: "created_at",
      open: false,
  }, (response) => {
    aux(response, 0);
  });
});

 //IMPORTANT
 app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
  });
  //IMPORTANT










