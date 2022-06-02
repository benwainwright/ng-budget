import { date } from './date'
import { getDates } from './get-dates'

describe('get dates', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.setSystemTime(date(1, 6, 2022))
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it.each([
        ['every week on thursday'],
        ['every Week on thursday'],
        ['each week on thursday'],
        ['every thursday'],
        ['every Thursday'],
        ['every thurs'],
        ['each thursday'],
        ['each thurs'],
        ['every thur'],
        ['on thursdays'],
    ])("correctly identifies repitition from '%s'", (string) => {
        const dates = getDates(string, {
            from: date(1, 6, 2022),
            to: date(1, 7, 2022),
        })

        expect(dates).toHaveLength(5)
        expect(dates[0]).toBeSameDayAs(date(2, 6, 2022))
        expect(dates[1]).toBeSameDayAs(date(9, 6, 2022))
        expect(dates[2]).toBeSameDayAs(date(16, 6, 2022))
        expect(dates[3]).toBeSameDayAs(date(23, 6, 2022))
        expect(dates[4]).toBeSameDayAs(date(30, 6, 2022))
    })

    it.each([
        ['16th of june'],
        ['sixteenth of june'],
        ['sixteenth june'],
        ['on the 16th'],
        ['16th'],
        ['the 16th of June'],
    ])("correctly identifies specific dates from '%s'", (string) => {
        const dates = getDates(string, {
            from: date(1, 6, 2022),
            to: date(1, 7, 2022),
        })

        expect(dates).toHaveLength(1)
        expect(dates[0]).toBeSameDayAs(date(16, 6, 2022))
    })
})
