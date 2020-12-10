require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");

// Start of Routes Import
const Profile = require("./routes/Profile");
const Signin = require("./routes/Signin");
const Signup = require("./routes/Signup");
const Class = require("./routes/Class");
const Exam = require("./routes/Exam");
const User = require("./routes/User");
// End of Routes Import

// Start of Middlewares
require("./strategies/jsonwtStrategies")(passport);
app.use(passport.initialize());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.static("build"));

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

// Start of Routes
app.use("/api", Profile);
app.use("/api", Signin);
app.use("/api", Signup);
app.use("/api", Class);
app.use("/api", Exam);
app.use("/api", User);
// End of Routes

const UnknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(UnknownEndpoint);

const errorHandler = (error, request, response) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
};
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
