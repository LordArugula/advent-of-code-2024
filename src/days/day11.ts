export function part1(input: string): number {
    const numBlinks = 25;
    return countStones(input, numBlinks);
}

export function part2(input: string): number {
    const numBlinks = 75;
    return countStones(input, numBlinks);
}

function countStones(input: string, numBlinks: number) {
    const stones = input.slice(0, -1).split(" ")
        .map(stone => parseInt(stone))
        .reduce((stones, stone) => {
            const count = stones.get(stone);
            stones.set(stone, count ? count + 1 : 1);
            return stones;
        }, new Map<number, number>());

    let [oldStones, newStones] = [stones, new Map<number, number>()];
    for (let i = 0; i < numBlinks; i++) {
        for (let [stone, count] of oldStones) {
            if (stone === 0) {
                const oneStonesCount = newStones.get(1);
                newStones.set(1, oneStonesCount ? oneStonesCount + count : count);
            } else if (stone.toString().length % 2 === 0) {
                const stoneStr = stone.toString();
                const leftStone = parseInt(stoneStr.slice(0, stoneStr.length / 2));
                const leftStonesCount = newStones.get(leftStone);
                newStones.set(leftStone, leftStonesCount ? leftStonesCount + count : count);

                const rightStone = parseInt(stoneStr.slice(stoneStr.length / 2));
                const rightStonesCount = newStones.get(rightStone);
                newStones.set(rightStone, rightStonesCount ? rightStonesCount + count : count);
            } else {
                const new2024Stone = stone * 2024;
                const new2024StonesCount = newStones.get(new2024Stone);
                newStones.set(new2024Stone, new2024StonesCount ? new2024StonesCount + count : count);
            }
        }
        oldStones.clear();
        [oldStones, newStones] = [newStones, oldStones];
    }

    return [...oldStones.values()].reduce((sum, count) => sum + count, 0);
}
