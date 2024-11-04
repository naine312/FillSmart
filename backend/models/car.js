import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  tankCapacity: {
    type: Number,
    required: true,
  },
  fuelEfficiency: {
    type: Number,
    required: true,
  },
  carAge: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.car || mongoose.model("car", carSchema);
