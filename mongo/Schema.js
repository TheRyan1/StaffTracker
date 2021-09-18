const Mongoose = require('mongoose')
require('mongoose-type-email')

const teachersSchema = new Mongoose.Schema({
    name: String,
    cntrct: Date,
    school: String,
    manager: Mongoose.SchemaTypes.Email,
    compApps: [],
    type: String,
    band: String
})

const Teacher = Mongoose.model('teachers', teachersSchema)

module.exports = Teacher;