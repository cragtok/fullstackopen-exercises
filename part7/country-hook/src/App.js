import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (!name) {
            return;
        }
        let cancel = false;
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((response) => {
                if (!cancel) {
                    setCountry(response.data[0]);
                }
            })
            .catch((error) => setCountry(null));

        return () => {
            cancel = true;
        };
    }, [name]);

    return country;
};

const Country = ({ country }) => {
    if (!country) {
        return <div>not found...</div>;
    }

    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>population {country.population}</div>
            <div>capital {country.capital}</div>
            <img
                src={country.flags.png}
                height="100"
                alt={`flag of ${country.name.common}`}
            />
        </div>
    );
};

const App = () => {
    const nameInput = useField("text");
    const [name, setName] = useState("");
    const country = useCountry(name);
    const [showCountry, setShowCountry] = useState(false);

    const fetch = (e) => {
        e.preventDefault();
        setName(nameInput.value);
    };

    useEffect(() => {
        setShowCountry(true);
    }, [country]);

    useEffect(() => {
        setShowCountry(false);
    }, []);

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>
            {showCountry && <Country country={country} />}
        </div>
    );
};

export default App;
