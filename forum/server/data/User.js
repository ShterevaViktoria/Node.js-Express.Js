const mongoose = require('mongoose')
const encription = require('../utilities/encription')


let requiredValidationMessage = '{Path} is required'

let userSchema = new mongoose.Schema({
    username: {type: String, require: requiredValidationMessage, unique: true},
    firstName: {type: String, require: requiredValidationMessage},
    lastName: {type: String, require: requiredValidationMessage},
    salt: String,
    hashedPass: String,
    blocked: {type: Boolean, default: false},
    roles: [String]

})

userSchema.method({
    authenticate: function (password) {
        let inputPasswordH = encription.generateHashedPassword(this.salt, password)
        if (inputPasswordH === this.hashedPass) {
            return true
        } else {
            return false
        }


    }
})
let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
    User.find({}).then(users=> {
        if (users.length === 0) {
            let salt = encription.generateSalt()
            let hassedPass = encription.generateHashedPassword(salt, '1234')

            User.create({
                username: 'admin',
                firstName: 'admin',
                lastName: 'admin',
                salt: salt,
                hashedPass: hassedPass,
                roles: ['Admin']
            })
        }

    })

}
