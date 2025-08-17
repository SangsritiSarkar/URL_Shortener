const shortid  = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is requierd!"});
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({id: shortID});
};

async function handleGetShortUrl(req,res){
  const shorturl = req.params.shortURL;
  const entry = await URL.findOneAndUpdate(
    {shortId: shorturl}, //maps shortId of URL to shorturl of the req url
    {
        $push: {visitHistory: {timestamp: Date.now()}}
    },
  );
  res.redirect(entry.redirectURL);

};


async function handleGetAnalytics(req,res){
    const shorturl = req.params.shortURL;
    const entry = await URL.findOne({shortId: shorturl});
    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory,
    });
};

module.exports = {
    handleGenerateNewShortUrl,
    handleGetShortUrl,
    handleGetAnalytics,
};