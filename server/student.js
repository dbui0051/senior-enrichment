'use strict'
const router = require('express').Router()
const Student = require('../db/models').Student
const Campus = require('../db/models').Campus
module.exports = router

router.get('/', (req, res, next) => {
	Student.findAll({include: Campus})
	.then(students => res.json(students))
	.catch(next)
})
