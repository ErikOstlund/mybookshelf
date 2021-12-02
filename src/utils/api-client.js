import { queryCache } from 'react-query'
import * as auth from 'auth-provider'
const apiURL = process.env.REACT_APP_API_URL

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    ...customConfig
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      queryCache.clear()
      await auth.logout()
      // refresh the page
      window.location.assign(window.location)
      return Promise.reject({ message: 'Error: Log-in again.' })
    }

    const data = await response.json()
    if (response.ok) {
      // promise is successfully resolved
      return data
    } else {
      // promise failed
      return Promise.reject(data)
    }
  })
}

export { client }
