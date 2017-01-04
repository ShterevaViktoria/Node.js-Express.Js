const mongoose=require('mongoose')

let requiredValidationMessage='{Path} is required'

let answerSchema = new mongoose.Schema({
	description :{ type: String, require: requiredValidationMessage},
	created_date :	{type:Date, default:Date.now()},
	create_user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
	title:{type:mongoose.Schema.Types.ObjectId,ref:'ForumThread'}
})

mongoose.model('Answer',answerSchema)