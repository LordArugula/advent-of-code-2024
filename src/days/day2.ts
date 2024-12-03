export function part1(input: string): string {
    const safeReports = input.split("\n").slice(0, -1)
        .map(report => report.split(" ").map(level => parseInt(level)))
        .filter(levels => {
            // .map<boolean>(levels => {
            // is decreasing
            let safeDecreasing = true;
            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i] > levels[i + 1] && levels[i] - levels[i + 1] <= 3) {
                    continue;
                }
                safeDecreasing = false;
                break;
            }

            if (safeDecreasing) {
                return true;
            }

            // is increasing
            let safeIncreasing = true;
            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i] < levels[i + 1] && levels[i + 1] - levels[i] <= 3) {
                    continue;
                }
                safeIncreasing = false;
                break;
            }

            return safeIncreasing;
        });

    return safeReports.length.toString();
    // return safeReports.map<string>(x => x.toString()).join("\n");
}

export function part2(input: string): string {
    const safeReports = input.split("\n").slice(0, -1)
        .map(report => report.split(" ").map(level => parseInt(level)))
        .filter((levels) => {
            // is decreasing
            let safeDecreasing = true;
            let canDampProblem = true;
            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i] > levels[i + 1] && levels[i] - levels[i + 1] <= 3) {
                    continue;
                }

                if (canDampProblem) {
                    if (i + 2 >= levels.length) {
                        canDampProblem = false;
                        i++;
                        continue;
                    } else if (levels[i] > levels[i + 2] && levels[i] - levels[i + 2] <= 3) {
                        canDampProblem = false;
                        i++;
                        continue;
                    } else if (i === 0) {
                        canDampProblem = false;
                        continue;
                    }
                }

                safeDecreasing = false;
                break;
            }

            if (safeDecreasing) {
                return true;
            }

            // is increasing
            let safeIncreasing = true;
            canDampProblem = true;
            for (let i = 0; i < levels.length - 1; i++) {
                if (levels[i] < levels[i + 1] && levels[i + 1] - levels[i] <= 3) {
                    continue;
                }

                if (canDampProblem) {
                    if (i + 2 >= levels.length) {
                        canDampProblem = false;
                        i++;
                        continue;
                    } else if (levels[i] < levels[i + 2] && levels[i + 2] - levels[i] <= 3) {
                        canDampProblem = false;
                        i++;
                        continue;
                    } else if (i === 0) {
                        canDampProblem = false;
                        continue;
                    }
                }

                safeIncreasing = false;
                break;
            }

            return safeIncreasing;
        });

    return safeReports.length.toString();
}
