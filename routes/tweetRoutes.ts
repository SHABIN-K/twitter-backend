import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//tweet crud operations

//list tweet
router.get("/", async (req, res) => {
  const allTweets = await prisma.tweet.findMany({
    include: { User: true },
  });
  res.json(allTweets);
});

// get tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: { id: Number(id) },
    include: { User: true },
  });

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found!" });
  }

  res.json(tweet);
});

//Create tweet
router.post("/", async (req, res) => {
  const { content, image } = req.body;
  // @ts-ignore
  const user = req.user;

  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        image,
        userId: user.id,
      },
      include: { User: true },
    });

    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Username and email should be unique" });
  }
});

//Update tweet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, image } = req.body;
  try {
    const result = await prisma.tweet.update({
      where: { id: Number(id) },
      data: {
        content,
        image,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Faild to update tweet" });
  }
});

/*
  Test with curl:

curl -X DELETE http://localhost:3000/tweet/6
*/

//Delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tweet.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
  } catch (e) {
    res.status(400).json({ error: "Faild to Delete tweet" });
  }
});

export default router;

