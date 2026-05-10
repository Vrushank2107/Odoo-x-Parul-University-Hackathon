import Joi from 'joi'

// Validation schemas
export const schemas = {
  // Auth schemas
  signup: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  }),

  partialUpdateProfile: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    avatar: Joi.string().uri().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Trip schemas
  createTrip: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    destination: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
    budget: Joi.number().min(0).optional(),
    tripType: Joi.string().valid('LEISURE', 'BUSINESS', 'ADVENTURE', 'FAMILY', 'ROMANTIC', 'SOLO').default('LEISURE'),
    travelers: Joi.number().integer().min(1).default(1)
  }),

  updateTrip: Joi.object({
    title: Joi.string().min(1).max(100).optional(),
    destination: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
    startDate: Joi.date().iso().optional(),
    endDate: Joi.date().iso().optional(),
    budget: Joi.number().min(0).optional(),
    status: Joi.string().valid('PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELLED').optional(),
    tripType: Joi.string().valid('LEISURE', 'BUSINESS', 'ADVENTURE', 'FAMILY', 'ROMANTIC', 'SOLO').optional(),
    travelers: Joi.number().integer().min(1).optional()
  }),

  // Stop schemas
  createStop: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    date: Joi.date().iso().required(),
    order: Joi.number().integer().min(0).required(),
    location: Joi.string().max(200).optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional()
  }),

  updateStop: Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
    date: Joi.date().iso().optional(),
    order: Joi.number().integer().min(0).optional(),
    location: Joi.string().max(200).optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional()
  }),

  // Activity schemas
  createActivity: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    time: Joi.date().iso().optional(),
    duration: Joi.number().integer().min(0).optional(),
    cost: Joi.number().min(0).optional(),
    category: Joi.string().valid('SIGHTSEEING', 'DINING', 'SHOPPING', 'ADVENTURE', 'RELAXATION', 'CULTURE', 'TRANSPORTATION', 'ACCOMMODATION', 'ENTERTAINMENT', 'SPORTS', 'OTHER').required(),
    location: Joi.string().max(200).optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
    bookingRef: Joi.string().max(100).optional()
  }),

  updateActivity: Joi.object({
    name: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
    time: Joi.date().iso().optional(),
    duration: Joi.number().integer().min(0).optional(),
    cost: Joi.number().min(0).optional(),
    category: Joi.string().valid('SIGHTSEEING', 'DINING', 'SHOPPING', 'ADVENTURE', 'RELAXATION', 'CULTURE', 'TRANSPORTATION', 'ACCOMMODATION', 'ENTERTAINMENT', 'SPORTS', 'OTHER').optional(),
    location: Joi.string().max(200).optional(),
    latitude: Joi.number().min(-90).max(90).optional(),
    longitude: Joi.number().min(-180).max(180).optional(),
    bookingRef: Joi.string().max(100).optional(),
    isCompleted: Joi.boolean().optional()
  }),

  // Budget schemas
  createBudget: Joi.object({
    category: Joi.string().valid('ACCOMMODATION', 'TRANSPORTATION', 'FOOD', 'ACTIVITIES', 'SHOPPING', 'ENTERTAINMENT', 'EMERGENCY', 'OTHER').required(),
    allocated: Joi.number().min(0).required(),
    description: Joi.string().max(500).optional()
  }),

  updateBudget: Joi.object({
    allocated: Joi.number().min(0).optional(),
    spent: Joi.number().min(0).optional(),
    description: Joi.string().max(500).optional()
  }),

  // Checklist schemas
  createChecklistItem: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).optional(),
    quantity: Joi.number().integer().min(1).default(1),
    category: Joi.string().max(50).required()
  }),

  updateChecklistItem: Joi.object({
    title: Joi.string().min(1).max(100).optional(),
    description: Joi.string().max(500).optional(),
    isPacked: Joi.boolean().optional(),
    quantity: Joi.number().integer().min(1).optional(),
    category: Joi.string().max(50).optional()
  }),

  // Note schemas
  createNote: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required(),
    isPublic: Joi.boolean().default(false)
  }),

  updateNote: Joi.object({
    title: Joi.string().min(1).max(100).optional(),
    content: Joi.string().min(1).optional(),
    isPublic: Joi.boolean().optional()
  }),

  // City schemas
  createCity: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    country: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(1000).optional(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
    imageUrl: Joi.string().uri().optional(),
    popular: Joi.boolean().default(false)
  }),

  // Query parameters
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  }),

  search: Joi.object({
    q: Joi.string().min(1).max(100).required(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20)
  })
}

// Validation middleware factory
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = source === 'query' ? req.query : source === 'params' ? req.params : req.body
    
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    })

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      })
    }

    // Replace the request data with validated and cleaned data
    if (source === 'query') {
      req.query = value
    } else if (source === 'params') {
      req.params = value
    } else {
      req.body = value
    }

    next()
  }
}
