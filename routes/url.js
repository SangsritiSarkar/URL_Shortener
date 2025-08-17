const express = require("express");
const {
    handleGenerateNewShortUrl,
    handleGetShortUrl,
    handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortURL", handleGetShortUrl);
router.get("/analytics/:shortURL", handleGetAnalytics);

module.exports = router;