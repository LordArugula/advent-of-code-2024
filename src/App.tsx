import { useEffect, useState } from "react"
import days from "./days/index";
import { expecteds } from "./expected";

import "./App.css"

function solve(day: number, part: number, input: string) {
  const aocDay = days[day - 1];
  switch (part) {
    case 1:
      return aocDay.part1(input);
    case 2:
      return aocDay.part2(input);
    default:
      throw new Error("Unreachable");
  }
}

function App() {
  const [day, setDay] = useState(() => {
    const today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    // months are indexed starting at 0
    const december = 11;
    if (today.getUTCMonth() === december) {
      // days are indexed starting at 1
      return today.getUTCDate();
    }
    return 1;
  });
  const [part, setPart] = useState(1);
  const [isTest, setIsTest] = useState(false);
  const [input, setInput] = useState("uwu");
  const [result, setResult] = useState(":3");
  const [expected, setExpected] = useState(">:3");

  useEffect(() => {
    fetch(`./${isTest ? "test-inputs" : "inputs"}/day${day}.txt`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Missing input for day ${day}`);
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
    if (isTest) {
      const expect = expecteds[day - 1];
      switch (part) {
        case 1:
          setExpected(expect.part1?.toString() || ":3");
          break;
        case 2:
          setExpected(expect.part2?.toString() || ":3");
          break;
        default:
          break;
      }
    }
    try {
      setResult(solve(day, part, input));
    } catch (err) {
      if (err instanceof Error) {
        setResult(err.message);
      }
    }
  }, [part, input]);

  return (
    <>
      <div>
        <form>
          <input type="date" min="2024-12-01" max="2024-12-25"
            value={new Date(2024, 11, day).toLocaleDateString("en-ca", { timeZone: "America/New_York" })}
            onChange={evt => setDay(Math.max(1, Math.min(25, new Date(evt.target.value).getUTCDate())))}></input>
          <input id="use-test" type="checkbox" checked={isTest} onChange={evt => { setIsTest(evt.target.checked) }}></input>
          <label htmlFor="use-test">Use test</label>
        </form>
      </div>
      <div className="container">
        <div className="input-container">
          <h1>Input</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ textAlign: "right", whiteSpace: "pre-wrap" }}>{input.split("\n").map((_, idx) => idx + 1).join("\n")}</div>
            <div id="input">{input}</div>
          </div>
        </div>
        <div className="result-container">
          <h1>Day {day}</h1>
          <div>
            <button onClick={() => setPart(1)}>Part 1</button>
            <button onClick={() => setPart(2)}>Part 2</button>
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
                    <div>{result}</div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2>Solution</h2>
                    <button onClick={async () => await navigator.clipboard.writeText(result.trim())}>Copy</button>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{ textAlign: "right", whiteSpace: "pre-wrap" }}>{result.split("\n").map((_, idx) => idx + 1).join("\n")}</div>
                      <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
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
