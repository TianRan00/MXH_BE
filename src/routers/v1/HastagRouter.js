const express = require('express');
const {userHastag,sttHastag,grHastag} = require('../../controllers/HasTag')
const HastagRouter =express.Router();

HastagRouter.post("/userhastag", userHastag)
HastagRouter.post("/stthastag", sttHastag)
HastagRouter.post("/grhastag", grHastag)

module.exports = HastagRouter;