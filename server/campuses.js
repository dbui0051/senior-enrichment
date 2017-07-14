'use strict'
const router = require('express').Router()
const Campus = require('../db/models').Campus
module.exports = router

router.get('/', (req, res, next) => {
	Campus.findAll()
	.then(campuses => res.json(campuses))
	.catch(next)
})

router.post('/', (req, res, next) => {
	Campus.create(req.body)
	.then(newCampus => res.json(newCampus))
	.catch(next)
})
