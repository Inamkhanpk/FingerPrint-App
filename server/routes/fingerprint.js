const express = require("express");
const router = express.Router();
const fingerprintController = require("../controller/fingerprintController");


// POST request to add a fingerprint for a user
router.post("/takefingerprint", fingerprintController.saveFingerprint);

// // GET request to get the fingerprint history for a user
router.get(
  "/getFingerPrintHistory/:userId",
  fingerprintController.getFingerPrintHistory
);

module.exports = router;
