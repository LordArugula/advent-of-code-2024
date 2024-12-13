export function part1(input: string): string {
    return input.trim().split("\n\n")
        .map<ArcadeMachine>(arcadeMachine => {
            const [buttonA, buttonB, prize] = arcadeMachine.split("\n");
            const aX = parseInt(buttonA.slice(buttonA.indexOf("X") + 1, buttonA.indexOf(",")))
            const aY = parseInt(buttonA.slice(buttonA.indexOf("Y") + 1));

            const bX = parseInt(buttonB.slice(buttonB.indexOf("X") + 1, buttonB.indexOf(",")))
            const bY = parseInt(buttonB.slice(buttonB.indexOf("Y") + 1));

            const prizeX = parseInt(prize.slice(prize.indexOf("X=") + 2, prize.indexOf(",")))
            const prizeY = parseInt(prize.slice(prize.indexOf("Y=") + 2));

            return [{ x: aX, y: aY }, { x: bX, y: bY }, { x: prizeX, y: prizeY }];
        })
        .map(solveSystems)
        .filter(tokens => tokens > 0 && Math.round(tokens) === tokens)
        .reduce((sum, tokens) => sum + tokens, 0)
        .toString();
}

type Point = { x: number, y: number };
type ArcadeMachine = [Point, Point, Point];
function solveSystems([buttonA, buttonB, prize]: [Point, Point, Point]) {
    // need to solve system of equations
    // A * buttonA.x + B * buttonB.x = prize.x
    // A * buttonA.y + B * buttonB.y = prize.y
    const pressesB = ((prize.x * buttonA.y) - (prize.y * buttonA.x))
        / ((buttonB.x * buttonA.y) - (buttonB.y * buttonA.x));
    const pressesA = (prize.x - (pressesB * buttonB.x)) / buttonA.x;

    return (3 * pressesA + pressesB);
}

export function part2(input: string): string {
    return input.trim().split("\n\n")
        .map<ArcadeMachine>(arcadeMachine => {
            const [buttonA, buttonB, prize] = arcadeMachine.split("\n");
            const aX = parseInt(buttonA.slice(buttonA.indexOf("X") + 1, buttonA.indexOf(",")))
            const aY = parseInt(buttonA.slice(buttonA.indexOf("Y") + 1));

            const bX = parseInt(buttonB.slice(buttonB.indexOf("X") + 1, buttonB.indexOf(",")))
            const bY = parseInt(buttonB.slice(buttonB.indexOf("Y") + 1));

            const prizeX = 10000000000000 + parseInt(prize.slice(prize.indexOf("X=") + 2, prize.indexOf(",")))
            const prizeY = 10000000000000 + parseInt(prize.slice(prize.indexOf("Y=") + 2));

            return [{ x: aX, y: aY }, { x: bX, y: bY }, { x: prizeX, y: prizeY }];
        })
        .map(solveSystems)
        .filter(tokens => tokens > 0 && Math.round(tokens) === tokens)
        .reduce((sum, tokens) => sum + tokens, 0)
        .toString();
}
