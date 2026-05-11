import mongoose from "mongoose";
import addressSchema from "./address.js";

import {
  allowedBloodTypes,
  gendersTypes,
  roleTypes,
} from "../constants/index.js";

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {type: String,enum: roleTypes,default: "patient"},
  gender: { type: String, enum: gendersTypes, default: "N/A" },
  bloodType: { type: String, enum: allowedBloodTypes, default: "N/A" },
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  address: addressSchema,
});

export default mongoose.model("Patient", PatientSchema);
