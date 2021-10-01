const formatDate = (date: Date | string) => (date instanceof Date ? date : new Date(date)).toLocaleDateString()

export default formatDate