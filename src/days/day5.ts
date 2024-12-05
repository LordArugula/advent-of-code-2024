export function part1(input: string): string {
    const parts = input.split("\n\n");

    const orderingRules = parts[0].split("\n")
        .map(rule => rule.split("|").map(number => parseInt(number)));

    const rules = orderingRules.reduce((rules, [page1, page2]) => {
        let rule = rules.get(page1);
        if (!rule) {
            rule = [];
            rules.set(page1, rule);
        }
        rule.push(page2);

        return rules;
    }, new Map<number, number[]>());

    const updates = parts[1].split("\n")
        .slice(0, -1)
        .map(update => update.split(",").map(number => parseInt(number)))
        .filter(update => {
            for (let i = update.length - 1; i > 0; i--) {
                const page = update[i];
                const rule = rules.get(page);
                for (let x = i - 1; x >= 0; x--) {
                    const prevPage = update[x];
                    if (rule && rule.includes(prevPage)) {
                        return false;
                    }
                }
            }

            return true;
        })
        .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);

    return updates.toString();
}

export function part2(input: string): string {
    const parts = input.split("\n\n");

    const orderingRules = parts[0].split("\n")
        .map(rule => rule.split("|").map(number => parseInt(number)));

    const rules = orderingRules.reduce((rules, [page1, page2]) => {
        let rule = rules.get(page1);
        if (!rule) {
            rule = [];
            rules.set(page1, rule);
        }
        rule.push(page2);

        return rules;
    }, new Map<number, number[]>());

    const updates = parts[1].split("\n")
        .slice(0, -1)
        .map(update => update.split(",").map(number => parseInt(number)))
        .filter(update => {
            for (let i = update.length - 1; i > 0; i--) {
                const page = update[i];
                const rule = rules.get(page);
                for (let x = i - 1; x >= 0; x--) {
                    const prevPage = update[x];
                    if (rule && rule.includes(prevPage)) {
                        return true;
                    }
                }
            }

            return false;
        })
        .map(update => {
            for (let i = update.length - 1; i > 0; i--) {
                const page = update[i];
                const rule = rules.get(page);
                for (let x = i - 1; x >= 0; x--) {
                    const prevPage = update[x];
                    if (rule && rule.includes(prevPage)) {
                        update = [...update.slice(0, x), ...update.slice(x + 1, i), page, prevPage, ...update.slice(i + 1)];
                        i++
                        break;
                    }
                }
            }

            return update;
        })
        .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0);

    return updates.toString();
}
