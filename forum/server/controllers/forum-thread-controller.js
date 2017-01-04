let ForumThread = require('mongoose').model('ForumThread')
let Answer = require('mongoose').model('Answer')
let Category = require('mongoose').model('Category')
module.exports = {
    create: (req, res)=> {
        Category.find().select('title').exec((err, model)=> {
            res.render('forum-thread/create', {categories: model})
        })
    },
    add: (req, res)=> {
        ForumThread.create({
            title: req.body.title,
            description: req.body.description,
            create_user: req.user._id
        }, (err, model)=> {
            if (err) {
                console.log(err)
                return
            }
            Category.update({title: req.body.selectpicker},
                {$push: {forum_threads: model._id}}).exec()
            res.redirect('/')
        })
    },

    find: (req, res)=> {
        let perPage = 5
        let myArr = []
        let page = req.query.page > 0 ? req.query.page - 1 : 0
        Category.findOne({title: req.params.title}).populate('forum_threads').exec((err, model)=> {
            let allpages = Math.ceil(model.forum_threads.length / perPage);
            for (let i = 0; i < allpages; i++) {
                myArr.push(i + 1)
            }
            let pages = perPage * page;
            let arrOfQuetsions = [];
            let border = pages + perPage;
            if (border > model.forum_threads.length) {
                border = model.forum_threads.length
            }
            for (let i = pages; i < border; i++) {
                arrOfQuetsions.push(model.forum_threads[i])
            }
            res.render('forum-thread/all-questions', {title: model.title, questions: arrOfQuetsions, myArr: myArr})
        })
        //     ForumThread.find().select('title').limit(perPage).skip(perPage * page)
        //         .sort({last_answer_date: -1})
        //         .exec(function (err, model) {
        //             ForumThread.count().exec(function (err, count) {
        //                 if (err) {
        //                     console.log(err)
        //                     return
        //                 }
        //
        //                 let allpages = Math.ceil(count / perPage);
        //
        //
        //
        //                 res.render('forum-thread/all-questions', {
        //                     myTitle: model,
        //                     myArr: myArr
        //                 })
        //             })
        //         })

    },
    delete: (req, res)=> {
        ForumThread.remove({title: req.params.name}).exec()
        res.redirect(req.header('Referer') || '/')
    },
    each: (req, res)=> {
        Answer.find({title: req.params.id}).sort({created_date: 1}).exec((err, model2)=> {
            if (err) {
                console.log(err)
                return
            }
            ForumThread.findById(req.params.id, (err, model)=> {
                let numberView;
                if (err) {
                    console.log(err)
                    return
                }
                numberView = model.views + 1
                ForumThread.findByIdAndUpdate(req.params.id, {
                    $set: {views: numberView}
                })
                    .exec()
                res.render('forum-thread/single-title', {question: model, answers: model2})
            })
        })
    },
    answer: (req, res)=> {
        Answer.create({
            description: req.body.description,
            create_user: req.user._id,
            title: req.params.title
        }).then(()=> {
            ForumThread
                .findByIdAndUpdate(req.params.title, {
                    $set: {last_answer_date: Date.now()}
                })
                .exec()
            res.redirect(req.header('Referer') || '/')
        })

    },

    dropanswer: (req, res)=> {
        Answer.remove({_id: req.params.id}).exec()
        res.redirect(req.header('Referer') || '/')

    }
}

