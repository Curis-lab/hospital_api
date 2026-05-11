import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    type: {
      type: String,
      enum: [
        "APPOINTMENT_BOOKED",
        "APPOINTMENT_CONFIRMED",
        "APPOINTMENT_CANCELLED",
        "APPOINTMENT_COMPLETED",
        "APPOINTMENT_REMINDER",
        "PAYMENT_SUCCESS",
        "PAYMENT_FAILED",
        "DOCTOR_MESSAGE",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    deliveryMethod: {
      type: [String],
      enum: ["IN_APP", "EMAIL", "SMS", "PUSH"],
      default: ["IN_APP"],
    },

    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);