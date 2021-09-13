export const getDaysFromDuration = (duration: number) =>
  duration >= 24 ? Math.floor(duration / 24) : 0
export const getHoursFromDuration = (duration: number) => duration % 24

export const getDate = (time: string, separator = '-') => {
  const date = new Date(time)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${day}${separator}${month}${separator}${year}`
}
