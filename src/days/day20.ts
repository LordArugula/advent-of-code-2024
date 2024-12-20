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
        throw new Error("Invalid input");
    }

    const frontier: Point[] = [];
    const distances = new Map<PointString, number>();
    let curr: Point | undefined = { row: start.row, col: start.col };
    distances.set(`${curr.row},${curr.col}`, 0);

    while (curr !== undefined) {
        if (curr.row === end.row && curr.col === end.col) {
            break;
        }

        const currDistance = distances.get(`${curr.row},${curr.col}`)!;

        const up = { row: curr.row - 1, col: curr.col };
        if (up.row >= 0 && grid[up.row][up.col] !== "#") {
            if (!distances.has(`${up.row},${up.col}`)) {
                frontier.push(up);
                distances.set(`${up.row},${up.col}`, currDistance + 1)
            }
        }

        const down = { row: curr.row + 1, col: curr.col };
        if (down.row < grid.length && grid[down.row][down.col] !== "#") {
            if (!distances.has(`${down.row},${down.col}`)) {
                frontier.push(down);
                distances.set(`${down.row},${down.col}`, currDistance + 1)
            }
        }

        const left = { row: curr.row, col: curr.col - 1 };
        if (left.col >= 0 && grid[left.row][left.col] !== "#") {
            if (!distances.has(`${left.row},${left.col}`)) {
                frontier.push(left);
                distances.set(`${left.row},${left.col}`, currDistance + 1)
            }
        }

        const right = { row: curr.row, col: curr.col + 1 };
        if (right.col < grid[right.row].length && grid[right.row][right.col] !== "#") {
            if (!distances.has(`${right.row},${right.col}`)) {
                frontier.push(right);
                distances.set(`${right.row},${right.col}`, currDistance + 1)
            }
        }

        curr = frontier.shift();
    }

    const distanceToSave = 100;

    let cheatsCount = 0;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] !== "#") {
                continue;
            }

            const neighbors: Point[] = [
                { row: row - 1, col: col }, // up
                { row: row, col: col + 1 }, // right
                { row: row + 1, col: col }, // down
                { row: row, col: col - 1 }, // left
            ]

            // check if any pairs of neighbors has a difference of over 100
            for (let x = 0; x < neighbors.length; x++) {
                const neighborA = neighbors[x];
                if (grid[neighborA.row][neighborA.col] === "#") {
                    continue;
                }

                const distanceToA = distances.get(`${neighborA.row},${neighborA.col}`)!;

                for (let y = x + 1; y < neighbors.length; y++) {
                    const neighborB = neighbors[y];
                    if (grid[neighborB.row][neighborB.col] === "#") {
                        continue;
                    }

                    const distanceToB = distances.get(`${neighborB.row},${neighborB.col}`)!;
                    if (Math.abs(distanceToB - distanceToA) >= distanceToSave + 2) {
                        cheatsCount++;
                    }
                }
            }
        }
    }

    return cheatsCount.toString();
}

export function part2(input: string, test: boolean): string {
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
        throw new Error("Invalid input");
    }

    const frontier: Point[] = [];
    const distances = new Map<PointString, number>();
    let curr: Point | undefined = { row: start.row, col: start.col };
    distances.set(`${curr.row},${curr.col}`, 0);

    while (curr !== undefined) {
        if (curr.row === end.row && curr.col === end.col) {
            break;
        }

        const currDistance = distances.get(`${curr.row},${curr.col}`)!;

        const up = { row: curr.row - 1, col: curr.col };
        if (up.row >= 0 && grid[up.row][up.col] !== "#") {
            if (!distances.has(`${up.row},${up.col}`)) {
                frontier.push(up);
                distances.set(`${up.row},${up.col}`, currDistance + 1)
            }
        }

        const down = { row: curr.row + 1, col: curr.col };
        if (down.row < grid.length && grid[down.row][down.col] !== "#") {
            if (!distances.has(`${down.row},${down.col}`)) {
                frontier.push(down);
                distances.set(`${down.row},${down.col}`, currDistance + 1)
            }
        }

        const left = { row: curr.row, col: curr.col - 1 };
        if (left.col >= 0 && grid[left.row][left.col] !== "#") {
            if (!distances.has(`${left.row},${left.col}`)) {
                frontier.push(left);
                distances.set(`${left.row},${left.col}`, currDistance + 1)
            }
        }

        const right = { row: curr.row, col: curr.col + 1 };
        if (right.col < grid[right.row].length && grid[right.row][right.col] !== "#") {
            if (!distances.has(`${right.row},${right.col}`)) {
                frontier.push(right);
                distances.set(`${right.row},${right.col}`, currDistance + 1)
            }
        }

        curr = frontier.shift();
    }

    const distanceToSave = test ? 50 : 100;

    // let cheats = new Map<`${PointString},${PointString}`, number>();
    let cheats = 0;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] === "#") {
                continue;
            }

            const maxSteps = 20;
            const startDistance = distances.get(`${row},${col}`)!;

            const pointsToExplore: Point[] = [];

            // console.log("top:")
            for (let i = -maxSteps; i < 0; i++) {
                for (let k = -(i + maxSteps); k <= (i + maxSteps); k++) {
                    pointsToExplore.push({ row: row + i, col: col + k });
                }
            }

            // console.log("bottom:");
            for (let i = 0; i <= maxSteps; i++) {
                for (let k = (i - maxSteps); k <= (-i + maxSteps); k++) {
                    pointsToExplore.push({ row: row + i, col: col + k });
                }
            }

            cheats += pointsToExplore.filter(point => {
                // return point.row >= 0 && point.row < grid.length
                //     && point.col >= 0 && point.col < grid[point.row].length
                const endDistance = distances.get(`${point.row},${point.col}`);
                if (endDistance === undefined) {
                    return false;
                }
                const steps = Math.abs(point.row - row) + Math.abs(point.col - col);
                return endDistance - startDistance >= distanceToSave + steps;
            }).length;
        }
    }

    // console.log([
    //     ...([...cheats.values()].reduce((table, val) => {
    //         const count = table.get(val);
    //         if (count === undefined) {
    //             table.set(val, 1);
    //         } else {
    //             table.set(val, count + 1);
    //         }
    //         return table;
    //     }, new Map<number, number>())
    //         .entries())].sort((a, b) => a[0] - b[0]));

    // return cheats.size.toString();
    return cheats.toString();
}
