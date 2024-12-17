export function part1(input: string): string {
    const [registersStr, instructionsStr] = input.split("\n\n");

    const registers = registersStr.split("\n")
        .map(register => parseInt(register.split(" ")[2]));

    const instructions = instructionsStr.slice(instructionsStr.indexOf(": ") + 2, -1)
        .split(",")
        .map(op => parseInt(op));

    const output: number[] = [];

    for (let i = 0; i + 1 < instructions.length; i += 2) {
        const instruction = instructions[i];
        const operand = instructions[i + 1];

        switch (instruction) {
            case 0: {
                // adv division
                const numerator = registers[0];
                const denominator = Math.pow(2, combo(operand, registers));
                registers[0] = Math.floor(numerator / denominator);
                break;
            }
            case 1:
                // bxl bitwise XOR B & l
                registers[1] = registers[1] ^ operand;
                break;
            case 2:
                // bst modulo 8
                registers[1] = combo(operand, registers) % 8;
                break;
            case 3:
                // jnz jump a !== 0
                if (registers[0] !== 0) {
                    i = operand - 2;
                }
                break;
            case 4:
                // bxc bitwise XOR B ^ C
                registers[1] = registers[1] ^ registers[2];
                break;
            case 5:
                // out modulo 8
                output.push(combo(operand, registers) % 8);
                break;
            case 6: {
                // bdv division
                const numerator = registers[0];
                const denominator = Math.pow(2, combo(operand, registers));
                registers[1] = Math.floor(numerator / denominator);
                break;
            }
            case 7: {
                // cdv division
                const numerator = registers[0];
                const denominator = Math.pow(2, combo(operand, registers));
                registers[2] = Math.floor(numerator / denominator);
                break;
            }
            default:
                break;
        }
    }

    return output.join(",");
}

function combo(operand: number, registers: number[]): number {
    if (operand >= 0 && operand <= 3) {
        return operand;
    } else if (operand === 4) {
        return registers[0];
    } else if (operand === 5) {
        return registers[1];
    } else if (operand === 6) {
        return registers[2];
    } else {
        console.log(operand);
        throw new Error("Invalid combo operand.");
    }
}

export function part2(input: string): string {
    const [registersStr, instructionsStr] = input.split("\n\n");

    const registers = registersStr.split("\n")
        .map(register => parseInt(register.split(" ")[2]));

    const instructions = instructionsStr.slice(instructionsStr.indexOf(": ") + 2, -1)
        .split(",")
        .map(op => parseInt(op));

    // const minPowerOf2 = chunk(instructions, 2)
    //     .filter(([opcode, _]) => opcode === 0)
    //     .reduce((pow, [_, operand]) => {
    //         return pow + operand <= 3 ? operand : 0;
    //     }, 0);

    // let a = parseInt(instructions.map(i => i.toString(2).padStart(3, "0")).reverse().concat("000").join(""), 2);

    // const max = Math.pow(2, minPowerOf2 * instructions.length)
    const output: number[] = [];
    let x = 1;
    let n = 0;
    while (x <= instructions.length) {
        registers[0] = n;
        registers[1] = 0;
        registers[2] = 0;
        output.length = 0;
        let earlyOut = false;
        for (let i = 0; i + 1 < instructions.length; i += 2) {
            if (earlyOut) {
                break;
            }
            const instruction = instructions[i];
            const operand = instructions[i + 1];

            switch (instruction) {
                case 0: {
                    // adv division
                    const numerator = registers[0];
                    const denominator = Math.pow(2, combo(operand, registers));
                    registers[0] = Math.floor(numerator / denominator);
                    break;
                }
                case 1:
                    // bxl bitwise XOR B & l
                    // registers[1] = registers[1] ^ operand;
                    registers[1] = XOR(registers[1], operand);
                    break;
                case 2:
                    // bst modulo 8
                    registers[1] = combo(operand, registers) % 8;
                    break;
                case 3:
                    // jnz jump a !== 0
                    if (registers[0] !== 0) {
                        i = operand - 2;
                    }
                    break;
                case 4:
                    // bxc bitwise XOR B ^ C
                    // registers[1] = registers[1] ^ registers[2];
                    registers[1] = XOR(registers[1], registers[2]);
                    break;
                case 5:
                    // out modulo 8
                    const result = combo(operand, registers) % 8;
                    if (result !== instructions[instructions.length - x + output.length]) {
                        earlyOut = true;
                        break;
                    }
                    output.push(result);
                    break;
                case 6: {
                    // bdv division
                    const numerator = registers[0];
                    const denominator = Math.pow(2, combo(operand, registers));
                    registers[1] = Math.floor(numerator / denominator);
                    break;
                }
                case 7: {
                    // cdv division
                    const numerator = registers[0];
                    const denominator = Math.pow(2, combo(operand, registers));
                    registers[2] = Math.floor(numerator / denominator);
                    break;
                }
                default:
                    break;
            }
        }

        if (output.length === x && output.every((out, idx) => out === instructions[instructions.length - x + idx])) {
            x++;
            n *= 8;
        } else {
            n++;
        }
    }

    return (n / 8).toString();
}

// JS XOR (^) operator doesn't like integers bigger int32 :(
function XOR(a: number, b: number) {
    const hi = 0x80000000;
    const low = 0x7fffffff;
    const hi1 = ~~(a / hi);
    const hi2 = ~~(b / hi);
    const low1 = a ^ low;
    const low2 = b ^ low;
    const h = hi1 ^ hi2;
    const l = low1 ^ low2;
    return h * hi + l;
}
