import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    const foundCountry =
        filteredCountries.length === 1 ? filteredCountries[0] : null;

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
                    <p key={country.cca2}>{country.name.common}</p>
                ))}
            {query && filteredCountries.length >= 11 && (
                <p>"Too many matches, specify another filter."</p>
            )}
            {foundCountry && (
                <div>
                    <h2>{foundCountry.name.common}</h2>
                    <p>capital {foundCountry.capital[0]}</p>
                    <p>area {foundCountry.area}</p>
                    <h3>languages </h3>
                    {Object.keys(foundCountry.languages).map((key) => (
                        <li key={key}>{foundCountry.languages[key]}</li>
                    ))}
                    <img
                        src={foundCountry.flags.png}
                        alt={`${foundCountry.name.common} flag`}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
