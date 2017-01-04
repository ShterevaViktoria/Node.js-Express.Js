let encryption = require('../utilities/encription')
let User = require('mongoose').model('User')
let ForumThread = require('mongoose').model('ForumThread')
let Answer = require('mongoose').model('Answer')

module.exports = {
    login: (req, res)=> {
        res.render('users/login')
    },
    authenticate: (req, res)=> {
        let inputUser = req.body
        User.findOne({username: inputUser.username})
            .then(user => {
                if (user === null) {
                    res.render('users/login', {globalError: 'Invalid username or password'})
                }
                else if (!user.authenticate(inputUser.password)) {
                    res.render('users/login', {globalError: 'Invalid username or password'})
                } else {
                    req.logIn(user, (err, user)=> {
                        if (err) {
                            res.render('users/login', {globalError: 'Fatal 500'})
                            return
                        }

                        res.redirect('/')
                    })
                }
            })
    },
    register: (req, res)=> {
        res.render('users/register')
    },
    create: (req, res)=> {
        let user = req.body

        User.findOne({username: user.username})
            .then(userDb => {
                if (userDb === null) {
                    if (user.password !== user.confirmPassword) {
                        user.globalError = 'Password do not match'
                        res.render('users/register', user)
                        return
                    } else {
                        user.salt = encryption.generateSalt()
                        user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

                        User.create(user).then(user=> {
                            req.logIn(user, (err, user)=> {
                                if (err) {
                                    res.render('users/register', {globalError: 'Fatal 500'})
                                    return
                                }
                                res.redirect('/')
                            })

                        })
                    }
                }
                else {
                    res.render('users/register', {globalError: 'Username is used'})
                    return
                }
            })
    },
    logout: (req, res)=> {
        req.logout()
        res.redirect('/')

    },
    profile: (req, res)=> {
        ForumThread.find({create_user: req.user._id}).exec((err, model)=> {
            if (err) {
                console.log(err)
                return

            }

            Answer.find({create_user: req.user._id}).exec((err, model2)=> {
                if (err) {
                    console.log(err)
                    return

                }
                res.render('users/profile', {user: req.user, arr: model, jj: model2})
            })
        })
    },
    all: (req, res)=> {
        User.find({username: {$ne: 'Admin'}}).exec((err, model)=> {
            res.render('users/all', {arr: model})
        })
    }
}