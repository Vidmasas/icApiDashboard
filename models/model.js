var express 				= require("express");
var app						  = express();
var mongoose 			  = require("mongoose");

var mongoose 			  = require("mongoose");

//SCHEMA SETUP
  var remarkSchema = new mongoose.Schema({
    name: String,
    remark: String,
    image_url: String,
  });

var dbRemark = mongoose.model("dbRemark", remarkSchema);
module.exports = mongoose.model("dbRemark", remarkSchema);





/* OLD
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

//======== SCHEMA SETUP ========//
var remarksSchema = new mongoose.Schema({
    admin: String,
    remark: String
  });
  
  var Remarks = mongoose.model("Remarks", remarksSchema);
  module.exports = mongoose.model("Remarks", remarksSchema);

  //======== SCHEMA SETUP ========//








/*
  let processConversationsPage = function (res, currentPage, postedCount) {
    const promises = res.body.conversations.map((conversation, index) => {
        return new Promise((resolve) => {
            client.conversations.find({ id: conversation.id }, (response) => {
                if (response.body.conversation_rating.remark !== null && response.body.conversation_rating.rating === 5) {
                    const adminID = response.body.conversation_rating.teammate.id;
                    client.admins.find(adminID, convs => {
                        resolve({ name: convs.body.name, remark: response.body.conversation_rating.remark});
                    });
                } else {
                    resolve(null);
                }
            });
        })
    });
    Promise.all(promises).then((remarks) => {
        console.log(remarks);
        remarks.forEach((details) => {
            if (details !== null) {
                let result = details.name + " did a great job!" + " - " + "" + details.remark;
                console.log(result);

                ///Print

                postedCount++;
            } else {
                console.log('Remark not found :(');
            }
        });
        if (postedCount < 5) {
            if (currentPage <= 10) {
                console.log('Next page!!');
                currentPage++;
                client.nextPage(res.body.pages, (newRes) => {
                    processConversationsPage(newRes, currentPage, postedCount);
                });
            } else {
                var noResult = ':(((((';
                console.log(noResult);

            }
        }
    });
};
client.conversations.list({ 
  order: "desc",
  sort: "created_at",
  open: false,
}, (res) => {
  processConversationsPage(res, 1, 0);
});

*/

