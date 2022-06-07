import { everyWeek } from './every-week'
import { now } from './now'
import { specificDateOfAnyMonth } from './specific-date-of-any-month'
import { specificDateOfAnyYear } from './specific-date-of-any-year'

interface GetDatesOptions {
    from?: Date
    to: Date
    max?: number
}

const dates = (options?: GetDatesOptions): [Date, Date] => {
    const nextMonth = now()
    nextMonth.setMonth(now().getMonth() + 1)
    return [options?.from ?? now(), options?.to ?? nextMonth]
}

export const getDates = (text: string, options?: GetDatesOptions) => {
    const [from, to] = dates(options)

    const everyWeekResult = everyWeek(text, from, to)

    if (everyWeekResult) {
        return everyWeekResult
    }

    const specificDateOfAnyYearResult = specificDateOfAnyYear(text, from, to)

    if (specificDateOfAnyYearResult) {
        return specificDateOfAnyYearResult
    }

    const specificDateOfAnyMonthResult = specificDateOfAnyMonth(text, from, to)

    if (specificDateOfAnyMonthResult) {
        return specificDateOfAnyMonthResult
    }

    return {
        type: 'None',
        dates: [],
    }
}
