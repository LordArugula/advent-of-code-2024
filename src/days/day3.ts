export function part1(input: string): string {
    const matches = input.matchAll(/mul\([0-9]+,[0-9]+\)/g);

    let sum = 0;
    for (let match of matches) {
        const expression = match[0];
        const startFirstNumber = expression.indexOf('(') + 1;
        const endFirstNumber = expression.indexOf(',');

        const startSecondNumber = endFirstNumber + 1;
        const endSecondNumber = expression.indexOf(')');

        const firstNumber = parseInt(expression.slice(startFirstNumber, endFirstNumber));
        const secondNumber = parseInt(expression.slice(startSecondNumber, endSecondNumber));
        sum += firstNumber * secondNumber;
    }

    return sum.toString();
}

export function part2(input: string): string {
    const matches = input.matchAll(/(mul\([0-9]+,[0-9]+\))|(do\(\))|(don't\(\))/g);

    let sum = 0;
    let isDo = true;
    for (let match of matches) {
        const expression = match[0];
        switch (expression) {
            case "do()":
                isDo = true;
                break;
            case "don't()":
                isDo = false;
                break;
            default:
                if (!isDo) {
                    continue;
                }

                const startFirstNumber = expression.indexOf('(') + 1;
                const endFirstNumber = expression.indexOf(',');

                const startSecondNumber = endFirstNumber + 1;
                const endSecondNumber = expression.indexOf(')');

                const firstNumber = parseInt(expression.slice(startFirstNumber, endFirstNumber));
                const secondNumber = parseInt(expression.slice(startSecondNumber, endSecondNumber));
                sum += firstNumber * secondNumber;
                break;
        }
    }

    return sum.toString();
}
