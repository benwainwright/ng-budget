import { months } from './months'
import { wordNumbers } from './number-words'
import { weekDays } from './weekdays'

const weekDayOptions = weekDays.flat().join(`|`)
const monthOptions = months.flat().join('|')
const dayOptions = wordNumbers.flat().join('|')

export const REGEXES = {
    onWeekday: `on\\s+(?<weekDay>(?:${weekDayOptions})+)s`,
    everyWeek: `(each|every)\\s+week(?:\\son\\s+(?<weekDay>(?:${weekDayOptions})))?`,
    everySpecificWeekday: `(each|every)\\s+(?<weekDay>(?:${weekDayOptions}))\\b`,
    wordOfMonth: `(?<day>${dayOptions})(?:(\\sof)?\\s+(?<month>(?:${monthOptions})))(?:\\s+(?<year>\\d{4}))?`,
    daySlashMonth: `(?<day>\\d{1,2})\\/(?<month>\\d{1,2})`,
    thOfMonth: `(?<day>\\d{1,2})(th|st|nd|rd)(?:(\\sof)?\\s+(?<month>(?:${monthOptions})))(?:\\s+(?<year>\\d{4}))?`,
    thOnlyWord: `(?<day>(?:${dayOptions}))`,
    thOnlyNumber: `(?<day>\\d{1,2})(th|st|nd|rd)`,
}
