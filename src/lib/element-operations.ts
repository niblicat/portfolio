export function getComputedValue(
    container: Element,
    cssProp: string,
    useInt: boolean = true,
): number {
    // https://stackoverflow.com/a/49507416
    if (useInt) {
        return parseInt(
            window.getComputedStyle(container, null).getPropertyValue(cssProp).split('px')[0],
        );
    } else {
        return parseFloat(
            window.getComputedStyle(container, null).getPropertyValue(cssProp).split('px')[0],
        );
    }
}

export function getPaddingBoxWidth(element: Element): number {
    const width = getComputedValue(element, 'width', false);
    const paddingLeft = getComputedValue(element, 'padding-left', false);
    const paddingRight = getComputedValue(element, 'padding-right', false);

    return width - paddingLeft - paddingRight;
}

export function getOccupiedWidth(element: Element) {
    const width = getComputedValue(element, 'width', false);
    const marginLeft = getComputedValue(element, 'margin-left', false);
    const marginRight = getComputedValue(element, 'margin-right', false);

    return width + marginLeft + marginRight;
}

export function isFlexRowWrapped(element: Element): boolean {
    const children: Element[] = Array.from(element.children);
    /** The effective size of all children. */
    const childWidths = children.reduce(
        (accumulator, child) => accumulator + getOccupiedWidth(child),
        0,
    );

    /** The content size of the flex box. */
    const paddingBoxWidth = getPaddingBoxWidth(element);

    const gap = getComputedValue(element, 'gap', false);
    /**
     * The maximum number of gaps the element contains.
     * When there are multiple rows, the actual number of gaps might be less
     * than this number.
     */
    const gapCount = children.length <= 0 ? 0 : children.length - 1;
    /** The maximum width the gaps could occupy. */
    const gapWidths = gap * gapCount;

    return childWidths + gapWidths > paddingBoxWidth;
}
