import React,  { useState, useEffect, SetStateAction } from "react";
import { cities } from "../lib/cities.mock";
import { ICity, ICityData } from "../lib/interfaces/city.interface";
import Link from "next/link";
import Router from "next/router";

export const SearchBox = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ICityData[]>([]);

  useEffect(() => {
    const clearQuery = () => setQuery("");
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  const onChange = (e: { target: { value: any; }; }) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities: ICityData[] = [];

    if (value.length > 3) {
      cities.forEach((city: ICity) => {
        if (matchingCities.length >= 5) {
          return;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());
        if (match) {
          const cityData: ICityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      })
    }

    return setResults(matchingCities);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
      />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city: ICityData) => {
              return (
                <li key={city.slug}>
                  <Link href={`/location/${city.slug}`}>
                    <span>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}{" "}
                      <span>({city.country})</span>
                    </span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="search__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
export default SearchBox;
