const getTomorrow = () => {
  const date = new Date()
  const tomorrow = new Date(date.setDate(date.getDate() + 1))
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}

export default getTomorrow