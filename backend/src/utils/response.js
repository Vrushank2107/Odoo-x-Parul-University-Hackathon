// Standardized API response format
export const createResponse = (success, message, data = null, statusCode = 200) => {
  const response = {
    success,
    message
  }

  if (data !== null) {
    response.data = data
  }

  return response
}

// Success response helper
export const successResponse = (message, data = null, statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  }
}

// Error response helper
export const errorResponse = (message, statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
    statusCode
  }

  if (errors) {
    response.errors = errors
  }

  return response
}

// Pagination helper
export const createPaginationResponse = (data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit)
  
  return {
    success: true,
    message: 'Data retrieved successfully',
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }
}

// Send response helper
export const sendResponse = (res, response) => {
  const statusCode = response.statusCode || 200
  delete response.statusCode
  res.status(statusCode).json(response)
}
