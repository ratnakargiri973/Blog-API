import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
export default Users;