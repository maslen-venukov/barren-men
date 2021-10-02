import auth from './slices/auth'
import users from './slices/users'
import patients from './slices/patients'
import patientsGroups from './slices/patientsGroups'
import indicators from './slices/indicators'

const reducer = {
  auth,
  users,
  patients,
  patientsGroups,
  indicators
}

export default reducer