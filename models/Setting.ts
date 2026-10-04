import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema(
  {
    companyName: {
      type: String,
      default: "BuildDom",
    },

    tagline: {
      type: String,
      default: "Build Better Together...",
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

    // Hero Statistics
    projectsCompleted: {
      type: String,
      default: "250+",
    },

    happyClients: {
      type: String,
      default: "500+",
    },

    yearsExperience: {
      type: String,
      default: "10+",
    },

    // Hero Content
    heroBadge: {
      type: String,
      default: "Trusted Construction & Engineering Company",
    },

    heroHeading: {
      type: String,
      default: "Building Beyond Structures. Building Trust.",
    },

    heroDescription: {
      type: String,
      default:
        "BuildDom delivers innovative engineering, architecture and construction solutions across Nepal with an unwavering commitment to quality, safety and sustainable development.",
    },

    heroPrimaryButton: {
      type: String,
      default: "Request Consultation",
    },

    heroSecondaryButton: {
      type: String,
      default: "View Projects",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);