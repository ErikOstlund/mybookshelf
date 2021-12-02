import { queryCache } from 'react-query'
import * as auth from 'auth-provider'
import { server, rest } from 'test/server'
import { client } from '../api-client'

const apiURL = process.env.REACT_APP_API_URL

jest.mock('react-query')
jest.mock('auth-provider')

test('makes GET requests to the given endpoint', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (_req, res, ctx) => {
      return res(ctx.json(mockResult))
    })
  )
  const result = await client(endpoint)

  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const token = 'MOCK_TOKEN'
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }
  let request

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    })
  )
  await client(endpoint, { token })

  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }
  let request

  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    })
  )

  // create the custom config
  const customConfig = {
    method: 'PUT',
    headers: { 'Content-Type': 'mock-type' }
  }

  await client(endpoint, customConfig)

  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type']
  )
})

test('when data provided, it is stringified and method defaults to POST', async () => {
  const endpoint = 'test-endpoint'

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body))
    })
  )

  const data = {
    mock: 'data'
  }

  const result = await client(endpoint, { data })

  expect(result).toEqual(data)
})

test('auto log-out user if request returns 401', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = { mockValue: 'VALUE' }

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (_req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult))
    })
  )
  const result = await client(endpoint).catch(error => error)

  expect(result.message).toMatchInlineSnapshot(`"Error: Log-in again."`)

  expect(queryCache.clear).toHaveBeenCalledTimes(1)
  expect(auth.logout).toHaveBeenCalledTimes(1)
})

test('rejects promise if error', async () => {
  const endpoint = 'test-endpoint'
  const testError = { message: 'Test Error' }

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (_req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    })
  )

  await expect(client(endpoint)).rejects.toEqual(testError)
})
