interface Person {
  lastName: string
  firstName: string
  patronymic: string
}

const getFullName = (person: Person, abbreviated = true) => {
  const { lastName, firstName, patronymic } = person

  if(abbreviated) {
    return `${lastName} ${firstName[0]}. ${patronymic[0]}.`
  }

  return `${lastName} ${firstName} ${patronymic}`
}

export default getFullName