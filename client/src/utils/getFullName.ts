const getFullName = (person: {
  lastName: string
  firstName: string
  patronymic: string
}) => `${person.lastName} ${person.firstName[0]}. ${person.patronymic[0]}.`

export default getFullName