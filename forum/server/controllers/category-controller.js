let Category = require('mongoose').model('Category')
let ForumThread = require('mongoose').model('ForumThread')

module.exports = {
    all: (req, res)=> {
        Category.find({}).sort({'title': 1}).exec((err, model)=> {
            if (err) {
                console.log(err)
                return

            }
            res.render('category/all', {categories: model})
        })
    },
    add: (req, res)=> {
        Category.create({title: req.body.title}).then(()=> {
            res.redirect(req.header('Referer') || '/')
        })
    },
    remove: (req, res)=> {
        Category.remove({title: req.params.category}).exec()
        res.redirect(req.header('Referer') || '/')
    }
}


