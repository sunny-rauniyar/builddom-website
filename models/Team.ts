import { Schema, model, models } from "mongoose";

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
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

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Team || model("Team", TeamSchema);