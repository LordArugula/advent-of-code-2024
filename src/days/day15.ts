import { Point } from "../utils/Point";

export function part1(input: string): string {
    const [gridStr, instructionsStr] = input.split("\n\n");

    let grid = gridStr.split("\n").map(line => line.split(""));

    let start: Point;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] === "@") {
                start = { row, col };
            }
        }
    }

    let curr = start!;
    instructionsStr.split("")
        .filter(i => ["^", ">", "<", "v"].includes(i))
        .map(instruction => {
            let moveNext: Point;
            switch (instruction) {
                case "^":
                    moveNext = { row: -1, col: +0 };
                    break;
                case ">":
                    moveNext = { row: +0, col: +1 };
                    break;
                case "v":
                    moveNext = { row: +1, col: +0 };
                    break;
                case "<":
                    moveNext = { row: +0, col: -1 };
                    break;
                default:
                    throw new Error("Invalid input!");
            }
            return moveNext;
        })
        .forEach(moveNext => {

            let boxes: Point[] = [];
            let next: Point = { row: curr.row + moveNext.row, col: curr.col + moveNext.col };
            while (true) {
                if (grid[next.row][next.col] === "#") {
                    break;
                } else if (grid[next.row][next.col] === ".") {
                    boxes.forEach(box => {
                        grid[box.row][box.col] = "O";
                    });

                    grid[curr.row + moveNext.row][curr.col + moveNext.col] = "@";
                    grid[curr.row][curr.col] = ".";
                    curr = { row: curr.row + moveNext.row, col: curr.col + moveNext.col };

                    break;
                }

                next = { row: next.row + moveNext.row, col: next.col + moveNext.col };
                boxes.push(next);
            }
        });

    let totalGPS = 0;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] === "O") {
                totalGPS += row * 100 + col;
            }
        }
    }

    return totalGPS.toString();
}

export function part2(input: string): string {
    const [gridStr, instructionsStr] = input.split("\n\n");

    let grid = gridStr
        .split("\n")
        .map(line => line.split("")
            .map(tile => {
                switch (tile) {
                    case "#":
                        return ["#", "#"];
                    case "O":
                        return ["[", "]"];
                    case ".":
                        return [".", "."];
                    default:
                        return ["@", "."];
                }
            })
            .flat()
        );

    let start: Point;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] === "@") {
                start = { row, col };
            }
        }
    }

    let curr = start!;
    instructionsStr.split("")
        .filter(i => ["^", ">", "<", "v"].includes(i))
        .map(instruction => {
            let moveNext: Point;
            switch (instruction) {
                case "^":
                    moveNext = { row: -1, col: +0 };
                    break;
                case ">":
                    moveNext = { row: +0, col: +1 };
                    break;
                case "v":
                    moveNext = { row: +1, col: +0 };
                    break;
                case "<":
                    moveNext = { row: +0, col: -1 };
                    break;
                default:
                    throw new Error("Invalid input!");
            }
            return moveNext;
        })
        .forEach(moveNext => {
            type Box = { point: Point, part: "[" | "]" };
            let boxes: Box[] = [];
            let next: Point[] = [{
                row: curr.row,
                col: curr.col,
            }];
            let newNext: Point[] = [];

            while (true) {
                if (next.some(n => grid[n.row][n.col] === "#")) {
                    break;
                }

                if (next.every(n => {
                    return grid[n.row][n.col] === ".";
                })) {
                    for (let i = boxes.length - 1; i >= 0; i--) {
                        const box = boxes[i];
                        grid[box.point.row + moveNext.row][box.point.col + moveNext.col] = box.part;
                        grid[box.point.row][box.point.col] = ".";
                    }
                    grid[curr.row + moveNext.row][curr.col + moveNext.col] = "@";
                    grid[curr.row][curr.col] = ".";
                    curr = {
                        row: curr.row + moveNext.row,
                        col: curr.col + moveNext.col,
                    }
                    break;
                }

                for (let i = 0; i < next.length; i++) {
                    const n = next[i];
                    if (grid[n.row][n.col] === ".") {
                        continue;
                    }

                    const newN = { row: n.row + moveNext.row, col: n.col + moveNext.col };
                    if (grid[newN.row][newN.col] === "[") {
                        const boxLeft = { row: newN.row, col: newN.col };
                        const boxRight = { row: newN.row, col: newN.col + 1 };
                        if (moveNext.row === 0) {
                            newNext.push(boxRight);
                        } else {
                            newNext.push(boxLeft, boxRight);
                        }
                        boxes.push(
                            { point: boxLeft, part: "[" },
                            { point: boxRight, part: "]" },
                        );
                    } else if (grid[newN.row][newN.col] === "]") {
                        const boxLeft = { row: newN.row, col: newN.col - 1 };
                        const boxRight = { row: newN.row, col: newN.col };
                        if (moveNext.row === 0) {
                            newNext.push(boxLeft);
                        } else {
                            newNext.push(boxLeft, boxRight);
                        }
                        boxes.push(
                            { point: boxRight, part: "]" },
                            { point: boxLeft, part: "[" },
                        );
                    } else {
                        newNext.push(newN);
                    }
                }
                next.length = 0;
                [next, newNext] = [newNext, next];
            }
        });

    let totalGPS = 0;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            if (grid[row][col] === "[") {
                totalGPS += row * 100 + col;
            }
        }
    }

    return totalGPS.toString();
}
