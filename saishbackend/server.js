import express from "express";
import cors from "cors";
import controller from "./Controllers/controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

/* ✅ CORS FIX */
app.use(
  cors({
    origin:"*", // 👈 your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());


app.use(controller);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
