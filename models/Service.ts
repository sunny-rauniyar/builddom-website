import mongoose, { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
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

const Service = models.Service || model("Service", ServiceSchema);

export default Service;