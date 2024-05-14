
import React, { useState, useEffect } from 'react';

function FetchExample({ latitude, longitude }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) return;

    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/getname?lat=${latitude}&long=${longitude}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [latitude, longitude]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from API:</h1>
      <pre>{data && data.name}</pre>
    </div>
  );
}

export default FetchExample;

