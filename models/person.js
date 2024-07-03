const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const workTypes = ['chef', 'waiter', 'manager'];

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: workTypes,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this

    // if (!person.isModified('password')) return next()

    try {
        if (!person || !person.password) {
            throw new Error('Person or password is not defined')
        }

        const salt = await bcrypt.genSalt(10)

        if (!salt) {
            throw new Error('Salt generation failed')
        }

        const hashedPassword = await bcrypt.hash(person.password, salt)

        if (!hashedPassword) {
            throw new Error('Password hashing failed')
        }

        person.password = hashedPassword
        next()
    } catch (err) {
        console.error('Error hashing password:', err)
        return next(err)
    }



})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        throw err
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;