require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const jsonwt = require("jsonwebtoken");

// Start of Middlewares

// Config for JWT Strategy
require("./strategies/jsonwtStrategies")(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

morgan.token("body", req => {
  return req.method === "POST" || req.method === "PUT"
    ? JSON.stringify(req.body)
    : null;
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// End of Middlewares

// Connect to MongoDB
console.log("connecting to mongoDB");
mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });
// End of Connect to MongoDB

// Start of Home Path
app.get("/", (req, res) => {
  res.status(200).send(`Hi Welcome to the Login and Signup API`);
});
// End of Home Path

// Start of Sign Up Path
app.post("/signup", async (req, res) => {
  var newUser = User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    idNumber: req.body.idNumber,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    password: req.body.password,
    isTeacher: req.body.isTeacher,
  });

  await User.findOne({ email: newUser.email })
    .then(async profile => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send(newUser);
              })
              .catch(err => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.send("Email is alreaydy in use");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});
// End of Sign Up Path

// Start of Signin Path
app.post("/signin", async (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  await User.findOne({ email: newUser.email })
    .then(profile => {
      if (!profile) {
        res.send("User does not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result === true) {
              //   res.send("User authenticated");
              const payload = {
                id: profile.id,
                email: profile.email,
              };
              jsonwt.sign(
                payload,
                process.env.secretKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            } else {
              res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});
// End of Login Path

// Start of Profile Path
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.json({
      id: req.user.id,
      email: req.user.email,
    });
  }
);
// End of Profile Path

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
