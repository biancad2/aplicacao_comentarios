const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const authConfig = require('../../config/auth.json');

const Participant = require('../models/participants');

const router = express.Router();

//Gerar Token

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
};

//Registrar

router.post('/register', async (req, res) => {
    const { userName } = req.body;
    try {
        if (await Participant.findOne({ userName }))
            return res.status(400).send({ error: "User already exists" });
        
        const participant = await Participant.create(req.body);

        return res.send({
            participant,
            token: generateToken({ id: participant.id }),
        });

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

//Autenticar

router.post('/authenticate', async (req, res) => {
    const { userName } = req.body;

    const user = await Participant.findOne({ userName });
    
    if (!user){
        return res.status(400).send({ error: "User not found" });
    }

    res.send({
        user,
        token: generateToken({ id: user.id })
    });
});

router.get('/', async (req,res) => {
    try {
        const usuarios = await Participant.find({ });
        return res.send({usuarios});
    } catch (err) {
        return res.status(400).send({error: 'There is something wrong with the database, please check again'});
    }
    
});

module.exports = app => app.use('/auth', router);