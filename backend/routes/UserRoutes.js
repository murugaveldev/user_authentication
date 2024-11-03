const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')

const router = express.Router()

//register
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {

        const userEmail = await User.findOne({ email })
        if (userEmail) {
            res.status(400).json({ message: "user already exit" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = new User({ username, email, password: hashpassword, role })
        const userData = await user.save()

        res.status(200).json({ message: 'user create successfully', userData })

    } catch (error) {
        res.status(500).json({ message: 'User creation failed', error });
    }
})


//login
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const userAuth = await User.findOne({ email })
        if (!userAuth) {
            res.status(400).json({ message: 'user email not found' })
        }

        const isMatch = await bcrypt.compare(password, userAuth.password,)
        if (!isMatch) {
            res.status(400).json({ message: "user password error" })
        }

        const token = jwt.sign({ id: userAuth._id, role: userAuth.role }, process.env.JWTSCR, { expiresIn: '10m' })

        res.status(200).json({ message: 'login successfull', token, role: userAuth.role })

    } catch (error) {
        res.status(400).json({ message: 'login failed', error })

    }

})

//get users
router.get('/user', async (req, res) => {

    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
        res.status(400).json({ message: 'access denied' })
    }

    try {

        const verfied = jwt.verify(token, process.env.JWTSCR)
        const user = await User.findById(verfied.id)

        if (!user || user.role !== 'admin') {
            res.status(400).json({ message: "acess denied admin" })
        }

        const data = await User.find()
        res.status(200).json({ message: 'user successfully recived', data })

    } catch (error) {

        res.status(400).json({ message: 'user failed' })

    }
})


module.exports = router