const express = require('express');
const { find } = require('./models/addLightReading');
const addLightReading = require('./models/addLightReading');
const relayState = require('./models/relayState');
const router = express();

router.post('/api/addLight', (req, res) =>{
    const newValue = new addLightReading({
        name: req.body.name, 
        light: req.body.light,
    });

    newValue.save()
    .then(item => {
        res.json(item)
    })
    .catch(err => {
       res.status(400).json({msg:"There is an error", err}); 
    });
});

router.get('/api/getLight/:name', async (req, res) =>{
    const findAll = await addLightReading.find();
    const arrayName = findAll.filter(item => item.name == req.params.name);
    res.json(arrayName);
});

router.get('/api/getLastLight/:name', async (req, res) =>{
    const findAll = await addLightReading.find();
    const arrayName = findAll.filter(item => item.name == req.params.name);
    arrayLength = arrayName.length
    arrayLength = arrayLength - 1
    res.json(arrayName[arrayLength]);
});

router.patch ('/api/updateRelay/:name', async (req, res) => {
    const findAll = await relayState.find();
    const arrayName = findAll.filter(item => item.name == req.params.name);
    currentId = "";

    if (arrayName.length === 0){
        const newValue = new relayState({
            name: req.params.name, 
            relay: req.body.relay,
        });
        newValue.save()
        .then(item2 => {
            res.json(item2)
        })
        .catch(err => {
           res.status(400).json({msg:"There is an error", err}); 
        });
    }
    else{
        currentId = arrayName[0]._id

        const findRelay = await relayState.updateOne(
            {_id:currentId},
            {$set: {
                relay: req.body.relay
                }
            }
        );
        res.json(findRelay);
    }

    
})

router.get('/api/getRelay/:name', async (req, res) =>{
    const findAll = await relayState.find();
    const arrayName = findAll.filter(item => item.name == req.params.name);

    if (arrayName.length === 0){
        const newValue = new relayState({
            name: req.params.name, 
            relay: false,
        });
        newValue.save()
        .then(item2 => {
            res.json(item2)
        })
        .catch(err => {
           res.status(400).json({msg:"There is an error", err}); 
        });
    }else{
        res.json(arrayName[0]);
    }

    
});

router.get('/api/getAllRelay/', async (req, res) =>{
    const findAll = await relayState.find();
    res.json(findAll);
});

module.exports = router;