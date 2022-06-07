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

    it.each([['on the third of june'], ['on the 3rd of june']])(
        "identifies the correct date for '%s'",
        (string) => {
            const dates = getDates(string, {
                from: date(31, 5, 2022),
                to: date(30, 6, 2022),
            })

            expect(dates).toHaveLength(1)
            expect(dates[0]).toBeSameDayAs(date(3, 6, 2022))
        }
    )

    it.each([
        ['on the 16th of august'],
        ['16th of august'],
        ['sixteenth of august'],
        ['sixteenth august'],
        ['the 16th of August'],
        ['16/8'],
        ['16/8'],
        ['16/08/2022'],
        ['16/08/22'],
    ])(
        "identifies specific dates that are not in the same month as the start date from '%s",
        (string) => {
            const dates = getDates(string, {
                from: date(1, 6, 2022),
                to: date(25, 8, 2022),
            })

            expect(dates).toHaveLength(1)
            expect(dates[0]).toBeSameDayAs(date(16, 8, 2022))
        }
    )

    it.each([
        ['sixteenth'],
        ['on the sixteenth'],
        ['on the 16th'],
        ['16th'],
        ['the 16th'],
        ['16th of every month'],
        ['every month on the 16th'],
    ])(
        "picks out multiple dates if there is no month specified and the range contains more than one of that date from '%s'",
        (string) => {
            const dates = getDates(string, {
                from: date(1, 6, 2022),
                to: date(25, 8, 2022),
            })

            expect(dates).toHaveLength(3)
            expect(dates[0]).toBeSameDayAs(date(16, 6, 2022))
            expect(dates[1]).toBeSameDayAs(date(16, 7, 2022))
            expect(dates[2]).toBeSameDayAs(date(16, 8, 2022))
        }
    )

    it.each([
        ['16th of june'],
        ['sixteenth of june'],
        ['sixteenth june'],
        ['the 16th of June'],
        ['16/6'],
        ['16/06'],
        ['16/06/2022'],
        ['16/06/22'],
    ])("correctly identifies specific dates from '%s'", (string) => {
        const dates = getDates(string, {
            from: date(1, 6, 2022),
            to: date(1, 7, 2022),
        })

        expect(dates).toHaveLength(1)
        expect(dates[0]).toBeSameDayAs(date(16, 6, 2022))
    })
})
