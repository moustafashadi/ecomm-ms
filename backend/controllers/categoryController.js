import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check if the name is provided and not empty
  if (!name?.trim()) {
    return res.status(400).json({ error: "Category name is required" });
  }

  // Check if the category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }

  // Create and save the new category
  const category = await new Category({ name }).save();
  res.status(201).json(category);
});

// Update an existing category
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categoryId = req.params.id;

  // Find the category by ID
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  // Update the category name and save
  category.name = name;
  const updatedCategory = await category.save();
  res.status(200).json(updatedCategory);
});

// Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  // Find the category by ID
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Delete the category
  await category.deleteOne();
  res.status(204).json({ message: "Category removed" });
});

// List all categories
const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

// Get a single category by ID
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(category);
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
};
