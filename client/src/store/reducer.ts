import auth from './slices/auth'
import users from './slices/users'
import patients from './slices/patients'
import patientsGroups from './slices/patientsGroups'
import indicators from './slices/indicators'
import indicatorsGroups from './slices/indicatorsGroups'
import analyzes from './slices/analyzes'

const reducer = {
  auth,
  users,
  patients,
  patientsGroups,
  indicators,
  indicatorsGroups,
  analyzes
}

export default reducer