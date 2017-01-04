const mongoose=require('mongoose')

let requiredValidationMessage='{Path} is required'

let categorySchema = new mongoose.Schema({
	title : { type: String, require: requiredValidationMessage,unique:true},
	forum_threads:[{type:mongoose.Schema.Types.ObjectId,ref:'ForumThread'}]
})
mongoose.model('Category',categorySchema)
