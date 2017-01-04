let controllers = require('../controllers')
let auth = require('./auth')

module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/:sort', controllers.home.index)
    app.get('/list/category/:title', controllers.forumThread.find)
    app.get('/users/login', controllers.users.login)
    app.post('/users/authenticate', controllers.users.authenticate)
    app.get('/users/register', controllers.users.register)
    app.post('/users/create', controllers.users.create)
    app.post('/users/logout', controllers.users.logout)
    app.get('/list/category', controllers.category.all)
    app.post('/category/add', auth.isInRole('Admin'), controllers.category.add)
    app.get('/remove/:category', auth.isInRole('Admin'), controllers.category.remove)
    app.get('/forum-thread/create', auth.isAuthenticated, controllers.forumThread.create)
    app.post('/forum-thread/add', auth.isAuthenticated, controllers.forumThread.add)
    app.get('/post/:id/:title', controllers.forumThread.each)
    app.get('/drop/:id', controllers.forumThread.dropanswer)
    app.get('/delete/:name', auth.isInRole('Admin'), controllers.forumThread.delete)
    app.post('/create/answer/:title', auth.isAuthenticated, controllers.forumThread.answer)
    app.get('/admins/all', auth.isInRole('Admin'), controllers.users.all)
    app.get('/profile', auth.isAuthenticated, controllers.users.profile)

    app.all('*', (req, res)=> {
        res.status(404)
        res.send('Not found')
        res.end()
    })

}
