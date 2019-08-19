const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:Milionea1@microservicescluster-uwdcz.mongodb.net/businessService?retryWrites=true&w=majority', () =>
 {
  console.log("Database is connected!");
});

require("./business");
const Business = mongoose.model("Business");

app.post("/business", (req, res) => {
  let newBusiness = {
    UserEmail: mongoose.Types.ObjectId(req.body.UserEmail),
    ListingID: mongoose.Types.ObjectId(req.body.ListingID),
    ListingDate: req.body.ListingDate,
  };

  let business= new Business(newBusiness);

  business.save().then(() => {
    res.send("Business successfully created")
  }).catch((err) => {
    if(err){
      throw err
    }
  })
});

app.get("/businesses", (req,res) => {
  Business.find().then((businesses) => {
    res.json(businesses)
  }).catch((err) => {
    if(err) {
      throw err;
    }
  })
});

app.get("/business/:id", (req, res) => {
  Business.findById(req.params.id).then((business) => {
    
    if(business) {
      axios.get(`http://localhost:5555/users/${business.UserID}`).then((response) => {
        let businessObject = { UserEmail: response.data.email, ListingName:'' };

        axios.get(`http://localhost:4545/listing/${business.ListingID}`).then((response) => {
          businessObject.ListingName = response.data.Listing_Name;
          res.json(businessObject);
        })
      })
    } else {
      res.send("invalid business id")
    }
  }).catch((err) => {
    if(err) {
      throw err;
    }
  });
})

app.listen(7777, () => {
  console.log("orders service up and running");
});

