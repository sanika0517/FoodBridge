const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createFood,
  getFoods,
  getAvailableFoods,
  updateFood,
  deleteFood,
   claimFood,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/", protect, createFood);
router.get("/", protect, getFoods);
router.get("/available", getAvailableFoods);
router.put("/:id", protect, updateFood);
router.delete("/:id", protect, deleteFood);
router.put("/:id/claim", claimFood);

module.exports = router;

