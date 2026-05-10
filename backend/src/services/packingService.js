import prisma from '../config/prisma.js'
import { createPaginationOptions } from '../utils/helpers.js'

export const packingService = {
  // Create checklist item for a trip
  async createChecklistItem(tripId, userId, itemData) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const item = await prisma.checklistItem.create({
      data: {
        ...itemData,
        tripId
      }
    })

    return item
  },

  // Get all checklist items for a trip
  async getTripChecklist(tripId, userId = null) {
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

    const items = await prisma.checklistItem.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { createdAt: 'asc' }
      ]
    })

    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    }, {})

    // Calculate packing progress
    const totalItems = items.length
    const packedItems = items.filter(item => item.isPacked).length
    const packingProgress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0

    return {
      items: groupedItems,
      totalItems,
      packedItems,
      packingProgress,
      allItems: items
    }
  },

  // Update checklist item
  async updateChecklistItem(itemId, userId, updateData) {
    // Verify user owns the trip containing this item
    const item = await prisma.checklistItem.findFirst({
      where: { id: itemId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!item || item.trip.userId !== userId) {
      throw new Error('Checklist item not found or access denied')
    }

    const updatedItem = await prisma.checklistItem.update({
      where: { id: itemId },
      data: updateData
    })

    return updatedItem
  },

  // Delete checklist item
  async deleteChecklistItem(itemId, userId) {
    // Verify user owns the trip containing this item
    const item = await prisma.checklistItem.findFirst({
      where: { id: itemId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!item || item.trip.userId !== userId) {
      throw new Error('Checklist item not found or access denied')
    }

    await prisma.checklistItem.delete({
      where: { id: itemId }
    })

    return { success: true, message: 'Checklist item deleted successfully' }
  },

  // Toggle item packed status
  async toggleItemPacked(itemId, userId) {
    // Verify user owns the trip containing this item
    const item = await prisma.checklistItem.findFirst({
      where: { id: itemId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!item || item.trip.userId !== userId) {
      throw new Error('Checklist item not found or access denied')
    }

    const updatedItem = await prisma.checklistItem.update({
      where: { id: itemId },
      data: { isPacked: !item.isPacked }
    })

    return updatedItem
  },

  // Bulk update checklist items
  async bulkUpdateChecklist(tripId, userId, updates) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    // Update items in a transaction
    const updatePromises = updates.map(({ id, ...updateData }) =>
      prisma.checklistItem.updateMany({
        where: { 
          id,
          trip: { userId } // Ensure user owns the item
        },
        data: updateData
      })
    )

    await prisma.$transaction(updatePromises)

    // Return updated checklist
    return await this.getTripChecklist(tripId, userId)
  },

  // Get packing suggestions based on trip type and destination
  async getPackingSuggestions(tripId, userId) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    // Predefined packing suggestions based on trip type
    const suggestions = {
      LEISURE: [
        { category: 'Clothing', items: ['T-shirts', 'Shorts', 'Swimwear', 'Sandals', 'Hat'] },
        { category: 'Toiletries', items: ['Sunscreen', 'Toothbrush', 'Shampoo', 'Deodorant'] },
        { category: 'Electronics', items: ['Phone charger', 'Camera', 'Headphones'] },
        { category: 'Documents', items: ['Passport', 'Tickets', 'Insurance'] }
      ],
      BUSINESS: [
        { category: 'Clothing', items: ['Business suits', 'Dress shirts', 'Ties', 'Dress shoes'] },
        { category: 'Electronics', items: ['Laptop', 'Charger', 'Power bank', 'Notebook'] },
        { category: 'Documents', items: ['Business cards', 'Presentation files', 'ID'] }
      ],
      ADVENTURE: [
        { category: 'Clothing', items: ['Hiking boots', 'Weatherproof jacket', 'Quick-dry clothes'] },
        { category: 'Gear', items: ['Backpack', 'Water bottle', 'First aid kit', 'Flashlight'] },
        { category: 'Safety', items: ['Emergency whistle', 'Map', 'Compass'] }
      ],
      FAMILY: [
        { category: 'Baby/Kids', items: ['Diapers', 'Baby food', 'Toys', 'Extra clothes'] },
        { category: 'Health', items: ['Medications', 'First aid kit', 'Thermometer'] },
        { category: 'Entertainment', items: ['Tablet', 'Games', 'Books'] }
      ]
    }

    // Get existing items to avoid duplicates
    const existingChecklist = await prisma.checklistItem.findMany({
      where: { tripId },
      select: { title: true }
    })

    const existingTitles = new Set(existingChecklist.map(item => item.title.toLowerCase()))

    // Filter out already existing items
    const tripSuggestions = suggestions[trip.tripType] || suggestions.LEISURE
    
    const filteredSuggestions = tripSuggestions.map(category => ({
      ...category,
      items: category.items.filter(item => !existingTitles.has(item.toLowerCase()))
    }))

    return {
      tripType: trip.tripType,
      destination: trip.destination,
      suggestions: filteredSuggestions
    }
  },

  // Get packing statistics
  async getPackingStats(tripId, userId) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId },
      include: {
        checklistItems: true
      }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const items = trip.checklistItems
    const totalItems = items.length
    const packedItems = items.filter(item => item.isPacked).length
    const unpackedItems = totalItems - packedItems
    const packingProgress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0

    // Group by category
    const categoryStats = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          total: 0,
          packed: 0,
          percentage: 0
        }
      }
      acc[item.category].total++
      if (item.isPacked) {
        acc[item.category].packed++
      }
      acc[item.category].percentage = (acc[item.category].packed / acc[item.category].total) * 100
      return acc
    }, {})

    return {
      totalItems,
      packedItems,
      unpackedItems,
      packingProgress,
      categoryStats,
      isComplete: packingProgress === 100
    }
  },

  // Duplicate checklist from another trip
  async duplicateChecklist(fromTripId, toTripId, userId) {
    // Verify user owns both trips
    const [fromTrip, toTrip] = await Promise.all([
      prisma.trip.findFirst({ where: { id: fromTripId, userId } }),
      prisma.trip.findFirst({ where: { id: toTripId, userId } })
    ])

    if (!fromTrip || !toTrip) {
      throw new Error('Trip not found or access denied')
    }

    // Get checklist items from source trip
    const sourceItems = await prisma.checklistItem.findMany({
      where: { tripId: fromTripId }
    })

    if (sourceItems.length === 0) {
      return { success: true, message: 'No items to duplicate' }
    }

    // Create new items for destination trip
    const newItems = sourceItems.map(item => ({
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      category: item.category,
      tripId: toTripId
    }))

    await prisma.checklistItem.createMany({
      data: newItems
    })

    return {
      success: true,
      message: `Duplicated ${newItems.length} checklist items`,
      duplicatedCount: newItems.length
    }
  }
}
