const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./listing");
const Listing = mongoose.model("Listing");

mongoose.connect('mongodb+srv://admin:Milionea1@microservicescluster-uwdcz.mongodb.net/listingservice?retryWrites=true&w=majority', () =>
 {
  console.log("Database is connected!");
});
app.get('/', (req, res)=> {
  res.send("This is home page!")
});

app.post("/listing" , (req,res) => {
  let newListing = {
    Listing_Name: req.body.Listing_Name,
    Listing_Owner: req.body.Listing_Owner,
    Listing_Contact: req.body.Listing_Contact,
    Listing_Category: req.body.Listing_Category,
  }

  let listing = new Listing(newListing);

  listing.save().then(() => {
    console.log("new listing created")
  }).catch((err) => {
    if(err){
      throw err;
    }
  })
  res.send("A new listing successfully created!");
});

app.get("/listing", (req, res) => {

  Listing.find().then((listings) => {
    res.json(listings);
  }).catch((err) => {
    if(err){
      throw err;
    }
  });
});

app.get("/listing/:id", (req, res) => {
  Listing.findById(req.params.id).then((listing) => {
    if (listing){
      res.json(listing)
    } else {
      res.sendStatus(404);
      res.send('book not found')
    }
  }).catch(err => {
    if(err){
      throw err;
    }
  })
});

app.delete("/listing/:id", (req, res) => {
  Listing.findByIdAndDelete(req.params.id).then(() => {
    res.send("Successfully deleted the listing")
  }).catch(err => {
    if(err){
      throw err;
    }
  })
})

app.listen(4545, () => {
  console.log("up and running on port");
});