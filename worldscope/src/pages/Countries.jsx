import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Countries = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [onlyIndependent, setOnlyIndependent] = useState(false);

  const userEmail = localStorage.getItem('currentUser'); // Ensure correct key for logged-in user

  // Load countries when query/region changes
  useEffect(() => {
    const fetchCountries = async () => {
      let url = 'https://restcountries.com/v3.1/all';

      if (query) {
        url = `https://restcountries.com/v3.1/name/${query}`;
      } else if (region) {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setCountries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setCountries([]);
      }
    };

    const timeout = setTimeout(fetchCountries, 500);
    return () => clearTimeout(timeout);
  }, [query, region]);

  // Load favorites for the current user
  useEffect(() => {
    if (userEmail) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${userEmail}`)) || [];
      setFavorites(new Set(storedFavorites));
    }
  }, [userEmail]);

  // Toggle favorite
  const toggleFavorite = (code) => {
    if (!userEmail) {
      console.warn('User not logged in');
      return; // Prevent adding to favorites if not logged in
    }

    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(code)) {
      updatedFavorites.delete(code);
    } else {
      updatedFavorites.add(code);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userEmail}`, JSON.stringify([...updatedFavorites]));
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-10 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <input
              type="text"
              placeholder="Search country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-gray-800 placeholder-gray-600 shadow-inner border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-gray-800 shadow-inner border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyIndependent}
                onChange={(e) => setOnlyIndependent(e.target.checked)}
                id="independent-toggle"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="independent-toggle" className="text-sm text-gray-800">Only Independent</label>
            </div>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {countries.length > 0 ? (
              countries
                .filter((country) => (onlyIndependent ? country.independent : true))
                .map((country) => (
                  <div
                    key={country.cca3}
                    className="relative backdrop-blur-lg bg-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <Link to={`/country/${country.cca3}`} className="block">
                      <img
                        src={country.flags?.png}
                        alt={country.name.common}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-5 text-gray-800">
                        <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
                        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                      </div>
                    </Link>

                    {/* Favorite Icon */}
                    <svg
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleFavorite(country.cca3);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`absolute bottom-4 right-4 w-7 h-7 cursor-pointer transition-colors duration-200 hover:scale-110 ${favorites.has(country.cca3) ? 'fill-blue-600 stroke-blue-600' : 'fill-none stroke-gray-300'}`}
                      strokeWidth={2.5}
                      aria-label="Toggle favorite"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                      />
                    </svg>
                  </div>
                ))
            ) : (
              <p className="text-center col-span-full text-gray-700">No countries found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Countries;
