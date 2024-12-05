export function part1(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    let xmasCount = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            const curr = grid[x][y];
            if (curr !== "X") {
                continue;
            }

            // forwards
            if (y + 3 < grid[x].length
                && grid[x][y + 1] === "M"
                && grid[x][y + 2] === "A"
                && grid[x][y + 3] === "S"
            ) {
                xmasCount++;
            }

            // backwards
            if (y - 3 >= 0
                && grid[x][y - 1] === "M"
                && grid[x][y - 2] === "A"
                && grid[x][y - 3] === "S"
            ) {
                xmasCount++;
            }

            // down
            if (x + 3 < grid.length
                && grid[x + 1][y] === "M"
                && grid[x + 2][y] === "A"
                && grid[x + 3][y] === "S"
            ) {
                xmasCount++;
            }

            // up
            if (x - 3 >= 0
                && grid[x - 1][y] === "M"
                && grid[x - 2][y] === "A"
                && grid[x - 3][y] === "S"
            ) {
                xmasCount++;
            }

            // diagonal, down forwards
            if (y + 3 < grid[x].length
                && x + 3 < grid.length
                && grid[x + 1][y + 1] === "M"
                && grid[x + 2][y + 2] === "A"
                && grid[x + 3][y + 3] === "S"
            ) {
                xmasCount++;
            }

            // diagonal, down backwards
            if (y - 3 >= 0
                && x + 3 < grid.length
                && grid[x + 1][y - 1] === "M"
                && grid[x + 2][y - 2] === "A"
                && grid[x + 3][y - 3] === "S"
            ) {
                xmasCount++;
            }

            // diagonal, up forwards
            if (y + 3 < grid[x].length
                && x - 3 >= 0
                && grid[x - 1][y + 1] === "M"
                && grid[x - 2][y + 2] === "A"
                && grid[x - 3][y + 3] === "S"
            ) {
                xmasCount++;
            }

            // diagonal, up backwards
            if (y - 3 >= 0
                && x - 3 >= 0
                && grid[x - 1][y - 1] === "M"
                && grid[x - 2][y - 2] === "A"
                && grid[x - 3][y - 3] === "S"
            ) {
                xmasCount++;
            }
        }
    }

    return xmasCount.toString();
}

export function part2(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    let xmasCount = 0;
    for (let x = 1; x < grid.length - 1; x++) {
        for (let y = 1; y < grid[x].length - 1; y++) {
            const curr = grid[x][y];
            if (curr !== "A") {
                continue;
            }

            // M.M
            // .A.
            // S.S
            if (grid[x - 1][y - 1] === "M"
                && grid[x + 1][y + 1] === "S"
                && grid[x - 1][y + 1] === "M"
                && grid[x + 1][y - 1] === "S"
            ) {
                xmasCount++;
            }

            // S.S
            // .A.
            // M.M
            if (grid[x - 1][y - 1] === "S"
                && grid[x + 1][y + 1] === "M"
                && grid[x - 1][y + 1] === "S"
                && grid[x + 1][y - 1] === "M"
            ) {
                xmasCount++;
            }

            // S.M
            // .A.
            // S.M
            if (grid[x - 1][y - 1] === "S"
                && grid[x + 1][y + 1] === "M"
                && grid[x - 1][y + 1] === "M"
                && grid[x + 1][y - 1] === "S"
            ) {
                xmasCount++;
            }

            // M.S
            // .A.
            // M.S
            if (grid[x - 1][y - 1] === "M"
                && grid[x + 1][y + 1] === "S"
                && grid[x - 1][y + 1] === "S"
                && grid[x + 1][y - 1] === "M"
            ) {
                xmasCount++;
            }
        }
    }

    return xmasCount.toString();
}
