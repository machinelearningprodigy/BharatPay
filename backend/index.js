const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
dotenv.config();

// Ensure environment variables are set
const { MONGO_URL, PORT } = process.env;
if (!MONGO_URL || !PORT) {
  console.error("Missing environment variables: MONGO_URL or PORT");
  process.exit(1); // Exit the process with an error code
}

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

// Simple health check
app.get("/", (req, res) => {
  res.json("Server is up and running");
});

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process with an error code
  }
};

// Start server and connect to the database
app.listen(PORT, async () => {
  await connectDB();
  console.log("Server is running on port: " + PORT);
});
