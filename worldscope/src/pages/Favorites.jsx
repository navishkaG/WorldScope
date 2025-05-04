import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [userEmail, setUserEmail] = useState('');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [onlyIndependent, setOnlyIndependent] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('currentUser'); // Use the correct key for the logged-in user
    if (!email) {
      setUserEmail('');
      setFavoriteCountries([]);
      return;
    }

    setUserEmail(email);
    const fetchFavorites = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${email}`)) || [];
      setFavorites(new Set(storedFavorites));

      if (storedFavorites.length === 0) {
        setFavoriteCountries([]);
        return;
      }

      try {
        const codeString = storedFavorites.join(',');
        const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codeString}`);
        const data = await res.json();
        setFavoriteCountries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching favorite countries:", err);
        setFavoriteCountries([]);
      }
    };

    fetchFavorites();
  }, [userEmail]); // Trigger the effect when the userEmail changes

  // Handle filtering by search query
  const filteredCountries = favoriteCountries.filter((country) => {
    const matchesQuery = country.name.common.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    const matchesIndependent = onlyIndependent ? country.independent : true;
    return matchesQuery && matchesRegion && matchesIndependent;
  });

  const toggleFavorite = (code) => {
    const updatedFavorites = new Set(favorites);
    updatedFavorites.delete(code);

    const updatedArray = Array.from(updatedFavorites);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userEmail}`, JSON.stringify(updatedArray));

    setFavoriteCountries((prev) => prev.filter((c) => c.cca3 !== code));
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-10 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Filters can go here if needed */}
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

          {favoriteCountries.length === 0 ? (
            <p className="text-center text-gray-600">You have no favorite countries yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredCountries.map((country) => (
                <Link
                  to={`/country/${country.cca3}`}
                  key={country.cca3}
                  className="relative backdrop-blur-lg bg-white/20 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                >
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(country.cca3);
                    }}
                    className="absolute bottom-4 right-4 hover:scale-110 transition-transform"
                    aria-label="Remove from favorites"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-7 h-7 fill-blue-600 stroke-blue-600"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                      />
                    </svg>
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
