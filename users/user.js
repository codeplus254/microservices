const mongoose = require("mongoose");

mongoose.model('User', {
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  contact: {
    type: Number,
    require:true
  },
});