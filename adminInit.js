const mongoose = require("mongoose");
const Admin = require("./models/adminModel"); // Adjust the path if necessary
const bcrypt = require("bcryptjs");
require("dotenv").config();

const initializeAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@example.com" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("adminpassword", 12);
      const newAdmin = new Admin({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        passwordConfirm: hashedPassword,
      });

      await newAdmin.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
};

module.exports = initializeAdmin;
