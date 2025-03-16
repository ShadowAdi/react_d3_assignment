import axios from "axios";

export const fetchRaceWinPerDriver = async (startYear, endYear) => {
  const driverWins = {};
  const driverData = {}; // Store driver name and team info

  for (let year = startYear; year <= endYear; year++) {
    const url = `https://ergast.com/api/f1/${year}/results.json`;
    try {
      const response = await axios.get(url);

      if (!response.data?.MRData?.RaceTable?.Races) {
        console.error(`No race data found for ${year}!`);
        continue;
      }

      const races = response.data.MRData.RaceTable.Races;

      races.forEach((race) => {
        if (race.Results && race.Results.length > 0) {
          const winner = race.Results.find((r) => r.positionText === "1");
          if (winner) {
            const driverId = winner.Driver.driverId;
            const driverName = `${winner.Driver.givenName} ${winner.Driver.familyName}`;
            const team = winner.Constructor.name;

            driverWins[driverId] = (driverWins[driverId] || 0) + 1;
            driverData[driverId] = { driverName, team };
          }
        }
      });
    } catch (error) {
      console.error(`Error fetching data for ${year}:`, error);
    }
  }

  return Object.entries(driverWins).map(([driverId, wins]) => ({
    driverId,
    driverName: driverData[driverId].driverName,
    team: driverData[driverId].team, // Store team name
    wins,
  }));
};
