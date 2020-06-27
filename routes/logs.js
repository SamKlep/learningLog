const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

const Log = require('../models/log')

// @desc        Show add page
// @ route      GET /logs/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('logs/add')
})

// @desc        Process add form
// @ route      POST /logs
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Log.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

// @desc        Show all logs
// @ route      GET /logs
router.get('/', ensureAuth, async (req, res) => {
    try {
        const logs = await Log.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

            res.render('logs/index', {
                logs,
            })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }
})

module.exports = router