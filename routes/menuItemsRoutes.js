const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/menu')

const tastes = ['Sweet', 'Spicy', 'Sour'];

router.post('/', async (req, res) => {

    try {
        const data = req.body;

        const newMenu = new MenuItem(data)

        const response = await newMenu.save()
        console.log('Saved MenuItem Object')
        res.status(200).json(response)
    } catch (err) {
        console.log('Error on saving menu object', err)
        res.status(500).json({ err: 'Internal Server Error' })
    }

})

router.get('/', async function (req, res) {
    try {
        const menuItem = await MenuItem.find()
        res.status(200).json(menuItem)
    } catch (err) {
        console.log('Error on fetching persons object', err)
        res.status(500).json({ err: 'Internal Server Error' })
    }

})

router.get('/:tasteType', async function (req, res) {
    try {
        const tastType = req.params.tasteType;

        if (tastes.includes(tastType)) {
            const menuItem = await MenuItem.find({ taste: tastType })
            res.status(200).json(menuItem)
        } else {
            res.status(404).json({ err: 'Not found ' + tastType })
        }
    } catch (err) {
        console.log('Error on fetching menu object', err)
        res.status(500).json({ err: 'Internal Server Error' })
    }

})

router.put('/:id', async (req, res) => {

    try {

        const menuId = req.params.id;

        const updateMenuData = req.body;

        const updatedMenu = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
            new: true,
            runValidators: true
        })

        console.log('Menu Item metadata is updated for ' + updatedMenu.name)
        res.status(200).json(updatedMenu)

    } catch (err) {
        res.status(500).json({ err: 'Internal Server Error ' })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: "Menu Item not found" });
        }

        console.log('Menu Itema metadata deleted');
        res.status(200).json({ message: 'Menu Iteam metadata deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error ' + menuId });
    }
});

module.exports = router