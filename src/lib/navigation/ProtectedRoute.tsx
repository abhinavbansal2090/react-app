import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from 'features/auth/store/auth.selectors'
import { routes } from './routes'

interface Props {
  path: string
  redirectPath?: string
  exact?: boolean
}

export const ProtectedRoute: React.FC<Props> = ({
  path,
  redirectPath = routes.login,
  children,
  exact = false,
}) => {
  const isAuth = useSelector(selectIsAuthenticated)

  return (
    <Route path={path} exact={exact}>
      {isAuth ? children : <Redirect to={redirectPath} />}
    </Route>
  )
}
