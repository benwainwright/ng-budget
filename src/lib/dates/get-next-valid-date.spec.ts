import { date } from './date'
import { getNextValidDate } from './get-next-valid-date'
import { now } from './now'

describe('get next valid date', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.setSystemTime(date(1, 6, 2022))
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it("blows up if the input string doesn't make sense", () => {
        expect(() => getNextValidDate(now(), 'foo')).toThrow()
    })

    it('returns a date in the future when passed a specific date that is only a week from now', () => {
        const result = getNextValidDate(now(), '5th of june')

        expect(result).toBeSameDayAs(date(5, 6, 2022))
    })

    it('returns a date in the future when passed a specific date that is a while away from now', () => {
        const result = getNextValidDate(now(), '28th of Jan')

        expect(result).toBeSameDayAs(date(28, 1, 2023))
    })

    it('returns the next tuesday when passed every tuesday', () => {
        const result = getNextValidDate(now(), 'every tuesday')

        expect(result).toBeSameDayAs(date(7, 6, 2022))
    })
})
