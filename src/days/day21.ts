import { Point } from "../utils/Point";

export function part1(input: string): string {
    const codes = input.split("\n").slice(0, -1);

    // const numericKeypad = [
    //     ["7", "8", "9"],
    //     ["4", "5", "6"],
    //     ["1", "2", "3"],
    //     ["", "0", "A"]
    // ];
    // const directionalKeypad = [
    //     ["", "^", "A"],
    //     ["<", "v", ">"]
    // ];

    const numericKeypadMap = new Map<string, Point>([
        ["0", { row: 3, col: 1 }],
        ["A", { row: 3, col: 2 }],
        ["1", { row: 2, col: 0 }],
        ["2", { row: 2, col: 1 }],
        ["3", { row: 2, col: 2 }],
        ["4", { row: 1, col: 0 }],
        ["5", { row: 1, col: 1 }],
        ["6", { row: 1, col: 2 }],
        ["7", { row: 0, col: 0 }],
        ["8", { row: 0, col: 1 }],
        ["9", { row: 0, col: 2 }],
    ]);

    const directionalKeypadMap = new Map<string, Point>([
        ["^", { row: 0, col: 1 }],
        ["A", { row: 0, col: 2 }],
        ["<", { row: 1, col: 0 }],
        ["v", { row: 1, col: 1 }],
        [">", { row: 1, col: 2 }],
    ]);

    const totalComplexity = codes
        .map(code => {
            // the first robot starts on the numeric keypad 'A' button
            let robotAPos = numericKeypadMap.get("A")!;
            // the second robot starts on robot A's directional keypad 'A' button
            let robotBPos = directionalKeypadMap.get("A")!;
            // the second robot starts on robot B's directional keypad 'A' button
            let robotCPos = directionalKeypadMap.get("A")!;
            // the human operator starts on robot C's directional keypad 'A' button
            // let operatorPos = directionalKeypadMap.get("A")!;

            const robotASequence: string[] = [];
            let curr = { row: robotAPos.row, col: robotAPos.col };
            for (let i = 0; i < code.length; i++) {
                const key = code[i];

                const target = numericKeypadMap.get(key)!;

                const dx = target.col - curr.col;
                const dy = target.row - curr.row;
                // order of movement
                // right, up, down, left
                for (let i = 0; i < dx; i++) {
                    robotASequence.push(">");
                }
                for (let i = dy; i < 0; i++) {
                    robotASequence.push("^");
                }
                for (let i = 0; i < dy; i++) {
                    robotASequence.push("v");
                }
                for (let i = dx; i < 0; i++) {
                    robotASequence.push("<");
                }
                robotASequence.push("A");

                curr = target;
            }

            console.log(robotASequence);

            const robotBSequence: string[] = [];
            curr = { row: robotBPos.row, col: robotBPos.col };
            for (let i = 0; i < robotASequence.length; i++) {
                const key = robotASequence[i];

                const target = directionalKeypadMap.get(key)!;

                const dx = target.col - curr.col;
                const dy = target.row - curr.row;
                // order of movement
                // right, up, down, left
                for (let i = 0; i < dx; i++) {
                    robotBSequence.push(">");
                }
                for (let i = dy; i < 0; i++) {
                    robotBSequence.push("^");
                }
                for (let i = 0; i < dy; i++) {
                    robotBSequence.push("v");
                }
                for (let i = dx; i < 0; i++) {
                    robotBSequence.push("<");
                }
                robotBSequence.push("A");

                curr = target;
            }

            console.log(robotBSequence);

            const robotCSequence: string[] = [];
            curr = { row: robotCPos.row, col: robotCPos.col };
            for (let i = 0; i < robotBSequence.length; i++) {
                const key = robotBSequence[i];

                const target = directionalKeypadMap.get(key)!;

                const dx = target.col - curr.col;
                const dy = target.row - curr.row;
                // order of movement
                // right, up, down, left
                for (let i = 0; i < dx; i++) {
                    robotCSequence.push(">");
                }
                for (let i = dy; i < 0; i++) {
                    robotCSequence.push("^");
                }
                for (let i = 0; i < dy; i++) {
                    robotCSequence.push("v");
                }
                for (let i = dx; i < 0; i++) {
                    robotCSequence.push("<");
                }
                robotCSequence.push("A");

                curr = target;
            }

            console.log(robotCSequence);

            // const operatorSequence: string[] = [];
            // curr = { row: operatorPos.row, col: operatorPos.col };
            // for (let i = 0; i < robotCSequence.length; i++) {
            //     const key = robotCSequence[i];

            //     const target = directionalKeypadMap.get(key)!;

            //     const dx = target.col - curr.col;
            //     const dy = target.row - curr.row;
            //     operatorSequence.push(...Array.from({ length: Math.abs(dy) }, () => {
            //         return dy > 0 ? "^" : "v";
            //     }));
            //     operatorSequence.push(...Array.from({ length: Math.abs(dx) }, () => {
            //         return dx > 0 ? ">" : "<";
            //     }));
            //     operatorSequence.push("A");

            //     curr = target;
            // }

            // console.log(operatorSequence);

            const shortestSequenceLength = robotCSequence.length;
            const numericCode = parseInt(code.slice(0, -1));
            return shortestSequenceLength * numericCode;
        })
        .reduce((sum, complexity) => sum + complexity, 0);

    return totalComplexity.toString();
}

export function part2(input: string): string {
    return ":3";
}
