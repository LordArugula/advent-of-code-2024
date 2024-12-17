import { zip } from "../utils/array-helpers";

export function part1(input: string): string {
    const lines = input.split("\n").slice(0, -1);

    const lists = lines.reduce((acc, line, idx) => {
        const items = line.split("   ");
        acc[0][idx] = parseInt(items[0]);
        acc[1][idx] = parseInt(items[1]);
        return acc;
    }, [new Array<number>(lines.length), new Array<number>(lines.length)])
        .map(list => list.sort());

    const listA = lists[0];
    const listB = lists[1];

    const result = zip(listA, listB, (a, b) => Math.abs(b - a))
        .reduce((sum, curr) => sum + curr, 0);

    return result.toString();
}

export function part2(input: string): string {
    const lines = input.split("\n").slice(0, -1);

    const lists = lines.reduce((acc, line) => {
        const items = line.split("   ");
        acc[0].push(parseInt(items[0]));
        acc[1].push(parseInt(items[1]));
        return acc;
    }, [new Array<number>(lines.length), new Array<number>(lines.length)]);

    const listA = lists[0];

    const listB = lists[1];
    const histB = listB.reduce((hist, val) => {
        if (!hist.has(val)) {
            hist.set(val, 1);
        } else {
            hist.set(val, hist.get(val)! + 1);
        }
        return hist;
    }, new Map<number, number>());

    let similarity = 0;
    for (let i = 0; i < listA.length; i++) {
        if (histB.has(listA[i])) {
            similarity += listA[i] * histB.get(listA[i])!;
        }
    }

    return similarity.toString();
}

