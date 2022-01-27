import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
  serverID: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  inventory: {
    type: Array,
    required: true,
  },
  bank: {
    type: Number,
  },
  iron: {
    type: Number,
  },
});

export default mongoose.model("ProfileModels", profileSchema);
