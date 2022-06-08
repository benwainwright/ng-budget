import { months } from './months'
import { wordNumbers } from './number-words'
import { weekDays } from './weekdays'

const weekDayOptions = weekDays.flat().join(`|`)
const monthOptions = months.flat().join('|')
const dayOptions = wordNumbers.flat().join('|')

const alternatingOptions = ['other', ...wordNumbers.flat()].join('|')
const nthOptions = ['last', ...wordNumbers.slice(0, 5)].join('|')

export const REGEXES = {
    onWeekday: `on\\s+(?<weekDay>(?:${weekDayOptions})+)s`,
    everyWeek: `(each|every)\\s+(?:(?<alternating>${alternatingOptions})?\\s+)?week(?:\\son\\s+(?<weekDay>(?:${weekDayOptions})))?`,
    nthWeekDay: `(?<which>${nthOptions})\\s+(?<weekDay>${weekDayOptions})(?:of\\s+(each|every)\\s+month)?$`,
    nthWeekDayWithMonth: `(?<which>${nthOptions})\\s+(?<weekDay>${weekDayOptions})(?:of\\s+(?:(each|every)\\s+)?(?<month>${monthOptions}))?`,
    everySpecificWeekday: `(each|every)\\s+(?:(?<alternating>${alternatingOptions})?\\s+)?(?<weekDay>(?:${weekDayOptions}))\\b`,
    wordOfMonth: `(?<day>${dayOptions})(?:(\\sof)?\\s+(?<month>(?:${monthOptions})))(?:\\s+(?<year>\\d{4}))?`,
    daySlashMonth: `(?<day>\\d{1,2})\\/(?<month>\\d{1,2})`,
    thOfMonth: `(?<day>\\d{1,2})(th|st|nd|rd)(?:(\\sof)?\\s+(?<month>(?:${monthOptions})))(?:\\s+(?<year>\\d{4}))?`,
    thOnlyWord: `(?<day>(?:${dayOptions}))`,
    thOnlyNumber: `(?<day>\\d{1,2})(th|st|nd|rd)`,
}
