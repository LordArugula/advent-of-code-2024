export function part1(input: string): string {
    const parts = input.split("\n\n");

    const patterns = parts[0].split(", ").sort();
    const designs = parts[1].split("\n").slice(0, -1);

    return designs
        .filter(design => canMakeDesign(design, patterns, 0))
        .length
        .toString();
}

export function part2(input: string): string {
    return ":3";
}

function canMakeDesign(design: string, patterns: string[], startIndex: number): boolean {
    if (design.length - startIndex === 0) {
        return true;
    }
    
    return patterns
        .filter(pattern => pattern === design.slice(startIndex, startIndex + pattern.length))
        .some(pattern => canMakeDesign(design, patterns, startIndex + pattern.length));
}

