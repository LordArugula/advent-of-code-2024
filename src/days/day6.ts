export function part1(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    let startRow = undefined;
    let startCol = undefined;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === "^") {
                startRow = row;
                startCol = col;
            }
        }
    }

    if (startRow === undefined || startCol === undefined) {
        throw new Error("Missing start position");
    }

    let directions = ["up", "right", "down", "left"];

    let currRow: number = startRow;
    let currCol: number = startCol;
    let currDirection = 0;
    while (currRow >= 0
        && currRow < grid.length
        && currCol >= 0
        && currCol < grid[currRow].length
    ) {
        let nextRow;
        let nextCol;
        switch (directions[currDirection]) {
            case "up":
                nextRow = currRow - 1;
                nextCol = currCol;
                break;
            case "right":
                nextRow = currRow;
                nextCol = currCol + 1;
                break;
            case "down":
                nextRow = currRow + 1;
                nextCol = currCol;
                break;
            case "left":
                nextRow = currRow;
                nextCol = currCol - 1;
                break;
            default:
                throw new Error("Invalid direction");
        }

        if (nextRow >= 0
            && nextRow < grid.length
            && nextCol >= 0
            && nextCol < grid[nextRow].length
            && grid[nextRow][nextCol] === "#"
        ) {
            currDirection = (currDirection + 1) % directions.length;
            switch (directions[currDirection]) {
                case "up":
                    nextRow = currRow - 1;
                    nextCol = currCol;
                    break;
                case "right":
                    nextRow = currRow;
                    nextCol = currCol + 1;
                    break;
                case "down":
                    nextRow = currRow + 1;
                    nextCol = currCol;
                    break;
                case "left":
                    nextRow = currRow;
                    nextCol = currCol - 1;
                    break;
                default:
                    throw new Error("Invalid direction");
            }
        }

        grid[currRow][currCol] = "X";
        currRow = nextRow;
        currCol = nextCol;
    }

    const spacesWalked = grid.reduce((sum, line) => {
        return sum + line.reduce((sum, p) => sum + (p === "X" ? 1 : 0), 0);
    }, 0);

    return spacesWalked.toString();
}

type Point = {
    row: number,
    col: number
};

export function part2(input: string): string {
    const grid = input.split("\n").slice(0, -1)
        .map(line => line.split(""));

    let startRow = undefined;
    let startCol = undefined;
    const obstacles: Point[] = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === "#") {
                obstacles.push({ row, col });
            } else if (grid[row][col] === "^") {
                startRow = row;
                startCol = col;
            }
        }
    }

    let directions = ["up", "right", "down", "left"];

    const curr: Point = { row: startRow!, col: startCol! };
    let currDirection = 0;
    let onGrid = true;
    let loops = 0;
    const loopingObstacles = [];
    while (onGrid) {
        switch (directions[currDirection]) {
            case "up": {
                const obstacle = obstacles
                    .filter(({ row, col }) => col === curr.col && row < curr.row)
                    .sort((a, b) => b.row - a.row)
                    .find(obstacle => obstacle);

                // let min = (obstacle?.row || -1) + 1;
                let min = obstacle ? obstacle.row + 1 : 0;
                let max = curr.row;
                for (let i = min; i < max; i++) {
                    if (willLoop(curr, currDirection, [...obstacles, { row: i, col: curr.col }])) {
                        loops++;
                        loopingObstacles.push({ row: i, col: curr.col });
                    }
                }

                if (!obstacle) {
                    onGrid = false;
                    break;
                }

                curr.row = obstacle.row + 1;
                currDirection = (currDirection + 1) % directions.length;
                break;
            }
            case "right": {
                const obstacle = obstacles
                    .filter(({ row, col }) => row === curr.row && col > curr.col)
                    .sort((a, b) => a.col - b.col)
                    .find(obstacle => obstacle);

                let min = curr.col + 1;
                let max = obstacle ? obstacle.col : grid[curr.row].length;
                // let max = (obstacle?.col || grid[curr.row].length) - 1;
                for (let i = min; i < max; i++) {
                    if (willLoop(curr, currDirection, [...obstacles, { row: curr.row, col: i }])) {
                        loops++;
                        loopingObstacles.push({ row: curr.row, col: i })
                    }
                }

                if (!obstacle) {
                    onGrid = false;
                    break;
                }

                curr.col = obstacle.col - 1;
                currDirection = (currDirection + 1) % directions.length;

                break;
            }
            case "down": {
                const obstacle = obstacles
                    .filter(({ row, col }) => col === curr.col && row > curr.row)
                    .sort((a, b) => a.row - b.row)
                    .find(obstacle => obstacle);

                let min = curr.row + 1;
                // let max = (obstacle?.row || grid.length) - 1;
                let max = obstacle ? obstacle.row : grid.length;
                for (let i = min; i < max; i++) {
                    // for (let i = curr.row + 1; i <= obstacle.row; i++) {
                    if (willLoop(curr, currDirection, [...obstacles, { row: i, col: curr.col }])) {
                        loops++;
                        loopingObstacles.push({ row: i, col: curr.col });
                    }
                }

                if (!obstacle) {
                    onGrid = false;
                    break;
                }

                curr.row = obstacle.row - 1;
                currDirection = (currDirection + 1) % directions.length;

                break;
            }
            case "left": {
                const obstacle = obstacles
                    .filter(({ row, col }) => row === curr.row && col < curr.col)
                    .sort((a, b) => b.col - a.col)
                    .find(obstacle => obstacle);

                let min = obstacle ? obstacle.col + 1 : 0;
                let max = curr.col;
                for (let i = min; i < max; i++) {
                    // for (let i = obstacle.col; i < curr.col; i++) {
                    if (willLoop(curr, currDirection, [...obstacles, { row: curr.row, col: i }])) {
                        loops++;
                        loopingObstacles.push({ row: curr.row, col: i });
                    }
                }

                if (!obstacle) {
                    onGrid = false;
                    break;
                }

                curr.col = obstacle.col + 1;
                currDirection = (currDirection + 1) % directions.length;

                break;
            }
            default: throw new Error("Invalid direction");
        }
    }

    return loopingObstacles
    // remove duplicates
        .filter((obstacle, index, arr) => {
            return index === arr.findIndex(obst => obstacle.row === obst.row && obstacle.col === obst.col)
                && !obstacles.find(obst => obstacle.row === obst.row && obstacle.col === obst.col)
        })
    // remove errors
        .filter((obstacle) => {
            return willLoop({ row: startRow!, col: startCol!}, 0, [...obstacles, obstacle])
        })
        .length.toString();
}

