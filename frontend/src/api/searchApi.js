import api from './axios.js'

export const searchApi = {
  // City search
  searchCities: async (query, params = {}) => {
    const queryParams = new URLSearchParams({ q: query, ...params })
    return await api.get(`/search/cities?${queryParams}`)
  },

  getPopularCities: async (limit = 10) => {
    return await api.get(`/search/cities/popular?limit=${limit}`)
  },

  getCity: async (cityId) => {
    return await api.get(`/search/cities/${cityId}`)
  },

  getDestinationsByCountry: async (country, params = {}) => {
    const queryParams = new URLSearchParams({ ...params })
    return await api.get(`/search/countries/${encodeURIComponent(country)}/destinations?${queryParams}`)
  },

  getAllCountries: async () => {
    return await api.get(`/search/countries`)
  },

  // Activity search
  searchActivities: async (query, params = {}) => {
    const queryParams = new URLSearchParams({ q: query, ...params })
    return await api.get(`/search/activities?${queryParams}`)
  },

  getActivitySuggestions: async (destination, tripType = 'LEISURE') => {
    const params = new URLSearchParams({ destination, tripType })
    return await api.get(`/search/activities/suggestions?${params}`)
  },

  // Trip search
  searchTrips: async (query, params = {}) => {
    const queryParams = new URLSearchParams({ q: query, ...params })
    return await api.get(`/search/trips?${queryParams}`)
  },

  getTrendingDestinations: async (limit = 10) => {
    return await api.get(`/search/destinations/trending?limit=${limit}`)
  }
}
