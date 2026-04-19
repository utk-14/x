import { Router } from "express";

const router = Router();

router.post("/check-answer", (req, res) => {
  const { expected, actual } = req.body;
  const isCorrect = expected === actual;

  res.json({ isCorrect });
});

export default router;