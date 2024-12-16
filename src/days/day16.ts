import { Point, PointString } from "../utils/Point";

export function part1(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    let start: Point | undefined;
    let end: Point | undefined;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === "S") {
                start = { row, col };
            } else if (grid[row][col] === "E") {
                end = { row, col };
            }
        }
    }

    if (start === undefined || end === undefined) {
        throw new Error("Invalid grid");
    }

    type Direction = "Up" | "Right" | "Down" | "Left";
    const nextDirections = new Map<Direction, Direction[]>([
        ["Up", ["Up", "Left", "Right"]],
        ["Right", ["Right", "Up", "Down"]],
        ["Down", ["Down", "Left", "Right"]],
        ["Left", ["Left", "Up", "Down"]],
    ]);

    type Reindeer = {
        point: Point;
        score: number;
        direction: Direction;
    };
    let curr: Reindeer | undefined = { point: start, direction: "Right", score: 0 };

    let minScore = Number.MAX_SAFE_INTEGER;
    const scores = new Map<PointString, number>();
    scores.set(`${start.row},${start.col}`, 0);

    const frontier: Reindeer[] = [];

    while (curr !== undefined) {
        const { point, direction, score } = curr;
        if (point.row === end.row && point.col === end.col) {
            if (score < minScore) {
                minScore = score;
            }
            curr = frontier.pop();
            continue;
        }

        if (score > minScore) {
            curr = frontier.pop();
            continue;
        }

        const nextDirs = nextDirections.get(direction)!;
        for (let i = 0; i < nextDirs.length; i++) {
            const nextDirection = nextDirs[i];
            let next: Point;
            switch (nextDirection) {
                case "Up": {
                    next = { row: point.row - 1, col: point.col };
                    break;
                }
                case "Right": {
                    next = { row: point.row, col: point.col + 1 };
                    break;
                }
                case "Down": {
                    next = { row: point.row + 1, col: point.col };
                    break;
                }
                case "Left": {
                    next = { row: point.row, col: point.col - 1 };
                    break;
                }
                default:
                    throw new Error("Invalid direcition");
            }

            if (grid[next.row][next.col] === "#") {
                continue;
            }

            const nextScore = scores.get(`${next.row},${next.col}`);
            const currScore = score + (direction === nextDirection ? 1 : 1001);
            if (nextScore !== undefined && currScore > nextScore) {
                continue;
            }

            scores.set(`${next.row},${next.col}`, currScore);
            frontier.push({
                point: next,
                score: currScore,
                direction: nextDirection
            });
        }

        curr = frontier.pop();
    }

    return minScore.toString();
}

export function part2(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    let start: Point | undefined;
    let end: Point | undefined;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === "S") {
                start = { row, col };
            } else if (grid[row][col] === "E") {
                end = { row, col };
            }
        }
    }

    if (start === undefined || end === undefined) {
        throw new Error("Invalid grid");
    }

    type Direction = "Up" | "Right" | "Down" | "Left";
    const nextDirections = new Map<Direction, Direction[]>([
        ["Up", ["Up", "Left", "Right"]],
        ["Right", ["Right", "Up", "Down"]],
        ["Down", ["Down", "Left", "Right"]],
        ["Left", ["Left", "Up", "Down"]],
    ]);

    type Reindeer = {
        point: Point;
        score: number;
        direction: Direction;
    };
    let curr: Reindeer | undefined = { point: start, direction: "Right", score: 0 };

    let minScore = Number.MAX_SAFE_INTEGER;
    const path = new Map<PointString, Reindeer[]>();
    const scores = new Map<PointString, number>();
    scores.set(`${start.row},${start.col}`, 0);

    const frontier: Reindeer[] = [];

    while (curr !== undefined) {
        const { point, direction, score } = curr;
        if (point.row === end.row && point.col === end.col) {
            if (score < minScore) {
                minScore = score;
            }
            curr = frontier.pop();
            continue;
        }

        if (score > minScore) {
            curr = frontier.pop();
            continue;
        }

        const nextDirs = nextDirections.get(direction)!;
        for (let i = 0; i < nextDirs.length; i++) {
            const nextDirection = nextDirs[i];
            let next: Point;
            switch (nextDirection) {
                case "Up": {
                    next = { row: point.row - 1, col: point.col };
                    break;
                }
                case "Right": {
                    next = { row: point.row, col: point.col + 1 };
                    break;
                }
                case "Down": {
                    next = { row: point.row + 1, col: point.col };
                    break;
                }
                case "Left": {
                    next = { row: point.row, col: point.col - 1 };
                    break;
                }
                default:
                    throw new Error("Invalid direcition");
            }

            if (grid[next.row][next.col] === "#") {
                continue;
            }

            const nextScore = scores.get(`${next.row},${next.col}`);
            const currScore = score + (direction === nextDirection ? 1 : 1001);
            if (nextScore !== undefined && currScore > nextScore) {
                continue;
            }

            scores.set(`${next.row},${next.col}`, currScore);
            frontier.push({
                point: next,
                score: currScore,
                direction: nextDirection
            });
            let from = path.get(`${next.row},${next.col}`);
            if (from === undefined) {
                from = [];
                path.set(`${next.row},${next.col}`, from);
            }
            from.push({ point, score, direction });
        }

        curr = frontier.pop();
    }

    let rcurr: PointString | undefined = `${end.row},${end.col}`;
    let count = 0;

    const rfrontier: PointString[] = [];
    const visited = new Set<PointString>();
    while (rcurr !== undefined) {
        if (rcurr === `${start.row},${start.col}`) {
            rcurr = rfrontier.shift();
            continue;
        }

        let from = path.get(rcurr);
        if (from === undefined) {
            throw new Error("Should not be undefined");
        }

        from = from.sort((a, b) => a.score - b.score);
        let minScore = from[0];
        from = from.filter(trace => {
            return trace.score === minScore.score || trace.score === (minScore.score + 1000)
        });
        for (let i = 0; i < from.length; i++) {
            const { point } = from[i];
            if (visited.has(`${point.row},${point.col}`)) {
                continue;
            }
            visited.add(`${point.row},${point.col}`);
            rfrontier.push(`${point.row},${point.col}`);
        }

        rcurr = rfrontier.shift();
        count++;
    }
    count++;

    // TODO: Fix the above counts suboptimal paths.

    console.log(grid.map((line, row) => line.map((tile, col) => {
        if (visited.has(`${row},${col}`)) {
            return "O";
        }
        return tile;
    }).join("")
    ).join("\n"))

    return count.toString();
}
