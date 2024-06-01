"use client";
import React, { useState } from "react";
import Football from "./tim/football";
import Timmm from "./tim/tim";
import Players from "./tim/player";

export default function Home() {
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleLeagueClick = (id) => {
    setSelectedLeagueId(id);
  };

  const handleTeamClick = (id) => {
    setSelectedTeamId(id);
  };

  return (
    <>
      <Football onLeagueClick={handleLeagueClick} />
      {selectedLeagueId && <Timmm idLiga={selectedLeagueId} onTeamClick={handleTeamClick} />}
      {selectedTeamId && selectedLeagueId && <Players idTim={selectedTeamId} idLiga={selectedLeagueId} />}
    </>
  );
}
