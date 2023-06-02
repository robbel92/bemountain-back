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
    enum: ["fácil", "moderada", "difícil"],
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
  elevationGain: {
    type: Number,
    required: true,
  },
});

const Route = model("Route", routeSchema, "routes");

export default Route;
