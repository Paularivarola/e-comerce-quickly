const User = require ("../models/User")
const bcryptjs = require ("bcryptjs")
const jwt = require ("jsonwebtoken")

const userControllers = {
    createUser: async (req, res) => {
        const {name, lastName, mail, profilePicture, pass, google} = req.body
        let hashedPass = bcryptjs.hashSync(pass)
        const user = new User ({
            firstName: name,
            lastName,
            email: mail,
            password: hashedPass
        })
        User.findOne({email: mail})
        .then((userExist) => {
            if(userExist){
                res.json({success: false, response:null, error: "El mail ya tiene una cuenta asociada"})
            } else {
                // user.save()
                // .then(() => {
                //     const token = jwt.sign({...userExist}, process.env.TOKENKEY)
                //      res.json({success: true, response: {userName: userExist.forstName, token: token, userId: userExist._id}})
                // })
                console.log("GRABAR", user)
            }
        })
        .catch(() => res.json({success: false, response: null, error: "Error!"}))
    },
    logUser: async (req, res) => {
        const {mail, password, logGoogle} = req.body
        User.findOne({email: mail})
        .then(userExist => {
            if(!userExist){
                res.json({success: false, response: "Mail y/o contraseña incorrecta"})
            }
            if(userExist.google && !logGoogle){
                res.json({success: false, response: "You created your account with Google, please log in with them"})
            }
            if(bcryptjs.compareSync(password, userExist.password)){
                const token = jwt.sign({...userExist}, process.env.TOKENKEY)
                res.json({success: true, response: {userName: userExist.forstName, token: token, userId: userExist._id}})
            } else {
                res.json({success: false, response: "Mail y/o contraseña incorrecta"})
            }
        })
        .catch(() => res.json({success: false, response: "Error!"}))
    },
    readUser: async (req, res) => {

    },
    updateUser: async (req, res) => {

    },
    deleteUser: async (req, res) => {

    },
    readAllUsers: async (req, res) => {

    }
}

module.exports = userControllers