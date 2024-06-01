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

export default function Players({ idTim, idLiga }) {
  const [playerData, setPlayerData] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlayerData = async () => {
    try {
      const response3 = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/players?league=${idLiga}&season=2023&team=${idTim}`, { headers: header_API });
      const players = response3.data.response.map(playerData => {
        const player = playerData.player;
        return {
          name: player.name,
          birthDate: player.birth.date,
          birthCountry: player.birth.country,
          nationality: player.nationality,
          photo: player.photo
        };
      });
      setPlayerData(players);
      setError(null);
    } catch (error) {
      console.error("Error fetching player data", error);
      setError("Data player error");
    }
  };

  useEffect(() => {
    if (idTim && idLiga) {
      fetchPlayerData();
    }
  }, [idTim, idLiga]);

  return (
    <>
      <div className="mx-auto font-bold text-2xl text-center w-full">Nama-nama player</div>
      <div className={boxBox}>
        {playerData.map((player, index) => (
          <div key={index} className={card}>
            <img src={player.photo} alt={player.name} className={imgCard} />
            <h2>{player.name}</h2>
            <p>Birth Date: {player.birthDate}</p>
            <p>Birth Country: {player.birthCountry}</p>
            <p>Nationality: {player.nationality}</p>
          </div>
        ))}
      </div>
    </>
  );
}
