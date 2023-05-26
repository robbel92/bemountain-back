import { Schema, Types, model } from "mongoose";

const routeSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  author: {
    type: Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 40,
  },
  difficulty: {
    type: String,
    enum: ["easy", "moderate", "hard"],
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  ubication: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  elevation_gain: {
    type: Number,
    required: true,
  },
});

const Route = model("Route", routeSchema, "routes");

export default Route;
