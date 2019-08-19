const mongoose = require("mongoose");

mongoose.model("Listing", {
  Listing_Name: {
    type: String,
    require: true
  }, 
  Listing_Owner: {
    type: String,
    require: true,
  }, 
  Listing_Contact: {
    type:Number,
    require: true
  }, 
  Listing_Category: {
    type: String,
    require: true
  },
})