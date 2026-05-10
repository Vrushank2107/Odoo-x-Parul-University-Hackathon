import express from 'express'
import { notesController } from '../controllers/notesController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'

const router = express.Router()

// All notes routes require authentication
router.use(authenticateToken)

// Note CRUD routes
router.post('/trips/:tripId/notes', validate(schemas.createNote), notesController.createNote)
router.get('/trips/:tripId/notes', notesController.getTripNotes)
router.get('/trips/:tripId/notes/stats', notesController.getTripNoteStats)
router.get('/trips/:tripId/notes/search', notesController.searchTripNotes)
router.get('/notes/:id', notesController.getNote)
router.put('/notes/:id', validate(schemas.updateNote), notesController.updateNote)
router.delete('/notes/:id', notesController.deleteNote)
router.patch('/notes/:id/toggle-visibility', notesController.toggleNoteVisibility)

// User notes routes
router.get('/user/notes', notesController.getUserNotes)

export default router
