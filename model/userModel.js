const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class UserModel {
  constructor() {
    this.UserSchema = new Schema(
      {
        email: { type: String, required: true, unique: true },
        bio: { type: String, default: null },
        password: { type: Buffer, required: true },
        role: { type: String, required: true, default: "user" },
        firstName: { type: String },
        lastName: { type: String },
        salt: { type: Buffer },
        profileUrl: { type: String, default: null },
        accountType: {
          type: String,
          enum: ["public", "private"],
          default: "public",
        },
      },
      {
        timestamps: true,
      }
    );

    this.userModel = mongoose.model("Users", this.UserSchema);
  }
}

const userModel = new UserModel();
module.exports = userModel;
