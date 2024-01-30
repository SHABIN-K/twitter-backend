import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//user crud operations

//list users
router.get("/", async (req, res) => {
  const allUser = await prisma.user.findMany();
  res.json(allUser);
});

// get one user
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  res.json(user);
});

/*
  Test with curl:

  curl -X POST -H "Content-Type: application/json" \
       -d '{"name": "Elon Musk", "email": "doge@twitter.com", "username": "elon"}' \
       http://localhost:3000/user/

*/

//Create user
router.post("/", async (req, res) => {
  const { email, name, username } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "hello, i'm the new user",
      },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "username or email already exit" });
  }
});

/*
  Test with curl:

  curl -X PUT -H "Content-Type: application/json" \
       -d '{"name": "Vadim", "bio": "Hello there!"}' \
       http://localhost:3000/user/1

*/

//Update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, name, image } = req.body;

  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        bio,
        name,
        image,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "Faild to update user" });
  }
});

/*
  Test with curl:

curl -X DELETE http://localhost:3000/user/6
*/

//Delete one user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
  } catch (e) {
    res.status(400).json({ error: "Faild to Delete user" });
  }
});

export default router;
