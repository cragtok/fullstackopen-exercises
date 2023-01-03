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

    const onShowCountry = (country) => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${
                    process.env.REACT_APP_API_KEY
                }&query=${country.capital[0].split(" ").join("_")}`
            )
            .then((response) =>
                setDisplayedCountry({ ...country, weather: response.data })
            )
            .catch((err) => console.error(err));
    };

    return (
        <div className="App">
            find countries{" "}
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            {filteredCountries.length <= 10 &&
                filteredCountries.length > 1 &&
                filteredCountries.map((country) => (
                    <div key={country.cca2}>
                        {country.name.common + " "}
                        <button onClick={() => onShowCountry(country)}>
                            show
                        </button>
                    </div>
                ))}
            {query && filteredCountries.length >= 11 && (
                <p>"Too many matches, specify another filter."</p>
            )}
            {displayedCountry && (
                <>
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
                    <div>
                        <h3>Weather in {displayedCountry.capital}</h3>
                        <p>
                            temperature{" "}
                            {displayedCountry.weather.current.temperature}{" "}
                            Celcius
                        </p>
                        <img
                            src={
                                displayedCountry.weather.current
                                    .weather_icons[0]
                            }
                            alt="weather icon"
                        />
                        <p>
                            wind {displayedCountry.weather.current.wind_speed}{" "}
                            m/s {displayedCountry.weather.current.wind_dir}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
