export const date = (day: number, month: number, year: number) => {
    const theDate = new Date()

    theDate.setFullYear(year)
    theDate.setMonth(month - 1)
    theDate.setDate(day)

    return theDate
}
