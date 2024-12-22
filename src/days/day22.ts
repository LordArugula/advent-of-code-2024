import { windows } from "../utils/array-helpers";

export function part1(input: string): string {
    return input.split("\n").slice(0, -1)
        .map(seed => BigInt(parseInt(seed)))
        .map(seed => {
            let secretNumber = seed;
            for (let i = 0; i < 2000; i++) {
                secretNumber = generateSecretNumber(secretNumber);
            }
            return Number(secretNumber);
        })
        .reduce((sum, secretNumber) => sum + secretNumber, 0)
        .toString();
}

function generateSecretNumber(seed: bigint) {
    let nextSecretNumber = seed;
    nextSecretNumber = nextSecretNumber ^ (nextSecretNumber * 64n);
    nextSecretNumber = nextSecretNumber % 16777216n;

    nextSecretNumber = nextSecretNumber ^ (nextSecretNumber / 32n);
    nextSecretNumber = nextSecretNumber % 16777216n;

    nextSecretNumber = nextSecretNumber ^ (nextSecretNumber * 2048n);
    nextSecretNumber = nextSecretNumber % 16777216n;
    return nextSecretNumber;
}

function* secretNumberGenerator(seed: bigint) {
    let secretNumber = seed;

    yield secretNumber;
    for (let i = 0; i < 2000; i++) {
        secretNumber = generateSecretNumber(secretNumber);
        yield secretNumber;
    }
}

export function part2(input: string): string {
    const secretNumbers = input.split("\n").slice(0, -1)
        .map(seed => BigInt(parseInt(seed)))
        .map(seed => Array.from(secretNumberGenerator(seed)).map(secretNumber => secretNumber - (secretNumber / 10n) * 10n));

    type Change = { price: number, change: number };
    type ChangeKey = `${number},${number},${number},${number}`;
    const changes = secretNumbers.map<Change[]>(secretNumbers => {
        return secretNumbers.map((value, index, array) => {
            if (index === 0) {
                return {
                    price: Number(value),
                    change: 0,
                };
            }

            return {
                price: Number(value),
                change: Number(array[index] - array[index - 1])
            };
        })
    });

    const changeSequences = changes.map(changes => windows(changes, 4));

    const changeSequenceMaps = changeSequences.map(changeSequences => {
        return changeSequences.reduce((uniqueSequences, changeSequence) => {
            const [a, b, c, d] = changeSequence;
            if (!uniqueSequences.has(`${a.change},${b.change},${c.change},${d.change}`)) {
                uniqueSequences.set(`${a.change},${b.change},${c.change},${d.change}`, d.price);
            }

            return uniqueSequences;
        }, new Map<ChangeKey, number>());
    });

    let maxPrice = 0;
    const visited = new Set<ChangeKey>();
    for (let i = 0; i < changeSequenceMaps.length; i++) {
        for (const key of changeSequenceMaps[i].keys()) {
            if (visited.has(key)) {
                continue;
            }

            const price = changeSequenceMaps.map(changeSequenceMap => changeSequenceMap.get(key) ?? 0)
                .reduce((sum, price) => sum + price, 0);
    
            visited.add(key);
            if (price > maxPrice) {
                maxPrice = price;
            }
        }
    }

    return maxPrice.toString();
}
