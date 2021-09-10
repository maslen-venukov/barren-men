import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from 'pages/Login'
import Loader from 'components/Loader'
import Wrapper from 'components/Wrapper'
import useTypedDispatch from 'hooks/useTypedDispatch'
import useTypedSelector from 'hooks/useTypedSelector'
import { checkAuth } from 'store/api/auth'
import { setReady } from 'store/slices/auth'

const App: React.FC = () => {
  const dispatch = useTypedDispatch()

  const { auth, ready, user } = useTypedSelector(state => state.auth)

  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      dispatch(checkAuth())
    } else {
      dispatch(setReady(true))
    }
  }, [dispatch])

  if(!ready) {
    return <Loader />
  }

  if(!auth || !user) {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return <Wrapper />
}

export default App