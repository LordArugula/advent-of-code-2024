import { Point } from "../utils/Point";

export function part1(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    const antennaes = grid.reduce((frequencies, line, row) => {
        return line.reduce((frequencies, node, col) => {
            if (node === ".") {
                return frequencies;
            }

            let positions = frequencies.get(node);
            if (!positions) {
                positions = [];
                frequencies.set(node, positions);
            }
            positions.push({ row, col });

            return frequencies;
        }, frequencies);
    }, new Map<string, Point[]>);

    const antinodes: Point[] = [];
    for (const [_, positions] of antennaes) {
        for (let i = 0; i < positions.length; i++) {
            let curr = positions[i];
            for (let x = i + 1; x < positions.length; x++) {
                let other = positions[x];

                let distance = {
                    x: curr.row - other.row,
                    y: curr.col - other.col,
                };

                let antinodeA: Point = {
                    row: curr.row + distance.x,
                    col: curr.col + distance.y,
                };
                if (antinodeA.row >= 0
                    && antinodeA.row < grid.length
                    && antinodeA.col >= 0
                    && antinodeA.col < grid[antinodeA.row].length
                ) {
                    antinodes.push(antinodeA);
                }

                let antinodeB: Point = {
                    row: other.row - distance.x,
                    col: other.col - distance.y,
                };
                if (antinodeB.row >= 0
                    && antinodeB.row < grid.length
                    && antinodeB.col >= 0
                    && antinodeB.col < grid[antinodeB.row].length
                ) {
                    antinodes.push(antinodeB);
                }
            }
        }
    }

    return antinodes
        .filter((antinode, index, arr) => {
            return index === arr.findIndex(other => antinode.row === other.row && antinode.col === other.col)
        })
        .length
        .toString();
}

export function part2(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    const antennaes = grid.reduce((frequencies, line, row) => {
        return line.reduce((frequencies, node, col) => {
            if (node === ".") {
                return frequencies;
            }

            let positions = frequencies.get(node);
            if (!positions) {
                positions = [];
                frequencies.set(node, positions);
            }
            positions.push({ row, col });

            return frequencies;
        }, frequencies);
    }, new Map<string, Point[]>);

    const antinodes: Point[] = [];
    for (const [_, positions] of antennaes) {
        for (let i = 0; i < positions.length; i++) {
            let curr = positions[i];
            for (let x = i + 1; x < positions.length; x++) {
                let other = positions[x];

                let distance = {
                    x: curr.row - other.row,
                    y: curr.col - other.col,
                };

                let antinodeA: Point = {
                    row: curr.row,
                    col: curr.col,
                };
                while (antinodeA.row >= 0
                    && antinodeA.row < grid.length
                    && antinodeA.col >= 0
                    && antinodeA.col < grid[antinodeA.row].length
                ) {
                    antinodes.push(antinodeA);
                    antinodeA = {
                        row: antinodeA.row + distance.x,
                        col: antinodeA.col + distance.y
                    };
                }

                let antinodeB: Point = {
                    row: other.row,
                    col: other.col,
                };
                while (antinodeB.row >= 0
                    && antinodeB.row < grid.length
                    && antinodeB.col >= 0
                    && antinodeB.col < grid[antinodeB.row].length
                ) {
                    antinodes.push(antinodeB);
                    antinodeB = {
                        row: antinodeB.row - distance.x,
                        col: antinodeB.col - distance.y
                    };
                }
            }
        }
    }

    return antinodes
        .filter((antinode, index, arr) => {
            return index === arr.findIndex(other => antinode.row === other.row && antinode.col === other.col)
        })
        .length
        .toString();
    return ":3";
}
