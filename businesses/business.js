const mongoose = require('mongoose');

mongoose.model("Business", {
  UserID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  ListingID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  ListingDate: {
    type: Date,
    required: true,
  },
});