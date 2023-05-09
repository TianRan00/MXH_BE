const express = require('express');
const {PerPage} = require('../../controllers/PerPage')
const PerPageRouter =express.Router();

PerPageRouter.get("/perpage", PerPage)

module.exports = PerPageRouter;