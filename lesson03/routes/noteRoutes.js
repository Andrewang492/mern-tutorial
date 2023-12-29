const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)// apply middleware to all of it. Can do individually instead

router.route('/') //already at notes because specified in server.py
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote)

module.exports = router