function willLoop(start: Point, direction: number, obstacles: Point[]): boolean {
    const curr: Point = { row: start.row, col: start.col };
    let directions = ["up", "right", "down", "left"];
    let currDirection = direction;
    let visitedObstacles: { obstacle: Point, direction: number }[] = [];
    while (true) {
        switch (directions[currDirection]) {
            case "up": {
                const obstacle = obstacles
                    .filter(({ row, col }) => col === curr.col && row < curr.row)
                    .sort((a, b) => b.row - a.row)
                    .find(obstacle => obstacle);

                if (!obstacle) {
                    return false;
                }

                if (visitedObstacles.find(({ obstacle: vObstacle, direction }) => {
                    return vObstacle.row === obstacle.row &&
                        vObstacle.col === obstacle.col
                        && direction === currDirection
                })) {
                    // console.log(obstacle);
                    return true;
                }

                visitedObstacles.push({ obstacle, direction: currDirection });
                curr.row = obstacle.row + 1;
                currDirection = (currDirection + 1) % directions.length;
                break;
            }
            case "right": {
                const obstacle = obstacles
                    .filter(({ row, col }) => row === curr.row && col > curr.col)
                    .sort((a, b) => a.col - b.col)
                    .find(obstacle => obstacle);

                if (!obstacle) {
                    return false;
                }

                if (visitedObstacles.find(({ obstacle: vObstacle, direction }) => {
                    return vObstacle.row === obstacle.row &&
                        vObstacle.col === obstacle.col
                        && direction === currDirection
                })) {
                    // console.log(obstacle);
                    return true;
                }

                visitedObstacles.push({ obstacle, direction: currDirection });

                curr.col = obstacle.col - 1;
                currDirection = (currDirection + 1) % directions.length;

                break;
            }
            case "down": {
                const obstacle = obstacles
                    .filter(({ row, col }) => col === curr.col && row > curr.row)
                    .sort((a, b) => a.row - b.row)
                    .find(obstacle => obstacle);

                if (!obstacle) {
                    return false;
                }

                if (visitedObstacles.find(({ obstacle: vObstacle, direction }) => {
                    return vObstacle.row === obstacle.row &&
                        vObstacle.col === obstacle.col
                        && direction === currDirection
                })) {
                    // console.log(obstacle);
                    return true;
                }

                visitedObstacles.push({ obstacle, direction: currDirection });

                curr.row = obstacle.row - 1;
                currDirection = (currDirection + 1) % directions.length;

                break;
            }
            case "left": {
                const obstacle = obstacles
                    .filter(({ row, col }) => row === curr.row && col < curr.col)
                    .sort((a, b) => b.col - a.col)
                    .find(obstacle => obstacle);

                if (!obstacle) {
                    return false;
                }

                if (visitedObstacles.find(({ obstacle: vObstacle, direction }) => {
                    return vObstacle.row === obstacle.row &&
                        vObstacle.col === obstacle.col
                        && direction === currDirection
                })) {
                    // console.log(obstacle);
                    return true;
                }

                visitedObstacles.push({ obstacle, direction: currDirection });

                curr.col = obstacle.col + 1;
                currDirection = (currDirection + 1) % directions.length;

                break;
            }
            default: throw new Error("Invalid direction");
        }
    }
    return true;
}
