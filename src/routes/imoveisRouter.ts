import Router from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("oi").status(200);
});

export default router;
