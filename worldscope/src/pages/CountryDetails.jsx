import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching country:', err);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading || !country) {
    return (
      <Layout>
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-20 max-w-5xl mx-auto text-gray-800 pt-25 md:pt-32">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={country.flags?.png}
              alt={country.name.common}
              className="w-full md:w-1/3 rounded-xl shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
              <p><strong>Official Name:</strong> {country.name.official}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              <p><strong>Region:</strong> {country.region} / {country.subregion}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
              <p><strong>Start of Week:</strong> {country.startOfWeek}</p>
              <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {country.flags?.alt && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Flag Description</h2>
              <p>{country.flags.alt}</p>
            </div>
          )}

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Languages</h2>
              {country.languages ? (
                Object.values(country.languages).map((lang, idx) => (
                  <p key={idx}>• {lang}</p>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Map Links</h2>
              <p>
                Google Maps:{' '}
                <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View on Google Maps
                </a>
              </p>
              <p>
                OpenStreetMap:{' '}
                <a href={country.maps.openStreetMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View on OpenStreetMap
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CountryDetails;
