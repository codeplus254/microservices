const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:Milionea1@microservicescluster-uwdcz.mongodb.net/userService?retryWrites=true&w=majority', () => {
  console.log("Database is connected!");
});

require("./user");
const User = mongoose.model("User");

app.post("/user", (req, res) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  };

  let user = new User(newUser);

  user.save().then(() => {
    res.send(" User created")
  }).catch((err) => {
    if(err){
      throw err;
    }
  });
});

app.get("/users", (req, res) => {
  User.find().then((users) => {
    res.json(users)
  }).catch((err) => {
    if(err){
      throw err;
    }
  });
});

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    if(user){
      res.json(user);
    } else {
      res.send("Invalid user id")
    }
  }).catch((err) => {
    if(err){
      throw err;
    }
  });
});

app.delete("/users/:id", (req, res)=> {
  User.findByIdAndDelete(req.params.id).then(() => {
    res.send("User has been successfully deleted!")
  }).catch((err) => {
    if(err){
      throw err;
    }
  });
})
app.listen("5555", () => {
  console.log("Up and running")
});