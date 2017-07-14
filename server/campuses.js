'use strict'
const router = require('express').Router()
const Campus = require('../db/models').Campus
module.exports = router

router.get('/', (req, res, next) => {
	Campus.findAll()
	.then(campuses => res.json(campuses))
	.catch(next)
})

router.get('/:id', (req, res, next) => {
	Campus.findById(req.params.id)
	.then(foundCampus => res.json(foundCampus))
	.catch(next)
})

router.post('/', (req, res, next) => {
	Campus.create(req.body)
	.then(newCampus => res.json(newCampus))
	.catch(next)
})

router.put('/', (req, res, next) => {
	Campus.update(req.body, {where: {id: req.params.id}, returning: true})
	.then(() => res.sendStatus(204))
	.catch(next)
})

router.delete('/:id', (req, res, next) => {
	Campus.destroy({where: {id: +req.params.id}})
	.then(() => res.status(202).send('Campus shut down.'))
	.catch(next)
})
