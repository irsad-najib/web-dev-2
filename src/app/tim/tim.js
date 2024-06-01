"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const boxBox = "flex flex-wrap justify-center gap-4 mx-10";
const card = "w-72 bg-gray-800 rounded overflow-hidden shadow-md p-4 text-center";
const imgCard = "w-full h-auto";

const header_API = {
  'x-rapidapi-key': '9742f337b8msh6c69b8a5b63f9b1p15466cjsn956a924fd134',
  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};

export default function Timmm({ idLiga, onTeamClick }) {
  const [teamData, setTeamData] = useState([]);
  const [error, setError] = useState(null);

  const fetchTimData = async () => {
    try {
      const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${idLiga}&season=2023`, { headers: header_API });
      const teams = response.data.response.map(timData => ({
        id: timData.team.id,
        name: timData.team.name,
        country: timData.team.country,
        logo: timData.team.logo
      }));

      setTeamData(teams);
      setError(null);
    } catch (error) {
      console.error("Error fetching team data", error);
      setError("Data error");
    }
  };

  useEffect(() => {
    if (idLiga) {
      fetchTimData();
    }
  }, [idLiga]);

  return (
    <>
      <div className="mx-auto font-bold text-2xl text-center w-full">Nama-nama Tim</div>
      <div className={boxBox}>
        {error && <div>{error}</div>}
        {teamData.map((team) => (
          <div key={team.id} className={card}>
            <img src={team.logo} alt={team.name} className={imgCard}
              onClick={() => onTeamClick(team.id)} />
            <h2>{team.name}</h2>
            <p>{team.country}</p>
          </div>
        ))}
      </div>
    </>

  );
};


