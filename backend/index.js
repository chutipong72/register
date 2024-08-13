const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://chutipong:snkuXJpD2iYHgEUI@cluster0.r0m1g98.mongodb.net/register"
);

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

const Users = new mongoose.model("Users", {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Email already exists",
    });
  }
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        errors: "Invalid password",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "Wrong email id",
    });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(error);
  }
});
