import { formatDate } from 'utils/misc'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('December 11, 1974'))).toBe('Dec 74')
})
