import { Point, PointString } from "../utils/Point";

export function part1(input: string, test: boolean): string {
    let rows = 71;
    let cols = 71;
    let simulationIterations = 1024;
    if (test) {
        rows = 7;
        cols = 7;
        simulationIterations = 12;
    }

    const points = input.split("\n").slice(0, -1)
        .map<Point>(line => {
            const [x, y] = line.split(",");
            return {
                row: parseInt(y),
                col: parseInt(x)
            };
        });

    const grid = Array.from({ length: rows },
        () => Array.from({ length: cols }, () => "."));

    for (let i = 0; i < simulationIterations; i++) {
        const { row, col } = points[i];
        grid[row][col] = "#";
    }

    const frontier: Point[] = [];
    const pathTrace = new Map<PointString, Point>();
    const start = { row: 0, col: 0 };
    const end = { row: rows - 1, col: cols - 1 };

    let curr: Point | undefined = { row: start.row, col: start.col };
    while (curr !== undefined) {
        if (curr.row === end.row && curr.col === end.row) {
            break;
        }

        if (curr.row - 1 >= 0 && grid[curr.row - 1][curr.col] === ".") {
            if (!pathTrace.has(`${curr.row - 1},${curr.col}`)) {
                frontier.push({ row: curr.row - 1, col: curr.col });
                pathTrace.set(`${curr.row - 1},${curr.col}`, curr);
            }
        }

        if (curr.row + 1 < grid.length && grid[curr.row + 1][curr.col] === ".") {
            if (!pathTrace.has(`${curr.row + 1},${curr.col}`)) {
                frontier.push({ row: curr.row + 1, col: curr.col });
                pathTrace.set(`${curr.row + 1},${curr.col}`, curr);
            }
        }

        if (curr.col - 1 >= 0 && grid[curr.row][curr.col - 1] === ".") {
            if (!pathTrace.has(`${curr.row},${curr.col - 1}`)) {
                frontier.push({ row: curr.row, col: curr.col - 1 });
                pathTrace.set(`${curr.row},${curr.col - 1}`, curr);
            }
        }

        if (curr.col + 1 < grid[curr.row].length && grid[curr.row][curr.col + 1] === ".") {
            if (!pathTrace.has(`${curr.row},${curr.col + 1}`)) {
                frontier.push({ row: curr.row, col: curr.col + 1 });
                pathTrace.set(`${curr.row},${curr.col + 1}`, curr);
            }
        }

        curr = frontier.shift();
    }

    let steps = 0;
    let rcurr: Point = { row: end.row, col: end.col };
    while (rcurr.row !== start.row || rcurr.col !== start.col) {
        const from = pathTrace.get(`${rcurr.row},${rcurr.col}`)!;
        rcurr = from;
        grid[rcurr.row][rcurr.col] = "O";
        steps++;
    }

    return steps.toString();
}

export function part2(input: string, test: boolean): string {
    let rows = 71;
    let cols = 71;
    let simulationIterations = 1024;
    if (test) {
        rows = 7;
        cols = 7;
        simulationIterations = 12;
    }

    const points = input.split("\n").slice(0, -1)
        .map<Point>(line => {
            const [x, y] = line.split(",");
            return {
                row: parseInt(y),
                col: parseInt(x)
            };
        });

    const grid = Array.from({ length: rows },
        () => Array.from({ length: cols }, () => "."));

    for (let i = 0; i < simulationIterations; i++) {
        const { row, col } = points[i];
        grid[row][col] = "#";
    }

    const frontier: Point[] = [];
    const pathTrace = new Map<PointString, Point>();
    const start = { row: 0, col: 0 };
    const end = { row: rows - 1, col: cols - 1 };

    let curr: Point | undefined = { row: start.row, col: start.col };
    while (curr !== undefined) {
        if (curr.row === end.row && curr.col === end.row) {
            break;
        }

        if (curr.row - 1 >= 0 && grid[curr.row - 1][curr.col] === ".") {
            if (!pathTrace.has(`${curr.row - 1},${curr.col}`)) {
                frontier.push({ row: curr.row - 1, col: curr.col });
                pathTrace.set(`${curr.row - 1},${curr.col}`, curr);
            }
        }

        if (curr.row + 1 < grid.length && grid[curr.row + 1][curr.col] === ".") {
            if (!pathTrace.has(`${curr.row + 1},${curr.col}`)) {
                frontier.push({ row: curr.row + 1, col: curr.col });
                pathTrace.set(`${curr.row + 1},${curr.col}`, curr);
            }
        }

        if (curr.col - 1 >= 0 && grid[curr.row][curr.col - 1] === ".") {
            if (!pathTrace.has(`${curr.row},${curr.col - 1}`)) {
                frontier.push({ row: curr.row, col: curr.col - 1 });
                pathTrace.set(`${curr.row},${curr.col - 1}`, curr);
            }
        }

        if (curr.col + 1 < grid[curr.row].length && grid[curr.row][curr.col + 1] === ".") {
            if (!pathTrace.has(`${curr.row},${curr.col + 1}`)) {
                frontier.push({ row: curr.row, col: curr.col + 1 });
                pathTrace.set(`${curr.row},${curr.col + 1}`, curr);
            }
        }

        curr = frontier.shift();
    }

    let rcurr: Point = { row: end.row, col: end.col };
    const path = new Set<PointString>();
    while (rcurr.row !== start.row || rcurr.col !== start.col) {
        const from = pathTrace.get(`${rcurr.row},${rcurr.col}`)!;
        rcurr = from;
        path.add(`${rcurr.row},${rcurr.col}`);
    }

    for (let i = simulationIterations; i < points.length; i++) {
        const { row, col } = points[i];

        let canGoAroundObstacle = false;

        grid[row][col] = "#"

        frontier.length = 0;
        const visited = new Set<PointString>();
        curr = { row: start.row, col: start.col };
        while (curr !== undefined) {
            if (curr.row === end.row && curr.col === end.row) {
                canGoAroundObstacle = true;
                break;
            }

            if (visited.has(`${curr.row},${curr.col}`)) {
                curr = frontier.shift();
                continue;
            }

            visited.add(`${curr.row},${curr.col}`);

            if (curr.row - 1 >= 0 && grid[curr.row - 1][curr.col] === ".") {
                frontier.push({ row: curr.row - 1, col: curr.col });
            }

            if (curr.row + 1 < grid.length && grid[curr.row + 1][curr.col] === ".") {
                frontier.push({ row: curr.row + 1, col: curr.col });
            }

            if (curr.col - 1 >= 0 && grid[curr.row][curr.col - 1] === ".") {
                frontier.push({ row: curr.row, col: curr.col - 1 });
            }

            if (curr.col + 1 < grid[curr.row].length && grid[curr.row][curr.col + 1] === ".") {
                frontier.push({ row: curr.row, col: curr.col + 1 });
            }

            curr = frontier.shift();
        }

        if (!canGoAroundObstacle) {
            return `${col},${row}`;
        }
    }

    return grid.map(row => row.join("")).join("\n");
}
