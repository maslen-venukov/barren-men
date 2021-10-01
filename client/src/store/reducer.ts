import auth from './slices/auth'
import users from './slices/users'
import patients from './slices/patients'
import patientsGroups from './slices/patientsGroups'

const reducer = {
  auth,
  users,
  patients,
  patientsGroups
}

export default reducer