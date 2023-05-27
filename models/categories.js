import mongoose from "mongoose";
const Schema = mongoose.Schema;
const categoryschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const categories = mongoose.model("categories", categoryschema);
export default categories;
