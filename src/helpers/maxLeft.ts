export function maxLeft(element?: Element | null): number {

    if(!element) return 0

    const { left, width } = element.getBoundingClientRect()

    const { innerWidth } = window

    const maxLeft = innerWidth - (left + width)

    return parseInt(maxLeft.toFixed(0))
}