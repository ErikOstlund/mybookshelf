import { server, rest } from 'test/server'
import { client } from '../api-client'

const apiURL = process.env.REACT_APP_API_URL

beforeAll(() => server.listen())
afterAll(() => server.close())
// removes the one-off handlers for each individual test
afterEach(() => server.resetHandlers())

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

test('allows for config overrides', async () => {})

test('when data provided, it is stringified and method defaults to POST', async () => {})
