import express from "express";
import cors from "cors";

import checkAnswerRoute from "./routes/checkAnswer.js";
import feedbackRoute from "./routes/generateFeedback.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", checkAnswerRoute);
app.use("/", feedbackRoute);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});