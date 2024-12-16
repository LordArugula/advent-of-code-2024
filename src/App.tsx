import { useEffect, useState } from "react"
import days from "./days/index";
import { expecteds } from "./expected";

import "./App.css"

async function solve(day: number, part: number, input: string, isTest: boolean) {
  const aocDay = days[day - 1];
  if (!aocDay) {
    return `Day ${day} not completed :3`;
  }

  switch (part) {
    case 1:
      return await aocDay.part1(input, isTest);
    case 2:
      return await aocDay.part2(input, isTest);
    default:
      throw new Error("Unreachable");
  }
}

function getDefaultDay() {
  const today = new Date();
  today.setUTCHours(today.getUTCHours() - 5);
  // months are indexed starting at 0
  const december = 11;
  if (today.getUTCMonth() === december) {
    // days are indexed starting at 1
    return today.getUTCDate();
  }
  return 1;
}

function App() {
  const [day, setDay] = useState(getDefaultDay());
  const [part, setPart] = useState(1);
  const [isTest, setIsTest] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(":3");
  const [expected, setExpected] = useState(">:3");

  useEffect(() => {
    fetch(`./${isTest ? "test-inputs" : "inputs"}/day${day}.txt`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Missing input for day ${day} uwu`);
        }

        return res.text();
      })
      .then(input => {
        setInput(input);
      })
      .catch((err: Error) => {
        setInput(err.message);
      })
  }, [day, isTest]);

  useEffect(() => {
    if (input === "") {
      return;
    }

    if (isTest) {
      const expect = expecteds[day - 1];
      switch (part) {
        case 1:
          setExpected(expect?.part1?.toString() || ":3");
          break;
        case 2:
          setExpected(expect?.part2?.toString() || ":3");
          break;
        default:
          break;
      }
    }
    
    setResult("Processing :3");

    solve(day, part, input, isTest)
      .then(result => {
        setResult(result.toString() || ":3");
      })
      .catch((err: Error) => {
        setResult(err.message);
        console.log(err);
      })
  }, [part, input]);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <h1>Input</h1>
          <div className={["multiline-text-container", isSpoiler && !isTest ? "spoiler" : undefined].join(" ")}>
            <div className="line-numbers">{input.split("\n").map((_, idx) => idx + 1).join("\n")}</div>
            <div className="multiline-text">{input}</div>
          </div>
        </div>
        <div className="result-container">
          <div>
            <h1>
              <a href={`https://adventofcode.com/2024/day/${day}`} aria-label={`Advent of Code day ${day}`} target="__blank">Day {day}</a>
            </h1>
            <form>
              <input type="date"
                min="2024-12-01"
                max="2024-12-25"
                value={new Date(2024, 11, day).toLocaleDateString("en-ca", { timeZone: "America/New_York" })}
                onChange={evt => {
                  if (!evt.target.value) {
                    setDay(getDefaultDay());
                  } else {
                    const day = Math.max(1, Math.min(25, new Date(evt.target.value).getUTCDate()));
                    setDay(day);
                  }
                }}></input>
              <input id="use-test" type="checkbox" checked={isTest} onChange={evt => { setIsTest(evt.target.checked) }}></input>
              <label htmlFor="use-test">Use test</label>
              {!isTest && (
                <>
                  <input id="use-spoiler" type="checkbox" checked={isSpoiler} onChange={evt => { setIsSpoiler(evt.target.checked) }}></input>
                  <label htmlFor="use-spoiler">Spoiler</label>
                </>
              )}
            </form>
          </div>
          <div className="tab-container">
            <button type="button" className={["tab-button", part === 1 && "active"].join(" ")} onClick={() => setPart(1)}>Part 1</button>
            <button type="button" className={["tab-button", part === 2 && "active"].join(" ")} onClick={() => setPart(2)}>Part 2</button>
          </div>
          <div>
            {
              isTest ? (
                <>
                  <div>
                    <h2>Expected</h2>
                    <div>{expected}</div>
                  </div>
                  <div>
                    <h2>Actual</h2>
                    <div className="multiline-text">{result}</div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <h2>Solution</h2>
                      <div style={{ alignItems: "center", display: "flex" }}>
                        <button type="button" id="copy-button" onClick={async () => await navigator.clipboard.writeText(result.trim())}>Copy</button>
                      </div>
                    </div>
                    <div className={["multiline-text-container", isSpoiler && !isTest ? "spoiler" : undefined].join(" ")}>
                      {
                        result && result.split("\n").length > 1 &&
                        <div className="line-numbers">
                          {result.split("\n").map((_, idx) => idx + 1).join("\n")}
                        </div>
                      }
                      <div className="multiline-text output">{result}</div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
