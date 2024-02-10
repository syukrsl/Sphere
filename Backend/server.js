const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 8080;

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

// Add the sequelize.authenticate() and sync with logging option
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define the Registry model (formerly User)
const Registry = sequelize.define("Registry", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Enable Sequelize logging
sequelize.sync({ force: false, logging: console.log }).then(() => {
  console.log("Registry model synchronized with the database.");
});

app.use(cors());
app.use(express.json());

app.post("/sign-up", async (req, res) => {
  try {
    // Hash the user's password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), salt);

    // Create a new user record in the database
    const user = await Registry.create({ // Change from User to Registry
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Registration successful
    return res.json({ Status: "Success" });
  } catch (error) {
    console.error("An error occurred during registration:", error);
    return res.status(500).json({ Error: "Registration failed" });
  }
});

app.post("/sign-in", async (req, res) => {
  try {
    console.log("Received sign-in request");
    console.log(req.body); // Log the request body to check if data is being received

    const { email, password } = req.body;

    // Find a user with the provided email
    const user = await Registry.findOne({ where: { email } }); // Change from User to Registry

    if (!user) {
      // User not found
      console.log("User not found");
      return res.status(401).json({ Error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, generate a JWT token for authentication
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
      });

      // Send the token back to the client upon successful authentication
      console.log("Sign-in successful");
      return res.json({ token });
    } else {
      // Passwords do not match
      console.log("Password does not match");
      return res.status(401).json({ Error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("An error occurred during sign-in:", error);
    return res.status(500).json({ Error: "Sign-in failed" });
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
