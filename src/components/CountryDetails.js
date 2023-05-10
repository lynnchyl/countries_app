import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CountryDetails.css";

const CountryDetails = ({ country }) => {
  const [currency, setCurrency] = useState("");
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3/name/${country.name.common}`
        );
        const currency = response.data[0]?.currencies;
        if (currency) {
          const currencyNames = Object.values(currency).map(
            (currencyItem) => currencyItem.name
          );
          setCurrency(currencyNames.join(", "));
        } else {
          setCurrency("Currency data not available");
        }
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    const fetchMap = () => {
      const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY=${country.capital}`;
      setMapUrl(mapUrl);
    };

    fetchCurrency();
    fetchMap();
  }, [country]);

  return (
    <div className="country-details">
      <h2>{country.name.common}</h2>
      <div className="details-row">
        <span>Capital:</span>
        <span>{country.capital}</span>
      </div>
      <div className="currency-info">
        <span>Currency:</span>
        <span>{currency}</span>
      </div>
      <div className="map-preview">
        <iframe
          title="Google Maps Preview"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default CountryDetails;
