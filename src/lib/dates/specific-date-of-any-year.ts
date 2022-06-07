import { getDaysInBetween } from './get-days-in-between'
import { getOrdinalIndex } from './get-ordinal-index'
import { wordNumbers } from './number-words'
import { parseMonth } from './parse-month'
import { REGEXES } from './regexes'

export const specificDateOfAnyYear = (text: string, from: Date, to: Date) => {
    const result =
        new RegExp(REGEXES.thOfMonth, 'gi').exec(text) ??
        new RegExp(REGEXES.wordOfMonth, 'gi').exec(text) ??
        new RegExp(REGEXES.daySlashMonth, 'gi').exec(text)

    if (!result) {
        return undefined
    }

    const day = result.groups?.['day']
    const month = result.groups?.['month']
    const year = result.groups?.['year']

    const parsedDay = day && getOrdinalIndex(day, wordNumbers, Number(day))

    if (['every', 'each'].includes(month?.toLowerCase() ?? '')) {
        return undefined
    }

    const parsedMonth = parseMonth(month, from)

    const parsedYear = year ? Number(year) : undefined

    return getDaysInBetween(from, to).filter((date) => {
        return (
            date.getDate() === parsedDay &&
            (!parsedMonth || date.getMonth() === parsedMonth) &&
            (!parsedYear || date.getFullYear() === parsedYear)
        )
    })
}
