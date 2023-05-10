import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CountriesList.css";
import CountryDetails from "./CountryDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3/all");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="countries-page">
      <div className="country-details">
        {selectedCountry ? (
          <div>
            <CountryDetails country={selectedCountry} />
          </div>
        ) : (
          <div className="no-country-selected">
            {" "}
            Select a country from the list{" "}
          </div>
        )}
      </div>
      <div className="sidebar">
        <div className="search-bar">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
          />
        </div>
        <div className="countries-list">
          <ul>
            {filteredCountries.map((country) => (
              <li
                key={country.cca3}
                className={selectedCountry === country ? "active" : ""}
                onClick={() => handleCountryClick(country)}
              >
                <FontAwesomeIcon icon={faGlobe} className="list-icon" />
                {country.name.common}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CountriesList;
