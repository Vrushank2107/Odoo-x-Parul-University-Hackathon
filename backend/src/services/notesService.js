import prisma from '../config/prisma.js'
import { createPaginationOptions } from '../utils/helpers.js'

export const notesService = {
  // Create note for a trip
  async createNote(tripId, userId, noteData) {
    // Verify user owns trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const note = await prisma.note.create({
      data: {
        ...noteData,
        tripId,
        authorId: userId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return note
  },

  // Get all notes for a trip
  async getTripNotes(tripId, userId = null) {
    const where = { tripId }

    // If userId is provided, verify access
    if (userId) {
      const trip = await prisma.trip.findFirst({
        where: {
          OR: [
            { id: tripId, userId },
            { id: tripId, isPublic: true }
          ]
        }
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }
    }

    const notes = await prisma.note.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return notes
  },

  // Get note by ID
  async getNoteById(noteId, userId = null) {
    const where = { id: noteId }

    // If userId is provided, verify access
    if (userId) {
      const note = await prisma.note.findFirst({
        where: {
          id: noteId,
          OR: [
            { trip: { userId } }, // User owns the trip
            { isPublic: true }, // Note is public
            { authorId: userId } // User is the author
          ]
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      })

      if (!note) {
        throw new Error('Note not found or access denied')
      }

      return note
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    if (!note) {
      throw new Error('Note not found')
    }

    return note
  },

  // Update note
  async updateNote(noteId, userId, updateData) {
    // Verify user is the author of the note
    const note = await prisma.note.findFirst({
      where: { id: noteId, authorId: userId }
    })

    if (!note) {
      throw new Error('Note not found or access denied')
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return updatedNote
  },

  // Delete note
  async deleteNote(noteId, userId) {
    // Verify user is the author of the note or owns the trip
    const note = await prisma.note.findFirst({
      where: { id: noteId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!note) {
      throw new Error('Note not found')
    }

    if (note.authorId !== userId && note.trip.userId !== userId) {
      throw new Error('Access denied')
    }

    await prisma.note.delete({
      where: { id: noteId }
    })

    return { success: true, message: 'Note deleted successfully' }
  },

  // Search notes within a trip
  async searchTripNotes(tripId, userId, query, options = {}) {
    const { page = 1, limit = 20 } = options
    const { skip, take } = createPaginationOptions(page, limit)

    // Verify access to trip
    const trip = await prisma.trip.findFirst({
      where: {
        OR: [
          { id: tripId, userId },
          { id: tripId, isPublic: true }
        ]
      }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const where = {
      tripId,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } }
      ]
    }

    const [notes, total] = await Promise.all([
      prisma.note.findMany({
        where,
        skip,
        take,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.note.count({ where })
    ])

    return {
      notes,
      total,
      page,
      limit,
      query
    }
  },

  // Get user's notes across all trips
  async getUserNotes(userId, options = {}) {
    const { page = 1, limit = 20, tripId } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const where = { authorId: userId }

    if (tripId) {
      where.tripId = tripId
    }

    const [notes, total] = await Promise.all([
      prisma.note.findMany({
        where,
        skip,
        take,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          trip: {
            select: {
              id: true,
              title: true,
              destination: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.note.count({ where })
    ])

    return {
      notes,
      total,
      page,
      limit
    }
  },

  // Toggle note visibility (public/private)
  async toggleNoteVisibility(noteId, userId) {
    // Verify user is the author
    const note = await prisma.note.findFirst({
      where: { id: noteId, authorId: userId }
    })

    if (!note) {
      throw new Error('Note not found or access denied')
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { isPublic: !note.isPublic },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return updatedNote
  },

  // Get note statistics for a trip
  async getTripNoteStats(tripId, userId = null) {
    // Verify access to trip
    const trip = await prisma.trip.findFirst({
      where: {
        OR: [
          { id: tripId, userId },
          { id: tripId, isPublic: true }
        ]
      }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const [totalNotes, publicNotes, authorNotes] = await Promise.all([
      prisma.note.count({ where: { tripId } }),
      prisma.note.count({ where: { tripId, isPublic: true } }),
      userId ? prisma.note.count({ where: { tripId, authorId: userId } }) : 0
    ])

    return {
      totalNotes,
      publicNotes,
      privateNotes: totalNotes - publicNotes,
      userNotes: authorNotes
    }
  }
}
