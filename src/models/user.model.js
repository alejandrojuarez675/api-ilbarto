import { Schema } from 'mongoose';
import db from './../database';

const userSchema = new Schema({
  name: String,
  lastname: String,
  age: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export default db.model('User', userSchema);