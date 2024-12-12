import { Point, PointString } from "../utils/Point";

export function part1(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(''));

    const visited = new Set<PointString>();
    const regions = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (visited.has(`${row},${col}`)) {
                continue;
            }

            const frontier: Point[] = [];
            let curr: Point | undefined = { row, col };
            let region: Point[] = [];
            while (curr !== undefined) {
                if (visited.has(`${curr.row},${curr.col}`)) {
                    curr = frontier.pop();
                    continue;
                }

                region.push(curr);
                visited.add(`${curr.row},${curr.col}`);

                if (curr.row + 1 < grid.length
                    && grid[curr.row][curr.col] === grid[curr.row + 1][curr.col]) {
                    frontier.push({ row: curr.row + 1, col: curr.col });
                }

                if (curr.row - 1 >= 0
                    && grid[curr.row][curr.col] === grid[curr.row - 1][curr.col]) {
                    frontier.push({ row: curr.row - 1, col: curr.col });
                }

                if (curr.col + 1 < grid[curr.row].length
                    && grid[curr.row][curr.col] === grid[curr.row][curr.col + 1]) {
                    frontier.push({ row: curr.row, col: curr.col + 1 });
                }

                if (curr.col - 1 >= 0
                    && grid[curr.row][curr.col] === grid[curr.row][curr.col - 1]) {
                    frontier.push({ row: curr.row, col: curr.col - 1 });
                }

                curr = frontier.pop();
            }

            regions.push(region);
        }
    }

    return regions
        .map(region => {
            const area = region.length;
            const perimeter = region
                .map(point => {
                    let neighborCount = 0;

                    if (point.row + 1 < grid.length
                        && grid[point.row][point.col] === grid[point.row + 1][point.col]) {
                        neighborCount++;
                    }

                    if (point.row - 1 >= 0
                        && grid[point.row][point.col] === grid[point.row - 1][point.col]) {
                        neighborCount++;
                    }

                    if (point.col + 1 < grid[point.row].length
                        && grid[point.row][point.col] === grid[point.row][point.col + 1]) {
                        neighborCount++;
                    }

                    if (point.col - 1 >= 0
                        && grid[point.row][point.col] === grid[point.row][point.col - 1]) {
                        neighborCount++;
                    }

                    return 4 - neighborCount;
                })
                .reduce((sum, perimeter) => sum + perimeter, 0);
            return area * perimeter;
        })
        .reduce((sum, cost) => sum + cost, 0).toString();
}

export function part2(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(''));

    const visited = new Set<PointString>();
    const regions = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (visited.has(`${row},${col}`)) {
                continue;
            }

            const frontier: Point[] = [];
            let curr: Point | undefined = { row, col };
            let region: Point[] = [];
            while (curr !== undefined) {
                if (visited.has(`${curr.row},${curr.col}`)) {
                    curr = frontier.pop();
                    continue;
                }

                region.push(curr);
                visited.add(`${curr.row},${curr.col}`);

                if (curr.row + 1 < grid.length
                    && grid[curr.row][curr.col] === grid[curr.row + 1][curr.col]) {
                    frontier.push({ row: curr.row + 1, col: curr.col });
                }

                if (curr.row - 1 >= 0
                    && grid[curr.row][curr.col] === grid[curr.row - 1][curr.col]) {
                    frontier.push({ row: curr.row - 1, col: curr.col });
                }

                if (curr.col + 1 < grid[curr.row].length
                    && grid[curr.row][curr.col] === grid[curr.row][curr.col + 1]) {
                    frontier.push({ row: curr.row, col: curr.col + 1 });
                }

                if (curr.col - 1 >= 0
                    && grid[curr.row][curr.col] === grid[curr.row][curr.col - 1]) {
                    frontier.push({ row: curr.row, col: curr.col - 1 });
                }

                curr = frontier.pop();
            }

            regions.push(region);
        }
    }


    type PointNeighbor = {
        point: Point;
        neighbors: [number, number, number, number];
    };

    return regions
        .map<PointNeighbor[]>(region => {
            return region.map(point => {
                let [top, bottom, left, right] = [0, 0, 0, 0];
                if (point.row + 1 < grid.length
                    && grid[point.row][point.col] === grid[point.row + 1][point.col]) {
                    bottom = 1;
                }

                if (point.row - 1 >= 0
                    && grid[point.row][point.col] === grid[point.row - 1][point.col]) {
                    top = 1;
                }

                if (point.col + 1 < grid[point.row].length
                    && grid[point.row][point.col] === grid[point.row][point.col + 1]) {
                    right = 1;
                }

                if (point.col - 1 >= 0
                    && grid[point.row][point.col] === grid[point.row][point.col - 1]) {
                    left = 1
                }
                return { point, neighbors: [top, bottom, left, right] };
            });
        })
        .map(region => {
            const segments = region
                .map(point => {
                    const [top, bottom, left, right] = point.neighbors;

                    type Segment = [Point, Point, "horizontal" | "vertical"];
                    const sides: Segment[] = [];
                    if (top === 0) {
                        sides.push([
                            { row: point.point.row, col: point.point.col },
                            { row: point.point.row, col: point.point.col + 1 },
                            "horizontal"
                        ]);
                    }

                    if (bottom === 0) {
                        sides.push([
                            { row: point.point.row + 1, col: point.point.col + 1 },
                            { row: point.point.row + 1, col: point.point.col },
                            "horizontal"
                        ]);
                    }

                    if (left === 0) {
                        sides.push([
                            { row: point.point.row + 1, col: point.point.col },
                            { row: point.point.row, col: point.point.col },
                            "vertical"
                        ]);
                    }

                    if (right === 0) {
                        sides.push([
                            { row: point.point.row, col: point.point.col + 1 },
                            { row: point.point.row + 1, col: point.point.col + 1 },
                            "vertical"
                        ]);
                    }

                    return sides;
                })
                .flat();

            for (let i = 0; i < segments.length; i++) {
                const segmentA = segments[i];

                for (let x = i + 1; x < segments.length; x++) {
                    let segmentB = segments[x];

                    if (segmentA[2] !== segmentB[2]) {
                        continue;
                    }

                    if (segmentA[1].row === segmentB[0].row
                        && segmentA[1].col === segmentB[0].col) {
                        segmentB[0].row = segmentA[0].row;
                        segmentB[0].col = segmentA[0].col;
                        segments[i] = segments[0];
                        segments.shift();
                        i--;
                        break;
                    } else if (segmentB[1].row === segmentA[0].row
                        && segmentB[1].col === segmentA[0].col) {
                        segmentB[1].row = segmentA[1].row;
                        segmentB[1].col = segmentA[1].col;
                        segments[i] = segments[0];
                        segments.shift();
                        i--;
                        break;
                    }
                }
            }

            const area = region.length;
            return segments.length * area;
        })
        .reduce((sum, cost) => sum + cost, 0).toString();
    return ":3";
}
