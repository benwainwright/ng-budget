import { getDaysInBetween } from "./get-days-in-between"
import { getOrdinalIndex } from "./get-ordinal-index"
import { now } from "./now"
import { REGEXES } from "./regexes"
import { weekDays } from "./weekdays"

export const everyWeek = (text: string, from: Date, to: Date) => {
    const everyWeekResult =
        new RegExp(REGEXES.everyWeek, 'gi').exec(text) ??
        new RegExp(REGEXES.everySpecificWeekday, 'gi').exec(text) ??
        new RegExp(REGEXES.onWeekday, 'gi').exec(text)

    if (!everyWeekResult) {
        return undefined
    }

    const day = everyWeekResult.groups?.['weekDay']

    const weekDay = getOrdinalIndex(day ?? '', weekDays, now().getDay())

    return getDaysInBetween(from, to).filter(
        (date) => date.getDay() === weekDay
    )
}