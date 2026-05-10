import { useTrip as useTripContext } from '../context/TripContext'

export const useTrip = () => {
  return useTripContext()
}