export type GetDatesType =
    | 'EveryWeek'
    | 'SpecificDateOfYear'
    | 'SpecificDateOfMonth'
    | 'None'

export interface ParseResult<T extends GetDatesType> {
    type: T
    dates: Date[]
}
