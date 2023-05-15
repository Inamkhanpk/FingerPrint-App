const mongoose = require("mongoose");

const userFingerprintSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fingerprintData: [
    {
      fingerprint: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("UserFingerprint", userFingerprintSchema);
