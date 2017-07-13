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
	{name: 'New York University'},
	{name: 'Manhatten Tech'},
	{name: 'Queens Institute'},
	{name: 'Brooklyn College'},
]

db.sync({force: true})
.then(() => {
	return Promise.map(campusList, campus => Campus.create(campus))
})
.then(() => {
	return Promise.map(studentsList, (student, index) => {
		Student.create({name: student.name, email: student.email}, {include: [{model: Campus}]})
		.then((newStudent) => newStudent.addCampus(index + 1))
	})
})
.then(() => {
	Student.create({name: 'Random Dude', email: 'random@email.com'}, {include: [{model: Campus}]})
	.then(newStudent => newStudent.addCampus(2))
})
.then(() => console.log('Finished seeding database!'))
.catch(err => console.log(err))

