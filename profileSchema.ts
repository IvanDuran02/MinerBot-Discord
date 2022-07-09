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
  },
  iron: {
    type: Number,
  },
  gay: {
    type: String,
  },
});

export default mongoose.model("profileModels", profileSchema);
