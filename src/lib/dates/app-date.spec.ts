import { AppDate } from './app-date'

describe('AppDate', () => {
    it('should be able to set the correct date for something next year', () => {
        const result = AppDate.create(28, 1, 2023)

        expect(result.getDate()).toEqual(28)
        expect(result.getMonth()).toEqual(0)
        expect(result.getFullYear()).toEqual(2023)
    })

    it('should be createable from a standard date object', () => {
        const result = AppDate.create(new Date('01/28/2023'))

        expect(result.getDate()).toEqual(28)
        expect(result.getMonth()).toEqual(0)
        expect(result.getFullYear()).toEqual(2023)
    })

    describe('get week number', () => {
        it.each`
            day   | month | year    | week
            ${1}  | ${1}  | ${2022} | ${52}
            ${3}  | ${1}  | ${2022} | ${1}
            ${8}  | ${6}  | ${2022} | ${23}
            ${24} | ${11} | ${2022} | ${47}
            ${7}  | ${5}  | ${2023} | ${18}
        `(
            'should return week $week for $day/$month/$year',
            ({ day, month, year, week }) => {
                const result = AppDate.create(day, month, year)

                const number = result.getWeekNumber()

                expect(number).toEqual(week)
            }
        )
    })
})
