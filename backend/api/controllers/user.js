const bcrypt = require('bcrypt');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

module.exports.createUser = (req, res) => {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        .test(req.body.email) == false) {
        return res.status(400).json({message: 'Invalid email'});
    }
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        req.body.password) == false) {
        return res.status(400).json({message: 'Invalid password'})
    }
    if (!req.body.name) {
        return res.status(400).json({message: 'Invalid name'})
    }
    db.query('SELECT * FROM User WHERE email = ?', req.body.email, (err, result) => {
        // console.log(result);
        if (result.length > 0) {
            return res.status(409).json({message: 'User already exists'});
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({error: err});
                } else {
                    const userId = uuidv4();
                    db.query(
                        `INSERT INTO User (id, name, email, password, type) VALUES (?, ?, ?,?,?)`,
                        [userId, req.body.name, req.body.email, hash, 'student'],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json({error: err});
                            }

                            // console.log(result);
                            const token = jwt.sign(
                                {
                                    email: req.body.email,
                                    userId: req.body.id,
                                    type: req.body.type
                                },
                                'secret', {expiresIn: '14d'});
                            res.status(201).json(
                                {message: 'User created', token: token , userId: userId});
                        });
                }
            });
        }
    });
};

module.exports.login = (req, res) => {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        .test(req.body.email) == false) {
        return res.status(400).json({message: 'Invalid email'});
    }
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        req.body.password) == false) {
        return res.status(400).json({message: 'Invalid password'})
    }

    db.query(
        'SELECT * FROM User WHERE email = ?', req.body.email, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json({error: err});
            }
            if (user.length <= 0) {
                return res.status(401).json({message: 'Auth failed'});
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({message: 'Auth failed'});
                }
                if (result) {
                    const userId = user[0].id;
                    const token = jwt.sign(
                        {email: user[0].email, userId: user[0].id, type: user[0].type},
                        'secret', {expiresIn: '14d'});
                    return res.status(200).json(
                        {message: 'Auth successful', token: token, userId: userId , type: user[0].type});
                } else {
                    return res.status(401).json({message: 'Auth failed'});
                }
            })
        })
};

module.exports.deleteUser = (req, res) => {
    db.query(
        'SELECT * FROM User WHERE id = ?', req.params.userId, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json({error: err});
            }
            console.log(user);
            if (user.length <= 0) {
                return res.status(500).json({message: 'User not found'});
            }
            db.query(
                'DELETE FROM User WHERE id = ?', req.params.userId,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({error: err});
                    }
                    return res.status(200).json({message: 'User deleted'});
                })
        })
};