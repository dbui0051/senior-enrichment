const Promise = require('bluebird')
const db = require('./db')
const Student = require('./db/models').Student
const Campus = require('./db/models').Campus

const studentsList = [
	{name: 'Aaron Anderson', email: 'aaron@email.com'},
	{name: 'Bart Bradley', email: 'bart@email.com'},
	{name: 'Carl Carlson', email: 'carl@email.com'},
	{name: 'Dude Dood', email: 'dude@email.com'},
]

const campusList = [
	{name: 'New York University', details: 'Among the top educational institutions in the world. It has been around for decades.Come join the brightest minds our campus has to offer.'},
	{name: 'Manhatten Tech', details: 'Among the top educational institutions in the world. It has been around for decades. Come join the brightest minds our campus has to offer.'},
	{name: 'Queens Institute', details: 'Among the top educational institutions in the world. It has been around for decades. Come join the brightest minds our campus has to offer.'},
	{name: 'Brooklyn College', details: 'Among the top educational institutions in the world. It has been around for decades. Come join the brightest minds our campus has to offer.'},
]

db.sync({force: true})
.then(() => {
	return Promise.map(campusList, campus => Campus.create(campus))
})
.then(() => {
	return Promise.map(studentsList, (student, index) => {
		Student.create({name: student.name, email: student.email}, {include: [{model: Campus}]})
		.then((newStudent) => newStudent.setCampus(index + 1))
	})
})
.then(() => {
	Student.create({name: 'Random Dude', email: 'random@email.com'}, {include: [{model: Campus}]})
	.then(newStudent => newStudent.setCampus(2))
})
.then(() => console.log('Finished seeding database!'))
.then(() => console.log('Press control + c to escape'))
.catch(err => console.log(err))
