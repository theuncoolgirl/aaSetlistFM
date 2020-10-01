const express = require('express');
const handler = require('express-async-handler');
const setlistfm = require('setlistfm-js');
const { setlistfmKey } = require('../config/index')

const router = express.Router();

const setlistfmClient = new setlistfm({
    key: setlistfmKey,
    format: "json",
    language: "en",
    itemsPerPage: 5,
});

const searchResults = (searchTerm, page = 1) => {
    return setlistfmClient.searchSetlists({
        artistName: searchTerm
    }, page)
        .then(function (results) {
            console.log(results)
            return results
        })
        .catch(function (error) {
            return error
        });
}

// searchResults(`The Flatliners`, `2`);

router.get('/', handler(async (req, res) => {
    const { searchTerm, page } = req.body;
    if (searchTerm) {
        const results = await searchResults(searchTerm, page)
        return results;
    } else {
        return res.status(404).end();
    }
}));

module.exports = router;