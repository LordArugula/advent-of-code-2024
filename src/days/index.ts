import * as day1 from "./day1";
import * as day2 from "./day2";
import * as day3 from "./day3";
import * as day4 from "./day4";
import * as day5 from "./day5";
import * as day6 from "./day6";
import * as day7 from "./day7";
import * as day8 from "./day8";
import * as day9 from "./day9";
import * as day10 from "./day10";

type Day = {
    part1(input: string): number | string | Promise<number | string>;
    part2(input: string): number | string | Promise<number | string>;
}
const days: Day[] = [
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8,
    day9,
    day10,
];
export default days;
