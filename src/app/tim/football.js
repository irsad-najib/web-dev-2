"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const boxBox = "flex flex-wrap justify-center gap-4 mx-10";
const card = "w-72 bg-gray-800 rounded overflow-hidden shadow-md p-4 text-center";
const imgCard = "w-full h-auto";

export default function Football ({ onLeagueClick }) {
  const [leagueData, setLeagueData] = useState([]);
  const [error, setError] = useState(null);

  const header_API = {
    'x-rapidapi-key': '9742f337b8msh6c69b8a5b63f9b1p15466cjsn956a924fd134',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  };

  const fetchFootballData = async () => {
    try {
      const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/leagues', { headers: header_API });
      const leagues = response.data.response.slice(0, 50).map(league => ({
        id: league.league.id,
        name: league.league.name,
        logo: league.league.logo
      }));

      setLeagueData(leagues);
      setError(null);
    } catch (error) {
      console.error("Error fetching football data:", error);
      setError("Data error");
    }
  };

  useEffect(() => {
    fetchFootballData();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <div className={boxBox}>
        {leagueData.map((league) => (
          <div key={league.id} className={card}>
            <img
              src={league.logo}
              alt={league.name}
              className={imgCard}
              onClick={() => onLeagueClick(league.id)}
            />
            <h2>{league.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

