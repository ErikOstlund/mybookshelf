function client(
  endpoint,
  { token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders
    },
    ...customConfig
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async response => {
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
