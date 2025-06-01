import foodModel from "../models/food.model.js";
import { v2 as cloudinary } from "cloudinary";




export const addFood = async (req, res) => {
      const { name, description,  price,category } = req.body;

     const imageFile = req.file;

     if (!name || !description || !price || !imageFile) {
          return res.json({ success: false, message:"Missing details"})
     }
     
     
      try {
        
        

        

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const food = await foodModel.create({
          name,
          description,
          price,
          category,
          image: imageUpload.secure_url
        })

        res.json({
          success: true,
          food: {
               name: food.name,
               description: food.description,
               price: food.price,
               category:food.category,
               image: food.image
          },
          
        })

      } catch (error) {
         res.json({ success: false, message: error.message})
      }
};

// ✅ List all food
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("List food error:", error);
    res.json({ success: false, message: "Error fetching food" });
  }
};

// ✅ Remove food item
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) return res.json({ success: false, message: "Food not found" });

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(food.name);

    // Remove from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.error("Remove food error:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};
