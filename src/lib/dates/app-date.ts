const MILLIS_IN_DAY = 7 * 24 * 60 * 60 * 1000

export class AppDate {
    private date: Date

    private constructor(...args: ConstructorParameters<typeof Date>) {
        this.date = new Date(...args)
    }

    public getMonth() {
        return this.date.getMonth()
    }

    public getDay() {
        return this.date.getDay()
    }

    public getDate() {
        return this.date.getDate()
    }

    public getFullYear() {
        return this.date.getFullYear()
    }

    public toDate(): Date {
        return new Date(this.date.valueOf())
    }

    /*
     * Implementation from StackOverflow:
     *   https://stackoverflow.com/a/39502645/3104399
     */
    public getWeekNumber(): number {
        const target = new Date(this.date.valueOf())

        const dayNumber = (target.getDay() + 6) % 7

        target.setDate(target.getDate() - dayNumber + 3)

        const firstThursday = target.valueOf()

        target.setMonth(0, 1)

        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
        }

        return (
            1 +
            Math.ceil((firstThursday.valueOf() - target.valueOf()) / 604800000)
        )
    }

    public static create(date: Date): AppDate
    public static create(day: number, month: number, year: number): AppDate
    public static create(
        dateOrDay: number | Date,
        month?: number,
        year?: number
    ): AppDate {
        if (dateOrDay instanceof Date) {
            const number = dateOrDay.valueOf()
            return new AppDate(number)
        }

        const newDate = new AppDate(0)

        newDate.date.setFullYear(year ?? 0)
        newDate.date.setMonth((month ?? 0) - 1)
        newDate.date.setDate(dateOrDay ?? 0)

        return newDate
    }
}

export const date = (day: number, month: number, year: number) => {
    const theDate = new Date()

    theDate.setFullYear(year)
    theDate.setMonth(month - 1)
    theDate.setDate(day)

    return theDate
}
