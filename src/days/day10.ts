import { Point } from "../utils/Point";
type PointString = `${number},${number}`;

export function part1(input: string): string {
    const topoMap = input.split("\n").slice(0, -1)
        .map(line => line.split("").map(x => parseInt(x)));

    let totalScore = 0;
    for (let row = 0; row < topoMap.length; row++) {
        for (let col = 0; col < topoMap[row].length; col++) {
            if (topoMap[row][col] !== 0) {
                continue;
            }

            let score = 0;
            const visited = new Set<PointString>();
            const frontier: Point[] = [];
            let curr: Point | undefined = { row, col };
            while (curr !== undefined) {
                const height = topoMap[curr.row][curr.col];
                if (height === 9 && !visited.has(`${curr.row},${curr.col}`)) {
                    score++;
                    visited.add(`${curr.row},${curr.col}`);
                    curr = frontier.pop();
                    continue;
                }

                if (curr.row + 1 < topoMap.length) {
                    let nextHeight = topoMap[curr.row + 1][curr.col];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row + 1, col: curr.col });
                    }
                }

                if (curr.row - 1 >= 0) {
                    let nextHeight = topoMap[curr.row - 1][curr.col];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row - 1, col: curr.col });
                    }
                }

                if (curr.col + 1 < topoMap[curr.row].length) {
                    let nextHeight = topoMap[curr.row][curr.col + 1];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row, col: curr.col + 1 });
                    }
                }

                if (curr.col - 1 >= 0) {
                    let nextHeight = topoMap[curr.row][curr.col - 1];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row, col: curr.col - 1 });
                    }
                }

                curr = frontier.pop();
            }
            totalScore += score;
        }
    }

    return totalScore.toString();
    return ":3";
}

export function part2(input: string): string {
    const topoMap = input.split("\n").slice(0, -1)
        .map(line => line.split("").map(x => parseInt(x)));

    let totalScore = 0;
    for (let row = 0; row < topoMap.length; row++) {
        for (let col = 0; col < topoMap[row].length; col++) {
            if (topoMap[row][col] !== 0) {
                continue;
            }

            let score = 0;
            const frontier: Point[] = [];
            let curr: Point | undefined = { row, col };
            while (curr !== undefined) {
                const height = topoMap[curr.row][curr.col];
                if (height === 9) {
                    score++;
                    curr = frontier.pop();
                    continue;
                }

                if (curr.row + 1 < topoMap.length) {
                    let nextHeight = topoMap[curr.row + 1][curr.col];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row + 1, col: curr.col });
                    }
                }

                if (curr.row - 1 >= 0) {
                    let nextHeight = topoMap[curr.row - 1][curr.col];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row - 1, col: curr.col });
                    }
                }

                if (curr.col + 1 < topoMap[curr.row].length) {
                    let nextHeight = topoMap[curr.row][curr.col + 1];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row, col: curr.col + 1 });
                    }
                }

                if (curr.col - 1 >= 0) {
                    let nextHeight = topoMap[curr.row][curr.col - 1];
                    if (height + 1 === nextHeight) {
                        frontier.push({ row: curr.row, col: curr.col - 1 });
                    }
                }

                curr = frontier.pop();
            }
            totalScore += score;
        }
    }

    return totalScore.toString();
    return ":3";
}
