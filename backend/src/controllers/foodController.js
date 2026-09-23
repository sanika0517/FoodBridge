const Food = require("../models/Food");

const createFood = async (req, res) => {
  try {
    const food = await Food.create({
  ...req.body,
  donorId: req.user.id,
});

    res.status(201).json({
      success: true,
      message: "Food listing created successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create food listing",
      error: error.message,
    });
  }
};


const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch food listings",
      error: error.message,
    });
  }
};

const getAvailableFoods = async (req, res) => {
  try {
    const foods = await Food.find({ status: "Available" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch available food listings",
      error: error.message,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food listing not found",
      });
    }

    // Check if the logged-in user owns this food listing
    if (food.donorId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this food listing",
      });
    }

    Object.assign(food, req.body);

    await food.save();

    res.status(200).json({
      success: true,
      message: "Food listing updated successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update food listing",
      error: error.message,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food listing deleted successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete food listing",
      error: error.message,
    });
  }
};

const claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food listing not found",
      });
    }

    if (food.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Food listing is not available for claiming",
      });
    }

    food.status = "Claimed";
    await food.save();

    res.status(200).json({
      success: true,
      message: "Food listing claimed successfully",
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to claim food listing",
      error: error.message,
    });
  }
};

module.exports = {
  createFood,
  getFoods,
  getAvailableFoods,
  updateFood,
  deleteFood,
  claimFood,
};