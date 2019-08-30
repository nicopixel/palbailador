
const bcrypt = require('bcrypt')
const { User, Video } = require('../db/models')
const validator = require('validator')

const logic = {

    /**
     * Creates new user
     * 
     * @param {Object} userData 
     * @throws {Error} on non valid data 
     */

    registerUser: async (userData) => {

        const { nickname, email, password } = userData
        
        if (!validator.isEmail(email)) throw Error('non valid email')

        const user = await User.findOne({ email })
        if (user) throw Error(`user with email ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)
        
        return User.create({ nickname, email, password: hash })
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */

    authenticateUser: async (email, password) => {

        // todo validate

        const user = await User.findOne({ email })
        if (!user) throw Error(`user with email ${email} not found`)
        const match = bcrypt.compare(password, user.password)
        if (!match) throw Error('wrong credentials')
        return user

    },

    uploadVideo: async function (videoData){

        // todo validate

        return await Video.create(videoData)
        return this.__normalize__(responseUpload)
    },

    __normalize__: (doc) => {
        doc = doc.toJSON()
        console.log(doc.constructor)

        if (doc.constructor !== Object) throw TypeError('doc is not an abject')
        delete doc.__v
        doc.id = doc._id.toString()
        delete doc._id

        return doc
    }
}

module.exports = logic