export type BookingListItem = {
  name: string
  date: string
  startTime: string
  endTime: string
  imageUrl: string
  numberOfGuests: number
  experienceId: number
  type: 'old' | 'upcoming'
}
