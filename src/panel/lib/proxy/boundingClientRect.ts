export interface BoundingRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export function boundingClientRect(selector: string): BoundingRect[] {
    return Array.from(document.querySelectorAll(selector))
        .map(element => {
            const rect = element.getBoundingClientRect()
            return {
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                top: Math.round(rect.top),
                bottom: Math.round(rect.bottom),
                left: Math.round(rect.left),
                right: Math.round(rect.right)
            };
        });
}
