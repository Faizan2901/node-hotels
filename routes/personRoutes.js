const express = require('express')
const router = express.Router()
const Person = require('./../models/person')

const workTypes = ['chef', 'waiter', 'manager'];

router.post('/', async (req, res) => {

    try {
        const data = req.body;

        const newPerson = new Person(data)

        const response = await newPerson.save()
        console.log('Saved Person Object')
        res.status(200).json(response)
    } catch (err) {
        console.log('Error on saving person object', err)
        res.status(500).json({ err: 'Internal Server Error' })
    }

})

router.get('/', async function (req, res) {

    try {
        const personDate = await Person.find()
        res.status(200).json(personDate)
    } catch (err) {
        console.log('Error on fetching persons object', err)
        res.status(500).json({ err: 'Internal Server Error' })
    }

})

router.get('/:workType', async (req, res) => {

    const workType = req.params.workType;
    try {
        if (workTypes.includes(workType)) {
            const persons = await Person.find({ work: workType })
            console.log(workType)
            res.status(200).json(persons)
        } else {
            res.status(404).json({ err: 'Not found ' + workType })
        }
    } catch (err) {
        res.status(500).json({ err: 'Internal Server Error ' + workType })
    }


})

router.put('/:id', async (req, res) => {

    try {

        const personId = req.params.id;

        const updatePersonData = req.body;

        const updatedPerson = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true
        })

        console.log('Person data is updated for ' + updatePersonData.name)
        res.status(200).json(updatedPerson)

    } catch (err) {
        res.status(500).json({ err: 'Internal Server Error ' + personId })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log('Person data deleted');
        res.status(200).json({ message: 'Person data deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error ' + personId });
    }
});



module.exports = router