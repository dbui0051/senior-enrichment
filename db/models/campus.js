'use strict'
const Sequelize = require('sequelize')
const db = require('../index.js')

const Campus = db.define('campus', {
	name: Sequelize.STRING,
	imageUrl: {
	    type: Sequelize.DataTypes.VIRTUAL,
	    get: function () {
	      return `/api/campus/${this.id}/image`;
	    }
	},
	details: Sequelize.TEXT
})

module.exports = Campus
