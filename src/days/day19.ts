export function part1(input: string): string {
    const parts = input.split("\n\n");

    const patterns = parts[0].split(", ").sort();
    const designs = parts[1].split("\n").slice(0, -1);

    const memo = new Map<string, boolean>();
    return designs
        .filter(design => canMakeDesign(design, patterns, 0, memo))
        .length
        .toString();
}

export function part2(input: string): string {
    const parts = input.split("\n\n");

    const patterns = parts[0].split(", ").sort();
    const designs = parts[1].split("\n").slice(0, -1);

    const memo = new Map<string, number>();
    return designs
        .map(design => countPossibleWaysToMakeDesign(design, patterns, 0, memo))
        .reduce((sum, count) => sum + count, 0)
        .toString();
}

function canMakeDesign(design: string, patterns: string[], startIndex: number, memo: Map<string, boolean>): boolean {
    if (design.length - startIndex === 0) {
        return true;
    }

    if (memo.has(design.slice(startIndex))) {
        return memo.get(design.slice(startIndex))!;
    }

    const designIsPossible = patterns
        .filter(pattern => pattern[0] === design[startIndex] && pattern === design.slice(startIndex, startIndex + pattern.length))
        .some(pattern => canMakeDesign(design, patterns, startIndex + pattern.length, memo));

    memo.set(design.slice(startIndex), designIsPossible);

    return designIsPossible;
}

function countPossibleWaysToMakeDesign(design: string, patterns: string[], startIndex: number, memo: Map<string, number>): number {
    if (design.length - startIndex === 0) {
        return 1;
    }

    if (memo.has(design.slice(startIndex))) {
        return memo.get(design.slice(startIndex))!;
    }
    
    const possibleWaysToMakeDesign = patterns
        .filter(pattern => pattern[0] === design[startIndex] && pattern === design.slice(startIndex, startIndex + pattern.length))
        .map(pattern => countPossibleWaysToMakeDesign(design, patterns, startIndex + pattern.length, memo))
        .reduce((sum, count) => sum + count, 0);

    memo.set(design.slice(startIndex), possibleWaysToMakeDesign);

    return possibleWaysToMakeDesign;
}
