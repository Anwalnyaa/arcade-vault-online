import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import scoreRoutes from "./routes/scoreRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Retro Arcade Backend Running ✅");
});

app.use("/api", scoreRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
