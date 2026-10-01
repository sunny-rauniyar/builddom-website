import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema(
  {
    companyName: {
      type: String,
      default: "BuildDom",
    },

    tagline: {
      type: String,
      default: "Build Better Together",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    footerText: {
      type: String,
      default: "© BuildDom. All Rights Reserved.",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);