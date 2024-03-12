import mongoose from "mongoose";
//patviratu
const Bitcoin = new mongoose.Schema(
  {
    value: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("bitcoin", Bitcoin);
