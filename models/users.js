import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
 
  Type: {
    type: String,
    required: true
  },
}, { timestamps: true });

const users = mongoose.model('users', userschema);
export default users;