import { ParseResult } from './get-dates-type'
import { getDaysInBetween } from './get-days-in-between'
import { getOrdinalIndex } from './get-ordinal-index'
import { now } from './now'
import { wordNumbers } from './number-words'
import { parseMonth } from './parse-month'
import { REGEXES } from './regexes'
import { WeekDays, weekDays } from './weekdays'

interface NumberedWeekdayResult extends ParseResult<'NumberedWeekdayOfMonth'> {
    weekDay: number
    dates: Date[]
    which: number | 'last'
}

export const numberedWeekday = (
    text: string,
    from: Date,
    to: Date
): NumberedWeekdayResult | undefined => {
    const numberedWeekdayResult =
        new RegExp(REGEXES.nthWeekDay, 'gi').exec(text) ??
        new RegExp(REGEXES.nthWeekDayWithMonth, 'gi').exec(text)

    if (!numberedWeekdayResult) {
        return undefined
    }

    const which = numberedWeekdayResult.groups?.['which']
    const day = numberedWeekdayResult.groups?.['weekDay']
    const month = numberedWeekdayResult.groups?.['weekDay']

    const parsedMonth = parseMonth(month, from)
    const parsedWhich = getOrdinalIndex(which ?? '', wordNumbers, -1)

    if (parsedWhich === -1) {
        return undefined
    }

    const weekDay = getOrdinalIndex(day ?? '', weekDays, now().getDay())

    const allWeekdays = getDaysInBetween(from, to).filter(
        (date) => date.getDay() === weekDay
    )

    const daysGroupedByMonth = allWeekdays.reduce<Date[][]>(
        (accum, item, index) => {
            const lastArray = accum[accum.length - 1]
            const lastDate = lastArray[lastArray.length - 1]

            if (index === 0 || lastDate.getMonth() === item.getMonth()) {
                lastArray.push(item)
                return accum
            }

            accum.push([item])
            return accum
        },
        []
    )

    const finalDays = daysGroupedByMonth
        .map((group) =>
            group.filter((date, index) => index + 1 === parsedWhich)
        )
        .flat()
        .filter(
            (date) =>
                parseMonth === undefined || date.getMonth() === parsedMonth
        )

    return {
        type: 'NumberedWeekdayOfMonth',
        weekDay: weekDay,
        dates: finalDays,
        which: parsedWhich,
    }
}
