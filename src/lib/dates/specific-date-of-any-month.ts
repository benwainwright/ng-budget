import { getDaysInBetween } from "./get-days-in-between"
import { getOrdinalIndex } from "./get-ordinal-index"
import { wordNumbers } from "./number-words"
import { REGEXES } from "./regexes"

export const specificDateOfAnyMonth = (text: string, from: Date, to: Date) => {
    const result = new RegExp(REGEXES.thOnlyNumber, 'gi').exec(text) ??
                   new RegExp(REGEXES.thOnlyWord, 'gi').exec(text)

    if (!result) {
        return undefined
    }

    const day = result.groups?.['day']

    const parsedDay = day && getOrdinalIndex(day, wordNumbers, Number(day))

    return getDaysInBetween(from, to).filter((date) => {
        return date.getDate() === parsedDay
    })
}