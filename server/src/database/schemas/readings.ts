import mongoose, { Document, Schema } from "mongoose";

export interface IReadings extends Document {
  temperature: number;
  status?: "NORMAL" | "HIGH";
  createdAt?: Date;
  processedAt?: Date;
}

const Readings = new Schema<IReadings>(
  {
    temperature: { type: Number, required: true },
    status: {
      type: String,
      enum: ["NORMAL", "HIGH", "PENDING"],
      default: "PENDING",
    },
    createdAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
  },
  { collection: "readings" }
);

export default mongoose.model<IReadings>("Readings", Readings);
