let homeController=require('./home-controller')
let usersController=require('./user-controller')
let categoryController=require('./category-controller')
let forumThreadController=require('./forum-thread-controller')
module.exports={
	home: homeController,
	users: usersController,
	forumThread: forumThreadController,
	category:categoryController
}