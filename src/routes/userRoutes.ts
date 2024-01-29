import { Router } from "express";

const router = Router();

//user crud operations

//list users
router.get("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

//Create user
router.post("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

//Get one user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not Implemented ${id}` });
});
//Delete one user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: "Not Implemented" });
});

export default router;
