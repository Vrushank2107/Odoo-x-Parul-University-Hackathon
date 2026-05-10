import { notesService } from '../services/notesService.js'
import { successResponse, createPaginationResponse, sendResponse } from '../utils/response.js'

export const notesController = {
  // Create note
  async createNote(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const noteData = req.body

      const note = await notesService.createNote(tripId, userId, noteData)

      const response = successResponse(
        'Note created successfully',
        note,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all notes for a trip
  async getTripNotes(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const notes = await notesService.getTripNotes(tripId, userId)

      const response = successResponse(
        'Notes retrieved successfully',
        notes
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get note by ID
  async getNote(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user?.id

      const note = await notesService.getNoteById(id, userId)

      const response = successResponse(
        'Note retrieved successfully',
        note
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update note
  async updateNote(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const updateData = req.body

      const note = await notesService.updateNote(id, userId, updateData)

      const response = successResponse(
        'Note updated successfully',
        note
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete note
  async deleteNote(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const result = await notesService.deleteNote(id, userId)

      const response = successResponse(
        'Note deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Search notes within a trip
  async searchTripNotes(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const { q } = req.query
      const { page, limit } = req.query

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        })
      }

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20
      }

      const result = await notesService.searchTripNotes(tripId, userId, q, options)

      const response = createPaginationResponse(
        result.notes,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get user's notes across all trips
  async getUserNotes(req, res, next) {
    try {
      const userId = req.user.id
      const { page, limit, tripId } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        tripId
      }

      const result = await notesService.getUserNotes(userId, options)

      const response = createPaginationResponse(
        result.notes,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Toggle note visibility
  async toggleNoteVisibility(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const note = await notesService.toggleNoteVisibility(id, userId)

      const response = successResponse(
        'Note visibility toggled successfully',
        note
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get note statistics for a trip
  async getTripNoteStats(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const stats = await notesService.getTripNoteStats(tripId, userId)

      const response = successResponse(
        'Note statistics retrieved successfully',
        stats
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
