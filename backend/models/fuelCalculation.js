import mongoose from "mongoose";

// Define the fuel calculation schema
const fuelCalculationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk user ID
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "car", required: true }, // Link to specific car
  currentFuelLevel: { type: String, required: true }, // in liters
  fuelPrice: { type: Number }, // in dollars per liter
  distance: { type: Number }, // distance in kilometers (optional for gas needed)
  fuelNeeded: { type: Number }, // calculated fuel needed
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const fuelCalculation = mongoose.model(
  "fuelCalculation",
  fuelCalculationSchema
);

// Export the model
export default fuelCalculation;
