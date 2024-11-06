import { useState, useEffect } from 'react';

const useGoogleSheets = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID;
  const workingUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/data?key=${API_KEY}`;

  const desiredFields = [
    "# of Arcade Games Completed",
    "# of Skill Badges Completed",
    "Access Code Redemption Status",
    "All Skill Badges & Games Completed",
    "Google Cloud Skills Boost Profile URL",
    "Profile URL Status",
    "User Email",
    "User Name",
  ];

  const structureUserData = (apiResponse) => {
    const headers = apiResponse.values[0]; 
    const users = apiResponse.values.slice(1); 
    const structuredUsers = [];

    users.forEach((row, index) => {
      const userObject = {};

      desiredFields.forEach((field) => {
        userObject[field] = row[headers.indexOf(field)] || ""; 
      });

      userObject.id = index + 1; 
      userObject.rank = 15; 
      userObject.__rowNum__ = index + 1; 

      structuredUsers.push(userObject);
    });

    return structuredUsers;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(workingUrl);

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(`Error fetching data: ${errorMessage.error.message}`);
        return;
      }

      const dataOne = await response.json();
      const finalData = structureUserData(dataOne);
      setData(finalData);
    } catch (error) {
      setError(`Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, fetchData };
};

export default useGoogleSheets;



