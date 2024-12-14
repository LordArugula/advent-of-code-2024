type Vector2 = { x: number; y: number };
type Quadrant = Vector2[];
type Bathroom = [Quadrant, Quadrant, Quadrant, Quadrant];

export function part1(input: string, test: boolean): string {
    const iterations = 100;
    let width = 101;
    let height = 103;
    if (test) {
        width = 11;
        height = 7;
    }

    return input.split("\n")
        .slice(0, -1)
        .map(robot => {
            const position = robot.slice(0, robot.indexOf(" "));
            const px = parseInt(position.slice(position.indexOf("=") + 1, position.indexOf(",")));
            const py = parseInt(position.slice(position.indexOf(",") + 1));

            const velocity = robot.slice(robot.indexOf(" ") + 1);
            const vx = parseInt(velocity.slice(velocity.indexOf("=") + 1, velocity.indexOf(",")));
            const vy = parseInt(velocity.slice(velocity.indexOf(",") + 1));

            return [
                {
                    x: px,
                    y: py,
                },
                {
                    x: vx < 0 ? vx - (Math.floor(vx / width) * width) : vx,
                    y: vy < 0 ? vy - (Math.floor(vy / height) * height) : vy,
                }
            ];
        })
        .map(([position, velocity]) => {
            return {
                x: (position.x + velocity.x * iterations) % width,
                y: (position.y + velocity.y * iterations) % height,
            };
        })
        .reduce<Bathroom>(([a, b, c, d], robot) => {
            const quadrantWidth = Math.floor(width / 2);
            const quadrantHeight = Math.floor(height / 2);

            if (robot.x < quadrantWidth && robot.y < quadrantHeight) {
                a.push(robot);
            } else if (robot.x > quadrantWidth && robot.y < quadrantHeight) {
                b.push(robot);
            } else if (robot.x < quadrantWidth && robot.y > quadrantHeight) {
                c.push(robot);
            } else if (robot.x > quadrantWidth && robot.y > quadrantHeight) {
                d.push(robot);
            }

            return [a, b, c, d];
        }, [[], [], [], []])
        .reduce((safetyFactor, quadrant) => {
            return safetyFactor * quadrant.length;
        }, 1)
        .toString();
}

export function part2(input: string, test: boolean): string {
    let width = 101;
    let height = 103;
    if (test) {
        width = 11;
        height = 7;
    }

    const robots = input.split("\n")
        .slice(0, -1)
        .map(robot => {
            const position = robot.slice(0, robot.indexOf(" "));
            const px = parseInt(position.slice(position.indexOf("=") + 1, position.indexOf(",")));
            const py = parseInt(position.slice(position.indexOf(",") + 1));

            const velocity = robot.slice(robot.indexOf(" ") + 1);
            const vx = parseInt(velocity.slice(velocity.indexOf("=") + 1, velocity.indexOf(",")));
            const vy = parseInt(velocity.slice(velocity.indexOf(",") + 1));

            return [
                {
                    x: px,
                    y: py,
                },
                {
                    x: vx < 0 ? vx - (Math.floor(vx / width) * width) : vx,
                    y: vy < 0 ? vy - (Math.floor(vy / height) * height) : vy,
                }
            ];
        });

    let iterations = 0;
    const robotLookup = new Set<`${number},${number}`>();

    while (true) {
        robotLookup.clear();
        robots.reduce((set, [position, _]) => {
            set.add(`${position.x},${position.y}`)
            return set;
        }, robotLookup);

        let visited = new Set<`${number},${number}`>();
        let frontier: Vector2[] = [];
        let maxArea = 0;

        for (let i = 0; i < robots.length; i++) {
            const [pos, _] = robots[i];
            let area = 0;
            let curr: Vector2 | undefined = { x: pos.x, y: pos.y };
            while (curr !== undefined) {
                if (visited.has(`${curr.x},${curr.y}`)) {
                    curr = frontier.pop();
                    continue;
                }

                visited.add(`${curr.x},${curr.y}`);

                if (robotLookup.has(`${curr.x + 1},${curr.y}`)) {
                    frontier.push({ x: curr.x + 1, y: curr.y });
                }

                if (robotLookup.has(`${curr.x - 1},${curr.y}`)) {
                    frontier.push({ x: curr.x - 1, y: curr.y });
                }

                if (robotLookup.has(`${curr.x},${curr.y + 1}`)) {
                    frontier.push({ x: curr.x, y: curr.y + 1 });
                }

                if (robotLookup.has(`${curr.x},${curr.y - 1}`)) {
                    frontier.push({ x: curr.x, y: curr.y - 1 });
                }

                area++;
                curr = frontier.pop();
            }

            if (area >= maxArea) {
                maxArea = area;
            }
        }

        if (maxArea > 100) {
            break;
        }

        robots.forEach(([position, velocity]) => {
            position.x = (position.x + velocity.x) % width;
            position.y = (position.y + velocity.y) % height;
        });

        iterations++;
    }

    return iterations.toString();
}
