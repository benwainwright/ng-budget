export const getOrdinalIndex = (
    text: string,
    options: string[][],
    defaultValue: number
) => {
    const index = options.findIndex((ordinalList) =>
        ordinalList.find(
            (ordinalVariant) =>
                text.toLocaleLowerCase() === ordinalVariant.toLocaleLowerCase()
        )
    )

    return index !== -1 ? index : defaultValue
}