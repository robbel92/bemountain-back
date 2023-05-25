import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  username: {
    type: String,
    required: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = model("User", userSchema, "users");

export default User;
