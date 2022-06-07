import { ParseResult } from './get-dates-type'
import { getDaysInBetween } from './get-days-in-between'
import { getOrdinalIndex } from './get-ordinal-index'
import { now } from './now'
import { wordNumbers } from './number-words'
import { REGEXES } from './regexes'
import { WeekDays, weekDays } from './weekdays'

interface EveryWeekResult extends ParseResult<'EveryWeek'> {
    weekDay: number
    dates: Date[]
    alternatingNumber: number
}

export const everyWeek = (
    text: string,
    from: Date,
    to: Date
): EveryWeekResult | undefined => {
    const everyWeekResult =
        new RegExp(REGEXES.everyWeek, 'gi').exec(text) ??
        new RegExp(REGEXES.everySpecificWeekday, 'gi').exec(text) ??
        new RegExp(REGEXES.onWeekday, 'gi').exec(text)
    console.log(REGEXES.everyWeek)

    if (!everyWeekResult) {
        return undefined
    }

    const day = everyWeekResult.groups?.['weekDay']

    const alternating = everyWeekResult.groups?.['alternating']

    const alternatingNumber =
        alternating === 'other'
            ? 2
            : getOrdinalIndex(alternating ?? '', wordNumbers, 1)

    const weekDay = getOrdinalIndex(day ?? '', weekDays, now().getDay())

    const allDates = getDaysInBetween(from, to)
        .filter((date) => date.getDay() === weekDay)
        .filter((item, index) => index % alternatingNumber === 0)

    return {
        type: 'EveryWeek',
        weekDay: weekDay,
        dates: allDates,
        alternatingNumber,
    }
}
