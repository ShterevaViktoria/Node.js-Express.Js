const mongoose = require('mongoose')

let requiredValidationMessage = '{Path} is required'

let forumTreadSchema = new mongoose.Schema({
    title: {type: String, require: requiredValidationMessage},
    description: {type: String, require: requiredValidationMessage},
    created_date: {type: Date, default: Date.now()},
    create_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes: {type: Number, default: 0},
    views: {type: Number, default: 0}
})
mongoose.model('ForumThread', forumTreadSchema)


