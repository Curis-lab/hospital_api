import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

export default addressSchema;
