import { useState } from "react";

const Statistics = ({ statistics }) => {
    if (statistics.good + statistics.bad + statistics.neutral === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        );
    }

    return (
        <div>
            <h1>statistics</h1>
            <p>good {statistics.good}</p>
            <p>neutral {statistics.neutral}</p>
            <p>bad {statistics.bad}</p>
            <p>all {statistics.good + statistics.bad + statistics.neutral}</p>
            <p>average {statistics.average}</p>
            <p>positive {statistics.positivePercentage}</p>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const average = (good - bad) / (good + bad + neutral);
    const positivePercentage = (good * 100) / (good + bad + neutral);
    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics
                statistics={{ good, neutral, bad, average, positivePercentage }}
            />
        </div>
    );
};

export default App;
