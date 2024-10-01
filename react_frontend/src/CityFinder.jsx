import { useState, useEffect } from "react";

function CityFinder(props, { styles }) {
    const [countries, setCountries] = useState([]);
    const [options, setOptions] = useState([]);
    const [level, setLevel] = useState("Country")
    const [CountrySelected, setSelectedCountry] = useState("");
    // const [city_Name,setCityName] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json');

                if (!response.ok) {
                    throw new Error("There was an issue in fetching data.");
                }

                const data = await response.json();
                setCountries(data);
                setOptions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    function setArray(name, level) {
        if (name === "--- Change the Country ---") {
            setLevel("Country");
            setOptions(countries);
        } else if (name === "--- Change the State ---") {
            setLevel("State");
            setOptions(CountrySelected.states);
        } else {

            options.map(element => {
                if (element.name == name) {
                    if (level === "Country") {
                        setLevel("State");
                        setSelectedCountry(element)
                        setOptions(element.states);
                    } else if (level === "State") {
                        setLevel("City");
                        setOptions(element.cities);
                    }
                }
            });
        }
    }

    return <>
        <select className="form-control text-center" id="selectingCity" onChange={(e) =>{setArray(e.target.value, level);}} style={props.styles}>
            {level === "Country" && (
                <option key={"SetCountry"} selected={true} hidden={true}>--- Select a Country ---</option>
            )}
            {level === "State" && (<>
                <option key={"SetState"} selected={true} hidden={true}>--- Select a State ---</option>
                <option key={"SetCountry"}>--- Change the Country ---</option>
            </>
            )}
            {level === "City" && (<>
                <option key={"SetCity"} selected={true} hidden={true}>--- Select a City ---</option>
                <option key={"SetCountry"}>--- Change the Country ---</option>
                <option key={"SetState"}>--- Change the State ---</option>
            </>
            )}
            {options.map(element => {
                return <option key={element.id}>{element.name}</option>;
            })}
        </select>
    </>
}
export default CityFinder;