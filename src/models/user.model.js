import { Schema } from "mongoose";
import db from "./../database";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  rols: [
    new Schema({
      shopId: Schema.Types.ObjectId,
      rol: String,
    }),
  ],
});

export default db.model("users", userSchema);
