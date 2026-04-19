import { Router } from "express";

const router = Router();

router.post("/generate-feedback", (req, res) => {
  const { letter } = req.body;

  if (!letter) {
    return res.status(400).json({ explanation: "Missing letter." });
  }

  const tips = {
    b: "b has a belly on the right",
    d: "d has a belly on the left",
    p: "p goes down",
    q: "q has a tail",
    B: "B has two bumps on the right",
    D: "D has a straight stem on the left",
    P: "P has a loop on top and a stem on the left",
    Q: "Q is like O with a tail on the lower right"
  };

  const explanation = tips[letter] ||
    `Look carefully at the shape of '${letter}' and choose the matching letter orientation.`;

  res.json({ explanation });
});

export default router;
