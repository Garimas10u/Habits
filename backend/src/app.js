const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/feed", require("./routes/feedRoutes"));

app.get("/", (req, res) => res.send("API is running"));

module.exports = app;
