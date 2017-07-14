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

router.get('/:id', (req, res, next) => {
	Student.findOne({where: {id: +req.params.id}, include: Campus})
	.then(foundStudent => res.json(foundStudent))
	.catch(next)
})

router.post('/', (req, res, next) => {
	Student.create({name: req.body.name, email: req.body.email})
	.then(newStudent => newStudent.setCampus(req.body.campusId))
	.then(createdStudent => res.status(201).json(createdStudent))
	.catch(next)
})

router.delete('/:id', (req, res, next) => {
	Student.destroy({where: {id: +req.params.id}})
	.then(() => res.status(202).send('Student expelled.'))
	.catch(next)
})

router.put('/:id', (req, res, next) => {
	Student.update(req.body, {where: {id: req.params.id}, include: Campus, returning: true})
	.then(() => res.sendStatus(204))
	.catch(next)
})
