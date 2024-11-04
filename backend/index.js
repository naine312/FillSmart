import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import car from "./models/car.js";
import fuelCalculation from "./models/fuelCalculation.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import url, { fileURLToPath } from "url";
const port = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

// Add Car
app.get("/api/cars", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    // Find cars for the user
    const userCars = await car.find({ userId });

    if (!userCars.length) {
      return res.status(404).json({ message: "No cars found for this user." });
    }

    // Format the response
    const carInfoList = userCars.map(({ _id, carModel }) => ({
      carId: _id,
      carModel: carModel,
    }));

    res.status(200).json(carInfoList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user cars!");
  }
});

app.post("/api/cars", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { carModel, tankCapacity, fuelEfficiency, carAge } = req.body;

  try {
    const newCar = new car({
      userId,
      carModel,
      tankCapacity,
      fuelEfficiency,
      carAge,
    });
    await newCar.save();
    res
      .status(201)
      .json({ message: "Car added successfully.", carId: newCar._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/fuel", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { carId, currentFuelLevel, fuelPrice } = req.body;
  const carDetails = await car.findById(carId);
  if (!carDetails) {
    return res.status(404).json({ error: "Car not found." });
  }
  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_PUBLIC_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `A car needs to be filled to 100% fuel capacity. Calculate the total cost in dollars for the fuel required to reach a full tank based on the given information.
  Respond with only the result in whole dollars as an integer, with no additional text.

Car Model: ${carDetails.carModel}
Fuel Tank Capacity (liters): ${carDetails.tankCapacity}
Fuel Efficiency (liters per kilometer): ${carDetails.fuelEfficiency}
Car Age (years): ${carDetails.carAge}
Current Fuel Level (percentage): ${currentFuelLevel}
Fuel Price per Liter (dollars): ${fuelPrice}`;

  const result = await model.generateContent(prompt);
  try {
    const newfuelCalculation = new fuelCalculation({
      userId,
      carId,
      currentFuelLevel,
      fuelPrice,
      fuelNeeded: result.response.text(),
    });
    await newfuelCalculation.save();
    res.status(201).json({
      message: "Fuel calculation done successfully.",
      fuelNeeded: result.response.text(), // Parse to integer if needed
      carModel: carDetails.carModel, // Include the car model in the response
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/fuelInfoLists", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    // Find fuel calculations for the user and populate the car details
    const userChats = await fuelCalculation.find({ userId }).populate("carId");

    // Format the response to include date/time, car model, fuel price, and fuel needed
    const fuelInfoList = userChats.map((chat) => ({
      dateTime: chat.createdAt, // date and time
      carModel: chat.carId.carModel, // car model
      fuelPrice: chat.fuelPrice, // fuel price
      fuelNeeded: chat.fuelNeeded, // fuel needed
    }));
    // Send the response
    res.status(200).json(fuelInfoList.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching user chats!");
  }
});
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
