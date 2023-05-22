import mongoose from "mongoose";

const prodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    image4: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    shippingArea: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const products = mongoose.model("products", prodSchema);
export default products;
