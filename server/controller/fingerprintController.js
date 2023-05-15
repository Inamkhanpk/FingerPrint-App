const UserFingerprint = require("../models/fingerprint");

const saveFingerprint = async (req, res) => {
  try {
    const userfingerprints = await UserFingerprint.findOne({
      userID: req.body.userId,
    });

    if (!userfingerprints) {
      const userFingerprint = new UserFingerprint({
        userID: req.body.userId,
        fingerprintData: [{ fingerprint: req.body.fingerprint }],
      });
      await userFingerprint.save();
    } else {
      userfingerprints.fingerprintData.push({
        fingerprint: req.body.fingerprint,
        time: Date.now(),
      });
      await userfingerprints.save();
    }
    res.status(200).json({ message: "Fingerprint data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFingerPrintHistory = async (req, res) => {
  try {
    const findUserFingerprintHistory = await UserFingerprint.find({
      userID: req.params.userId,
    });
    res.status(200).json({ findUserFingerprintHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveFingerprint, getFingerPrintHistory };
