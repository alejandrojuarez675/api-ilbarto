import { Schema } from "mongoose";
import db from "./../database";

const shopsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  publicName: String,
  deliveryPrice: Number,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  products: [
    new Schema({
      name: String,
      image: String,
      description: String,
      price: Number,
      type: String,
    }),
  ],
});

export default db.model("shops", shopsSchema);
