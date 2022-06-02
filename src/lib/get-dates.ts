import { getDaysInBetween } from './get-days-in-between'

interface GetDatesOptions {
    from?: Date
    to: Date
    max?: number
}

const wordNumbers = [
    // Needs to be here to make 'first' get a 1 index
    [],
    ['first'],
    ['second'],
    ['third'],
    ['fourth'],
    ['fifth'],
    ['sixth'],
    ['seventh'],
    ['eigth'],
    ['ninth'],
    ['tenth'],
    ['eleventh'],
    ['twelth'],
    ['thirteenth'],
    ['fourteenth'],
    ['fifteenth'],
    ['sixteenth'],
    ['seventeenth'],
    ['eighteenth'],
    ['nineteenth'],
    ['twentieth'],
    ['twentyfirst', 'twenty-first'],
    ['twentysecond', 'twenty-scond'],
    ['twentythird', 'twenty-third'],
    ['twentyfourth', 'twenty-fourth'],
    ['twentyfifth', 'twenty-fifth'],
    ['twentysixth', 'twenty-sixth'],
    ['twentyseventh', 'twenty-seventh'],
    ['twentyeight', 'twenty-eight'],
    ['twentyninth', 'twenty-ninth'],
    ['thirtieth'],
    ['thirtyfirst', 'thirty-first'],
]

const months = [
    ['january', 'jan'],
    ['february', 'feb'],
    ['march', 'mar'],
    ['april', 'apr'],
    ['may'],
    ['june'],
    ['july'],
    ['august', 'aug'],
    ['september', 'sep', 'sept'],
    ['october', 'oct'],
    ['november', 'nov'],
    ['december', 'dec'],
]

const weekDays = [
    ['sunday', 'sun'],
    ['monday', 'mon'],
    ['tuesday', 'tue', 'tues'],
    ['wednesday', 'wed'],
    ['thursday', 'thurs', 'thur'],
    ['friday', 'fri'],
    ['saturday', 'sat'],
]

const getThingIndex = (
    text: string,
    options: string[][],
    defaultValue: number
) => {
    const weekDay = options.findIndex((dayList) =>
        dayList.find(
            (dayVariant) =>
                text.toLocaleLowerCase() === dayVariant.toLocaleLowerCase()
        )
    )

    return weekDay !== -1 ? weekDay : defaultValue
}
const REGEXES = {
    onWeekday: /on\s+(?<weekDay>\w+)s/,
    everyWeek: /(each|every)\s+week(?:\son\s+(?<weekDay>\w+))?/,
    everySpecificWeekday: /(each|every)\s+(?<weekDay>\w+)/,
    wordOfMonth: /(?<day>\w+)(?:\sof\s+(?<month>\w+))?(?:\s+(?<year>\d{4}))?/,
    thOfMonth:
        /(?<day>\d{1,2})(th|st|nd)(?:\sof\s+(?<month>\w+))?(?:\s+(?<year>\d{4}))?/,
}

const everyWeek = (text: string, from: Date, to: Date) => {
    const everyWeekResult =
        new RegExp(REGEXES.everyWeek, 'gi').exec(text) ??
        new RegExp(REGEXES.everySpecificWeekday, 'gi').exec(text) ??
        new RegExp(REGEXES.onWeekday, 'gi').exec(text)

    if (!everyWeekResult) {
        return undefined
    }

    const day = everyWeekResult.groups?.['weekDay']

    const weekDay = getThingIndex(day ?? '', weekDays, now().getDay())

    return getDaysInBetween(from, to).filter(
        (date) => date.getDay() === weekDay
    )
}

const specificDate = (text: string, from: Date, to: Date) => {
    const result =
        new RegExp(REGEXES.thOfMonth, 'gi').exec(text) ??
        new RegExp(REGEXES.wordOfMonth, 'gi').exec(text)

    console.log(result)

    if (!result) {
        return undefined
    }

    const day = result.groups?.['day']
    const month = result.groups?.['month']
    const year = result.groups?.['year']

    const parsedDay = day && getThingIndex(day, wordNumbers, Number(day))

    const parsedMonth = month
        ? getThingIndex(month, months, from.getMonth())
        : undefined

    const parsedYear = year ? Number(year) : undefined

    return getDaysInBetween(from, to).filter((date) => {
        return (
            date.getDate() === parsedDay &&
            (!parsedMonth || date.getMonth() === parsedMonth) &&
            (!parsedYear || date.getFullYear() === parsedYear)
        )
    })
}

const now = () => new Date(Date.now())

const dates = (options?: GetDatesOptions): [Date, Date] => {
    const nextMonth = now()
    nextMonth.setMonth(now().getMonth() + 1)
    return [options?.from ?? now(), options?.to ?? nextMonth]
}

export const getDates = (text: string, options?: GetDatesOptions) => {
    const [from, to] = dates(options)

    return everyWeek(text, from, to) ?? specificDate(text, from, to) ?? []
}
