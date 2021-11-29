/** @jsx jsx */
import { jsx } from '@emotion/core'

import * as React from 'react'
import { queryCache } from 'react-query'
import * as auth from 'auth-provider'
import { client } from 'utils/api-client'
import { useAsync } from 'utils/hooks'
import { FullPageSpinner, FullPageErrorFallback } from 'components/lib'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', { token })
    user = data.user
  }

  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

// this is what renders the AuthContext
function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData]
  )
  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData]
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({ user, login, register, logout }),
    [login, logout, register, user]
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider Component')
  }
  return context
}

function useClient() {
  const {
    user: { token }
  } = useAuth()
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  )
}

// in other components:
// to use AuthContext.Provider import AuthProvider
// to use context data, import useAuth
export { AuthProvider, useAuth, useClient }
