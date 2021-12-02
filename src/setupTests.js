import { server } from 'test/server'

beforeAll(() => server.listen())
afterAll(() => server.close())
// removes the one-off handlers for each individual test
afterEach(() => server.resetHandlers())
