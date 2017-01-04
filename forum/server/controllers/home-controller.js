let ForumThread = require('mongoose').model('ForumThread')

module.exports = {
    index: (req, res)=> {
        if (Object.getOwnPropertyNames(req.params).length === 0 || req.params.sort === 'newest') {
            ForumThread.find({}).sort({created_date: -1}).limit(10).exec((err, newest)=> {
                if (err) {
                    console.log(err)
                    return
                }
                res.render('home/index-sort', {questions: newest});
            })
        } else if (req.params.sort === 'viewed') {
            ForumThread.find({}).sort({views: -1}).limit(10).exec((err, viwed)=> {
                if (err) {
                    console.log(err)
                    return
                }
                res.render('home/index-sort', {questions: viwed});
            })
        } else if (req.params.sort === 'liked') {

            ForumThread.find({}).sort({likes: -1}).limit(10).exec((err, liked)=> {
                if (err) {
                    console.log(err)
                    return
                }
                res.render('home/index-sort', {questions: liked});
            })
        }
    }
}