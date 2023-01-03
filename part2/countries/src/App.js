import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);
    const [displayedCountry, setDisplayedCountry] = useState(null);

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => setCountries(response.data));
    }, []);

    return (
        <div className="App">
            find countries{" "}
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            {filteredCountries.length <= 10 &&
                filteredCountries.length > 1 &&
                filteredCountries.map((country) => (
                    <div key={country.cca2}>
                        {country.name.common+" "}
                        <button onClick={() => setDisplayedCountry(country)}>
                            show
                        </button>
                    </div>
                ))}
            {query && filteredCountries.length >= 11 && (
                <p>"Too many matches, specify another filter."</p>
            )}
            {displayedCountry && (
                <div>
                    <h2>{displayedCountry.name.common}</h2>
                    <p>capital {displayedCountry.capital[0]}</p>
                    <p>area {displayedCountry.area}</p>
                    <h3>languages </h3>
                    {Object.keys(displayedCountry.languages).map((key) => (
                        <li key={key}>{displayedCountry.languages[key]}</li>
                    ))}
                    <img
                        src={displayedCountry.flags.png}
                        alt={`${displayedCountry.name.common} flag`}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
