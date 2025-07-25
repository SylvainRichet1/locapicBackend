var express = require('express');
var router = express.Router();
const Place = require('../models/places');

router.post('/' , (req, res)=> {
    Place.findOne({ 
        nickname: { $regex: new RegExp(req.body.nickname, 'i')},
        name: { $regex: new RegExp(req.body.name, 'i')},
    }).then(dbData=> {
        if (dbData === null) {
                    const newPlace = new Place({
                        nickname: req.body.nickname,
                        name: req.body.name,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                    });
                    newPlace.save().then(newDoc=>{
                        res.json({ result: true, places: newDoc})
                    });
        } else {
            res.json({ result: false, error: 'City already saved' });
        };
    });
});

router.get('/:nickname', (req, res) => {
    Place.find({
        nickname: { $regex: new RegExp(req.params.nickname, 'i')},
    }).then(data=>{
        if (data) {
            res.json({ result: true, places: data});
        } else {
            res.json({ result: false, error: 'Place not found'})
        };
    });
});

router.delete('/', (req, res) => {
    Place.deleteOne({
        nickname: { $regex: new RegExp(req.body.nickname, 'i')},
        name: { $regex: new RegExp(req.body.name, 'i')},
    }).then(deleteDoc => {
        if (deleteDoc) {
                res.json({ result: true });
        } else {
            res.json({ result: false, error: 'City not found' });
        };
    });
});

module.exports = router;