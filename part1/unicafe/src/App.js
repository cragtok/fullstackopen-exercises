import { useState } from "react";

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, number }) => (
    <p>
        {text} {number}
    </p>
);

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
            <StatisticLine text="good" number={statistics.good} />
            <StatisticLine text="neutral" number={statistics.neutral} />
            <StatisticLine text="bad" number={statistics.bad} />
            <StatisticLine
                text="all"
                number={statistics.good + statistics.bad + statistics.neutral}
            />
            <StatisticLine text="average" number={statistics.average} />
            <StatisticLine
                text="positive"
                number={statistics.positivePercentage}
            />
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
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Statistics
                statistics={{ good, neutral, bad, average, positivePercentage }}
            />
        </div>
    );
};

export default App;
