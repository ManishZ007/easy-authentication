import mongoose, { Document, Model, models, Schema } from "mongoose";

interface User extends Document {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userImage?: string;
}

export const UserSchema: Schema<User> = new Schema({
  id: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    default: "",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);

export default UserModel;
