import { Router } from "express";

const router = Router();

//Tweet crud operations

//list Tweet
router.get("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

//Create Tweet
router.post("/", (req, res) => {
  res.status(501).json({ error: "Not Implemented" });
});

//Get one Tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `Not Implemented ${id}` });
});
//Delete one Tweet
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: "Not Implemented" });
});

export default router;
