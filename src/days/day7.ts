export function part1(input: string): string {
    return input.split("\n").slice(0, -1)
        .map(equation => {
            const endOfResult = equation.indexOf(":");

            const result = parseInt(equation.slice(0, endOfResult));

            const operands = equation.slice(endOfResult + 2)
                .split(" ")
                .map(val => parseInt(val));

            return {
                result,
                operands
            };
        })
        .filter(({ result, operands }) => {
            type Node = {
                operand: number;
                result: number;
                add: Node | null;
                mul: Node | null;
            }
            const root: Node = {
                operand: operands[0],
                result: operands[0],
                add: null,
                mul: null,
            };

            const curr = [root];
            const next = [];
            for (let i = 1; i < operands.length; i++) {
                let node = curr.pop();
                while (node) {
                    const add = { operand: operands[i], result: node.result + operands[i], add: null, mul: null };
                    node.add = add;
                    const mul = { operand: operands[i], result: node.result * operands[i], add: null, mul: null };
                    node.mul = mul;
                    next.push(add, mul);

                    node = curr.pop();
                }
                curr.push(...next);
                next.length = 0;
            }

            return curr.some(node => node.result === result);
        })
        .reduce((sum, { result }) => sum + result, 0)
        .toString();
}

export function part2(input: string): string {
    return input.split("\n").slice(0, -1)
        .map(equation => {
            const parts = equation.split(": ");
            const result = parseInt(parts[0]);
            const operands = parts[1].split(" ").map(val => parseInt(val));

            return { result, operands };
        })
        .filter(({ result, operands }) => {
            let curr: number[] = [operands[0]];
            let next: number[] = [];

            for (let i = 1; i < operands.length; i++) {
                let node = curr.pop();

                while (node) {
                    const add = node + operands[i];
                    const mul = node * operands[i];
                    const cat = parseInt(node.toString() + operands[i].toString());
                    if (add <= result) { next.push(add); }
                    if (mul <= result) { next.push(mul); }
                    if (cat <= result) { next.push(cat); }

                    node = curr.pop();
                }
                [curr, next] = [next, curr];
            }

            return curr.some(node => node === result);
        })
        .reduce((sum, { result }) => sum + result, 0)
        .toString();
    // return ":3";
}
