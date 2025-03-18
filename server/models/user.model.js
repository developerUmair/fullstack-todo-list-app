import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, true],
    },

    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      validate: {
        validator: function (value) {
          // Check for at least one uppercase letter
          const hasUppercase = /[A-Z]/.test(value);

          // Check for at least one number
          const hasNumber = /[0-9]/.test(value);

          // Check for at least one special character
          const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

          return hasUppercase && hasNumber && hasSpecial;
        },
        message:
          "Password must contain at least one uppercase letter, one number, and one special character",
      },
    },

    isAdmin: {
      type: Boolean,
      default: false
    },
    refreshToken: {
        type: String,  
        default: null,
      },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
